import { useCategories } from "@/hooks/useCategories";
import AddCategoryDialog from "@/components/categories/AddCategoryDialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2, Tag, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import CategoryStatsViewer from "@/components/categories/CategoryStatsViewer";
import { useState } from "react";
import { getDateRange } from "@/utils/dateRange";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { motion,type Variants } from "framer-motion";

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function CategoriesPage() {
  const defaultDateRange = getDateRange("THIS_MONTH");
  const { categories, isLoading, createCategory, isCreating, deleteCategory } =
    useCategories();
  const [activeRange, setActiveRange] = useState<
    "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS" | "CUSTOM"
  >("THIS_MONTH");
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>(defaultDateRange);

  const handleDateRangeChange = (
    range: "THIS_MONTH" | "LAST_MONTH" | "LAST_3_MONTHS",
  ) => {
    setActiveRange(range);
    setDateRange(getDateRange(range));
  };

  const handleCustomDateRange = (startDate: string, endDate: string) => {
    setDateRange({
      startDate,
      endDate,
    });
  };

  const incomeCategories = categories.filter((c) => c.type === "INCOME");
  const expenseCategories = categories.filter((c) => c.type === "EXPENSE");

  if (isLoading)
    return (
      <div className="flex h-[50vh] items-center justify-center text-muted-foreground animate-pulse">
        Loading categories...
      </div>
    );

  return (
    <div className="space-y-10 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">
            Categories
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage labels to track where your money comes and goes.
          </p>
        </div>
        <AddCategoryDialog onCreate={createCategory} isLoading={isCreating} />
      </div>

      {/* TABS SECTION */}
      <Tabs defaultValue="EXPENSE" className="w-full">
        {/* THE UPGRADE: Base shadow is just dark structure. Glow only happens on hover. */}
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 h-14 bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl p-1.5 shadow-inner mb-6 transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:border-white/10 group">
          <TabsTrigger 
            value="EXPENSE" 
            className="rounded-xl text-sm font-semibold text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground data-[state=active]:bg-white/15 data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_25px_rgba(255,255,255,0.12)] data-[state=active]:border data-[state=active]:border-white/10 border border-transparent"
          >
            Expenses
          </TabsTrigger>
          <TabsTrigger 
            value="INCOME" 
            className="rounded-xl text-sm font-semibold text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground data-[state=active]:bg-white/15 data-[state=active]:text-foreground data-[state=active]:shadow-[0_0_25px_rgba(255,255,255,0.12)] data-[state=active]:border data-[state=active]:border-white/10 border border-transparent"
          >
            Income
          </TabsTrigger>
        </TabsList>

        {/* EXPENSE TAB */}
        <TabsContent value="EXPENSE" className="mt-0 outline-none">
          {/* THE UPGRADE: Base is deep black shadow. Rose glow ONLY ignites on hover. Added 'group' to trigger the inner orb. */}
          <Card className="group bg-card/20 backdrop-blur-3xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden relative rounded-[2.5rem] transition-all duration-500 hover:border-rose-500/20 hover:shadow-[0_0_50px_rgba(244,63,94,0.15),inset_0_0_30px_rgba(255,255,255,0.04)]">
            {/* The inner ambient light is now dim by default, and brightens on hover */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 blur-[120px] pointer-events-none rounded-full transition-opacity duration-700 opacity-20 group-hover:opacity-100"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                  <ArrowUpCircle className="h-6 w-6 text-rose-400" />
                </div>
                Expense Categories
              </CardTitle>
              <CardDescription className="text-muted-foreground/70 text-base">
                Where your money goes (e.g., Rent, Food, Utilities).
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              {expenseCategories.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Tag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">No expense categories yet.</p>
                </div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {expenseCategories.map((category) => (
                    <motion.div
                      variants={itemVariants}
                      key={category.id}
                      // THE UPGRADE: Base shadow is standard. Glow happens only on hover.
                      className="group/pill flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/40 hover:bg-rose-500/10 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold tracking-wide text-foreground group-hover/pill:text-rose-100 transition-colors">
                          {category.name}
                        </span>
                        <span className="text-muted-foreground/60 text-xs mt-0.5 font-medium uppercase tracking-wider">
                          Limit: {category.budgetLimit ? `$${category.budgetLimit}` : "Unset"}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover/pill:opacity-100 h-9 w-9 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all shadow-none"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* INCOME TAB */}
        <TabsContent value="INCOME" className="mt-0 outline-none">
          {/* THE UPGRADE: Base is deep black shadow. Emerald glow ONLY ignites on hover. */}
          <Card className="group bg-card/20 backdrop-blur-3xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden relative rounded-[2.5rem] transition-all duration-500 hover:border-emerald-500/20 hover:shadow-[0_0_50px_rgba(16,185,129,0.15),inset_0_0_30px_rgba(255,255,255,0.04)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full transition-opacity duration-700 opacity-20 group-hover:opacity-100"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <ArrowDownCircle className="h-6 w-6 text-emerald-400" />
                </div>
                Income Categories
              </CardTitle>
              <CardDescription className="text-muted-foreground/70 text-base">
                Sources of money (e.g., Salary, Freelance, Investments).
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10">
              {incomeCategories.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Tag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg">No income categories yet.</p>
                </div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {incomeCategories.map((category) => (
                    <motion.div
                      variants={itemVariants}
                      key={category.id}
                      // THE UPGRADE: Base shadow is standard. Glow happens only on hover.
                      className="group/pill flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold tracking-wide text-foreground group-hover/pill:text-emerald-100 transition-colors">
                          {category.name}
                        </span>
                        <span className="text-muted-foreground/60 text-xs mt-0.5 font-medium uppercase tracking-wider">
                          Limit: {category.budgetLimit ? `$${category.budgetLimit}` : "Unset"}
                        </span>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover/pill:opacity-100 h-9 w-9 text-muted-foreground hover:text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all shadow-none"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CATEGORY STATS SECTION */}
      <div className="pt-10 space-y-6 relative">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
          <div>
            <h2 className="text-2xl font-bold text-foreground tracking-tight drop-shadow-sm">
              Spending Breakdown
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              See exactly where your money is going based on category limits.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-inner transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:border-white/10 self-start xl:self-auto overflow-x-auto no-scrollbar max-w-full">
            {["THIS_MONTH", "LAST_MONTH", "LAST_3_MONTHS"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                className={`rounded-xl px-4 text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeRange === item
                    ? "bg-white/15 text-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                }`}
                onClick={() => handleDateRangeChange(item as any)}
              >
                {item.replace(/_/g, " ")}
              </Button>
            ))}
            
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            
            <div className="shrink-0">
               <CustomDatePicker
                 activeRange={activeRange}
                 setActiveRange={setActiveRange}
                 setDateRange={handleCustomDateRange}
               />
            </div>
          </div>
        </div>

        {/* THE UPGRADE: Base is structural shadow. Primary glow ONLY ignites on hover. */}
        <div className="group rounded-[2.5rem] border border-white/10 bg-card/20 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] p-6 lg:p-8 relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_50px_rgba(79,70,229,0.15),inset_0_0_30px_rgba(255,255,255,0.04)]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[100px] pointer-events-none transition-opacity duration-700 opacity-20 group-hover:opacity-100"></div>
           
           <div className="relative z-10">
              <CategoryStatsViewer
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
              />
           </div>
        </div>
      </div>
    </div>
  );
}