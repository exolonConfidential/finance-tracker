import { useUser } from "@/hooks/useUser";
import { Progress } from "@/components/ui/progress";
import { ArrowDownRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useCategoryStats } from "@/hooks/useCategories";
import { formatCurrency } from "@/utils/Currency";
import { motion,type Variants } from "framer-motion";

interface CategoryStatsViewerProps {
  startDate: string;
  endDate: string;
}

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CategoryStatsViewer({
  startDate,
  endDate,
}: CategoryStatsViewerProps) {
  const { data: user } = useUser();
  const currencyCode = user?.currency || "USD";

  const { data: stats, isLoading } = useCategoryStats(startDate, endDate);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground animate-pulse">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Rendering stats...
      </div>
    );
  }

  if (!stats || stats.length === 0) return (
    <div className="flex h-40 items-center justify-center text-muted-foreground/60 font-medium">
      No transactions found for this period.
    </div>
  );

  // Separate and sort the data (highest amounts first)
  const expenses = stats
    .filter((s) => s.type === "EXPENSE")
    .sort((a, b) => b.totalAmount - a.totalAmount);
  const incomes = stats
    .filter((s) => s.type === "INCOME")
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const totalExpense = expenses.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalIncome = incomes.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      
      {/* EXPENSE CARD (Deep Sunk Glass) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-black/20 p-6 shadow-inner group"
      >
        {/* Subtle internal glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-rose-500/10 blur-[50px] transition-opacity duration-500 opacity-50 group-hover:opacity-100 pointer-events-none"></div>

        <div className="relative z-10 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
              <ArrowDownRight className="h-5 w-5" />
            </div>
            <h3 className="font-bold tracking-tight text-foreground text-lg">Top Expenses</h3>
          </div>
          <span className="text-xl font-extrabold text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]">
            -{formatCurrency(totalExpense, currencyCode)}
          </span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-5 relative z-10"
        >
          {expenses.length === 0 ? (
            <p className="text-sm text-muted-foreground/50 italic">No expenses in this period.</p>
          ) : (
            expenses.slice(0, 4).map((stat) => {
              const percentage = (stat.totalAmount / totalExpense) * 100;
              return (
                <motion.div variants={itemVariants} key={stat.categoryName} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold tracking-wide text-muted-foreground">
                      {stat.categoryName}
                    </span>
                    <span className="font-bold text-foreground">
                      {formatCurrency(stat.totalAmount, currencyCode)}
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2 bg-black/40 border border-white/5"
                    indicatorClassName="bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]"
                  />
                </motion.div>
              );
            })
          )}
        </motion.div>
      </motion.div>

      {/* INCOME CARD (Deep Sunk Glass) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-black/20 p-6 shadow-inner group"
      >
        {/* Subtle internal glow */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-[50px] transition-opacity duration-500 opacity-50 group-hover:opacity-100 pointer-events-none"></div>

        <div className="relative z-10 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <h3 className="font-bold tracking-tight text-foreground text-lg">Income Sources</h3>
          </div>
          <span className="text-xl font-extrabold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">
            +{formatCurrency(totalIncome, currencyCode)}
          </span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-5 relative z-10"
        >
          {incomes.length === 0 ? (
            <p className="text-sm text-muted-foreground/50 italic">No income in this period.</p>
          ) : (
            incomes.slice(0, 4).map((stat) => {
              const percentage = (stat.totalAmount / totalIncome) * 100;
              return (
                <motion.div variants={itemVariants} key={stat.categoryName} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold tracking-wide text-muted-foreground">
                      {stat.categoryName}
                    </span>
                    <span className="font-bold text-foreground">
                      {formatCurrency(stat.totalAmount, currencyCode)}
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2 bg-black/40 border border-white/5"
                    indicatorClassName="bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                  />
                </motion.div>
              );
            })
          )}
        </motion.div>
      </motion.div>

    </div>
  );
}