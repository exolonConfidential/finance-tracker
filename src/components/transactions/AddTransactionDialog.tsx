import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateTransaction } from "@/hooks/useTransactions";
import { useWallets } from "@/hooks/useWallets";
import { useCategories } from "@/hooks/useCategories";
import { type TransactionRequestDto } from "@/api/transactions";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";

// The shape-shifting schema (Removed coerce for amount, we handle it in the input)
const transactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
  amount: z.number({ error: "Amount is required" }).positive("Amount must be greater than zero"),
  description: z.string().optional(),
  transactionDate: z.string().min(1, "Date and time are required"),
  walletId: z.number().min(1, "Wallet is required"),
  targetWalletId: z.number().optional(),
  categoryId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type !== "TRANSFER" && !data.categoryId) {
    ctx.addIssue({ code:"custom", message: "Category is required", path: ["categoryId"] });
  }
  if (data.type === "TRANSFER" && !data.targetWalletId) {
    ctx.addIssue({ code: "custom", message: "Target wallet is required", path: ["targetWalletId"] });
  }
  if (data.type === "TRANSFER" && data.walletId === data.targetWalletId) {
    ctx.addIssue({ code: "custom", message: "Source and target wallets must be different", path: ["targetWalletId"] });
  }
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

export default function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const { wallets } = useWallets();
  const { categories } = useCategories();
  const { mutate: createTx, isPending } = useCreateTransaction();

  const activeWallets = wallets.filter(w => w.isActive);
  
  // Calculate exact current local date AND time for the datetime-local input
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const defaultDateTime = now.toISOString().slice(0, 16); // e.g., "2026-04-05T14:30"

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "EXPENSE",
      amount: 0,
      description: "",
      transactionDate: defaultDateTime,
      walletId: 0,
    },
  });

  const currentType = form.watch("type");

  const onSubmit = (values: TransactionFormValues) => {
    // If the browser didn't append seconds (e.g., "2026-04-05T14:30"), we add ":00" 
    // so Spring Boot's LocalDateTime doesn't crash trying to parse it.
    const finalDateStr = values.transactionDate.length === 16 
      ? `${values.transactionDate}:00` 
      : values.transactionDate;

    const payload: TransactionRequestDto = {
      ...values,
      transactionDate: finalDateStr, 
    };

    createTx(payload, {
      onSuccess: () => {
        setOpen(false);
        form.reset({ ...form.getValues(), amount: 0, description: "" }); // Reset to current state but clear amount/note
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-600 hover:bg-brand-700 text-white shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>

        <Tabs 
          defaultValue="EXPENSE" 
          onValueChange={(val) => {
            form.setValue("type", val as any);
            form.clearErrors();
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="EXPENSE">Expense</TabsTrigger>
            <TabsTrigger value="INCOME">Income</TabsTrigger>
            <TabsTrigger value="TRANSFER">Transfer</TabsTrigger>
          </TabsList>

          {/* SHADCN FORM WRAPPER */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                {/* AMOUNT FIELD */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-gray-500">Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field} 
                          // Cast to Number directly to fix the TS error and remove need for z.coerce
                          onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* DATE & TIME FIELD */}
                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-gray-500">Date & Time</FormLabel>
                      <FormControl>
                        {/* datetime-local gives us exactly what we need for Floating Time */}
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* SOURCE WALLET FIELD */}
                <FormField
                  control={form.control}
                  name="walletId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-gray-500">
                        {currentType === "INCOME" ? "To Wallet" : "From Wallet"}
                      </FormLabel>
                      <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value ? field.value.toString() : undefined}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activeWallets.map(w => <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* DYNAMIC FIELD: CATEGORY OR TARGET WALLET */}
                {currentType === "TRANSFER" ? (
                  <FormField
                    control={form.control}
                    name="targetWalletId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-gray-500">To Wallet</FormLabel>
                        <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value ? field.value.toString() : undefined}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {activeWallets.map(w => <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-gray-500">Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* NOTE FIELD */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase text-gray-500">Note (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="What was this for?" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-4 bg-brand-600 hover:bg-brand-700" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Transaction"}
              </Button>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}