import { useUser } from "@/hooks/useUser";
import { Progress } from "@/components/ui/progress";
import { ArrowDownRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useCategoryStats } from "@/hooks/useCategories";
import { formatCurrency } from "@/utils/Currency";

interface CategoryStatsViewerProps {
  startDate: string;
  endDate: string;
}

export default function CategoryStatsViewer({
  startDate,
  endDate,
}: CategoryStatsViewerProps) {
  const { data: user } = useUser();
  const currencyCode = user?.currency || "USD";

  const { data: stats, isLoading } = useCategoryStats(startDate, endDate);

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!stats || stats.length === 0) return null;

  // Separate and sort the data (highest amounts first)
  const expenses = stats
    .filter((s) => s.type === "EXPENSE")
    .sort((a, b) => b.totalAmount - a.totalAmount);
  const incomes = stats
    .filter((s) => s.type === "INCOME")
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const totalExpense = expenses.reduce(
    (sum, item) => sum + item.totalAmount,
    0,
  );
  const totalIncome = incomes.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* EXPENSE CARD */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <ArrowDownRight className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-gray-900">Top Expenses</h3>
          </div>
          <span className="text-lg font-bold text-rose-600">
            -{formatCurrency(totalExpense, currencyCode)}
          </span>
        </div>

        <div className="space-y-4 mt-6">
          {expenses.length === 0 ? (
            <p className="text-sm text-gray-500">No expenses in this period.</p>
          ) : (
            expenses.slice(0, 4).map((stat) => {
              const percentage = (stat.totalAmount / totalExpense) * 100;
              return (
                <div key={stat.categoryName} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {stat.categoryName}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(stat.totalAmount, currencyCode)}
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2 bg-rose-100"
                    indicatorClassName="bg-rose-500"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* INCOME CARD */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-gray-900">Income Sources</h3>
          </div>
          <span className="text-lg font-bold text-emerald-600">
            +{formatCurrency(totalIncome, currencyCode)}
          </span>
        </div>

        <div className="space-y-4 mt-6">
          {incomes.length === 0 ? (
            <p className="text-sm text-gray-500">No income in this period.</p>
          ) : (
            incomes.slice(0, 4).map((stat) => {
              const percentage = (stat.totalAmount / totalIncome) * 100;
              return (
                <div key={stat.categoryName} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {stat.categoryName}
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(stat.totalAmount, currencyCode)}
                    </span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2 bg-emerald-100"
                    indicatorClassName="bg-emerald-500"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
