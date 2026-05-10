import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useWallets } from "@/hooks/useWallets";
import { useCategories } from "@/hooks/useCategories";
import { type TransactionFilters } from "@/api/transactions";
import { getDateRange } from "@/utils/dateRange";
import { formatCurrency } from "@/utils/Currency"; 
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion,type Variants } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRightLeft,
  Wallet,
  Tag,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";
import { CustomDatePicker } from "@/components/CustomDatePicker";

// Framer Motion Variants for staggered table rows
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function TransactionsPage() {
  const { data: user } = useUser();
  const currencyCode = user?.currency || "USD";

  const { wallets } = useWallets();
  const { categories } = useCategories();

  const defaultDateRange = getDateRange("THIS_MONTH");
  const [activeDateFilter, setActiveDateFilter] = useState<string>("THIS_MONTH");

  const [filters, setFilters] = useState<TransactionFilters>({
    page: 0,
    size: 10,
    startDate: defaultDateRange.startDate,
    endDate: defaultDateRange.endDate,
    type: "", 
    walletId: "",
    categoryId: "",
  });

  const { data: pageData, isLoading, isFetching } = useTransactions(filters);

  const handleDateFilterClick = (
    rangeType: "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS" | "ALL_TIME",
  ) => {
    setActiveDateFilter(rangeType);
    if (rangeType === "ALL_TIME") {
      setFilters({ ...filters, startDate: "", endDate: "", page: 0 });
    } else {
      const dates = getDateRange(rangeType);
      setFilters({
        ...filters,
        startDate: dates.startDate,
        endDate: dates.endDate,
        page: 0,
      });
    }
  };

  const handleCustomDateRange = (startDate: string, endDate: string) => {
    setFilters({ ...filters, page: 0, startDate, endDate });
  };

  const handleFilterChange = (key: keyof TransactionFilters, value: string) => {
    setFilters({ ...filters, [key]: value, page: 0 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  // --- RENDER HELPERS (Now with Hover Glows & Centering) ---
  const renderTransactionIcon = (type: string) => {
    if (type === "INCOME")
      return (
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] group-hover:bg-emerald-500/20">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      );
    if (type === "EXPENSE")
      return (
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] group-hover:bg-rose-500/20">
          <ArrowDownRight className="h-5 w-5" />
        </div>
      );
    return (
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] group-hover:bg-cyan-500/20">
        <ArrowRightLeft className="h-5 w-5" />
      </div>
    );
  };

  const renderAmount = (amount: number, type: string) => {
    if (type === "INCOME")
      return (
        <span className="font-extrabold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
          +{formatCurrency(amount, currencyCode)}
        </span>
      );
    if (type === "EXPENSE")
      return (
        <span className="font-extrabold text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">
          -{formatCurrency(amount, currencyCode)}
        </span>
      );
    return (
      <span className="font-extrabold text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
        {formatCurrency(amount, currencyCode)}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">
            Transactions
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View, filter, and analyze your financial history.
          </p>
        </div>
        <AddTransactionDialog />
      </div>

      {/* FILTER DASHBOARD (Glass Panel) */}
      <div className="rounded-[2rem] border border-white/10 bg-card/20 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] p-6 space-y-6 relative overflow-hidden">
        
        {/* Subtle ambient glow behind filters */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] pointer-events-none rounded-full"></div>

        {/* Row 1: Quick Dates & Custom Picker */}
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 border-b border-white/5 pb-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mr-2 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Timeline
          </span>
          
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-inner overflow-x-auto no-scrollbar max-w-full">
            {["THIS_MONTH", "LAST_MONTH", "LAST_3_MONTHS", "ALL_TIME"].map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                className={`rounded-xl px-4 text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeDateFilter === range
                    ? "bg-white/15 text-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                }`}
                onClick={() => handleDateFilterClick(range as any)}
              >
                {range.replace(/_/g, " ")}
              </Button>
            ))}
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            <CustomDatePicker
              activeRange={activeDateFilter}
              setActiveRange={setActiveDateFilter}
              setDateRange={handleCustomDateRange}
            />
          </div>
        </div>

        {/* Row 2: Select Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          <Select value={filters.type} onValueChange={(val) => handleFilterChange("type", val === "ALL" ? "" : val)}>
            <SelectTrigger className="h-12 bg-black/20 backdrop-blur-sm border-white/10 focus:ring-primary focus:border-primary transition-all rounded-xl text-foreground">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
              <SelectItem value="ALL" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">All Types</SelectItem>
              <SelectItem value="INCOME" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Income</SelectItem>
              <SelectItem value="EXPENSE" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Expense</SelectItem>
              <SelectItem value="TRANSFER" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">Transfer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.walletId} onValueChange={(val) => handleFilterChange("walletId", val === "ALL" ? "" : val)}>
            <SelectTrigger className="h-12 bg-black/20 backdrop-blur-sm border-white/10 focus:ring-primary focus:border-primary transition-all rounded-xl text-foreground">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="All Accounts" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl">
              <SelectItem value="ALL" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">All Accounts</SelectItem>
              {wallets.map((w) => (
                <SelectItem key={w.id} value={w.id.toString()} className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.categoryId} onValueChange={(val) => handleFilterChange("categoryId", val === "ALL" ? "" : val)} disabled={filters.type === "TRANSFER"}>
            <SelectTrigger className="h-12 bg-black/20 backdrop-blur-sm border-white/10 focus:ring-primary focus:border-primary transition-all rounded-xl text-foreground disabled:opacity-50">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl max-h-[300px]">
              <SelectItem value="ALL" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()} className="hover:bg-white/5 focus:bg-white/5 cursor-pointer rounded-lg my-0.5">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* DATA TABLE (Glass Panel) */}
      <div className="rounded-[2rem] border border-white/10 bg-card/20 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative">
        
        {/* Subtle loading indicator overlay */}
        {isFetching && !isLoading && (
          <div className="absolute inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-black/50 border border-white/10 shadow-2xl">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm font-medium text-foreground">Updating ledger...</span>
            </div>
          </div>
        )}

        <Table>
          <TableHeader className="bg-white/5 border-b border-white/10">
            <TableRow className="hover:bg-transparent border-0">
              {/* THE ALIGNMENT FIX: Explicitly forcing text-left, text-center, text-right */}
              <TableHead className="w-24 py-4 text-center"></TableHead>
              <TableHead className="py-4 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Transaction</TableHead>
              <TableHead className="py-4 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Account</TableHead>
              <TableHead className="py-4 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</TableHead>
              <TableHead className="py-4 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {isLoading ? (
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                   <div className="flex flex-col items-center justify-center gap-2">
                       <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
                       Loading transactions...
                   </div>
                </TableCell>
              </TableRow>
            ) : pageData?.content.length === 0 ? (
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground font-medium">
                  No transactions found for these filters.
                </TableCell>
              </TableRow>
            ) : (
              <motion.tbody 
                variants={containerVariants} 
                initial="hidden" 
                animate="show"
                className="w-full table-row-group"
              >
                {pageData?.content.map((tx) => (
                  <motion.tr
                    variants={rowVariants}
                    key={tx.id}
                    // THE HOVER FIX: Primary ambient wash over the background to create the glow
                    className="group border-b border-white/5 hover:bg-primary/5 transition-colors duration-300 cursor-pointer"
                  >
                    <TableCell className="py-4 text-center align-middle">
                      {renderTransactionIcon(tx.type)}
                    </TableCell>
                    
                    <TableCell className="py-4 text-left align-middle">
                      {/* THE TEXT GLOW FIX: drop-shadow blooming on hover */}
                      <p className="font-semibold text-foreground tracking-wide group-hover:text-primary transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                        {tx.description || (tx.type === "TRANSFER" ? "Transfer" : "Untitled")}
                      </p>
                      {tx.type !== "TRANSFER" && tx.categoryName && (
                        <Badge variant="outline" className="mt-1.5 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground bg-white/5 border-white/10 group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300">
                          {tx.categoryName}
                        </Badge>
                      )}
                    </TableCell>
                    
                    <TableCell className="py-4 text-left align-middle">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium group-hover:text-foreground/90 transition-colors duration-300">
                        <span>{tx.walletName}</span>
                        {tx.type === "TRANSFER" && tx.targetWalletName && (
                          <>
                            <ArrowRightLeft className="h-3 w-3 text-primary/50 group-hover:text-primary transition-colors" />
                            <span>{tx.targetWalletName}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4 text-left text-sm text-muted-foreground/80 font-medium align-middle group-hover:text-foreground/80 transition-colors duration-300">
                      {new Date(tx.transactionDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </TableCell>
                    
                    <TableCell className="py-4 text-right text-base align-middle pr-6">
                      {renderAmount(tx.amount, tx.type)}
                    </TableCell>
                  </motion.tr>
                ))}
              </motion.tbody>
            )}
          </TableBody>
        </Table>

        {/* PAGINATION CONTROLS */}
        {pageData && pageData.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/10 bg-black/20 p-4">
            <p className="text-sm text-muted-foreground font-medium">
              Showing page <span className="font-bold text-foreground">{pageData.number + 1}</span> of <span className="font-bold text-foreground">{pageData.totalPages}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 0}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-foreground disabled:opacity-30 rounded-xl transition-all"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= pageData.totalPages - 1}
                className="bg-white/5 border-white/10 hover:bg-white/10 text-foreground disabled:opacity-30 rounded-xl transition-all"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}