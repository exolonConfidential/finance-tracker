import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, WalletCards } from "lucide-react";
import type { Wallet } from "@/api/wallets";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum([
    "CASH",
    "BANK_ACCOUNT",
    "CREDIT_CARD",
    "INVESTMENT",
    "SAVINGS",
  ]),
});

interface Props {
  onCreate: (values: z.infer<typeof formSchema>) => Promise<Wallet>;
  isLoading: boolean;
}

export default function AddWalletDialog({ onCreate, isLoading }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "BANK_ACCOUNT", 
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await onCreate(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Glowing Primary Button */}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all rounded-xl h-11 px-5">
          <Plus className="h-4 w-4" /> Add Account
        </Button>
      </DialogTrigger>
      
      {/* Glassmorphic Modal Content */}
      <DialogContent className="sm:max-w-[425px] bg-card/60 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-3xl">
        
        {/* Subtle inner glow for the modal */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

        <DialogHeader className="relative z-10">
          <DialogTitle className="flex items-center gap-3 text-xl tracking-tight text-foreground">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
               <WalletCards className="h-5 w-5 text-primary" />
            </div>
            New Account
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4 relative z-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. HDFC Bank, Cash" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Account Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 bg-background/50 backdrop-blur-sm border-white/10 focus:ring-primary focus:border-primary transition-all rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background/90 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
                      <SelectItem value="BANK_ACCOUNT" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Bank Account</SelectItem>
                      <SelectItem value="CASH" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Cash</SelectItem>
                      <SelectItem value="CREDIT_CARD" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Credit Card</SelectItem>
                      <SelectItem value="SAVINGS" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Savings</SelectItem>
                      <SelectItem value="INVESTMENT" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-11 border-white/10 bg-transparent hover:bg-white/5 text-foreground rounded-xl transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all rounded-xl px-6"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}