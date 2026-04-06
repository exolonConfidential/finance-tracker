import { useState } from "react";
import { useWallets, useWalletAnalytics } from "@/hooks/useWallets";
import { useUser } from "@/hooks/useUser";
import { formatCurrency } from "@/utils/Currency";
import AddWalletDialog from "@/components/wallets/AddWalletDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend,
  Rectangle,
} from "recharts";
import {
  Wallet,
  CreditCard,
  Landmark,
  Banknote,
  PiggyBank,
  TrendingUp,
  PieChart,
  Trash2,
  ArchiveRestore,
  Info,
} from "lucide-react";
import { format } from "date-fns";


export default function WalletsPage() {
  const { wallets, isLoading, createWallet, isCreating, toggleWallet } =
    useWallets();
  const { data: user } = useUser();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [dateRange, setDateRange] = useState({
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(today, "yyyy-MM-dd"),
  });

  const { data: analyticsData, isLoading: isLoadingAnalytics } =
    useWalletAnalytics(dateRange.startDate, dateRange.endDate);

  const currencyCode = user?.currency || "USD";

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-500">Loading wallets...</div>
    );

  const activeWallets = wallets.filter((w) => w.isActive);
  const totalNetWorth = activeWallets.reduce(
    (sum, wallet) => sum + wallet.balance,
    0,
  );

  const getWalletIcon = (type: string, className: string) => {
    switch (type) {
      case "CASH":
        return <Banknote className={className} />;
      case "BANK_ACCOUNT":
        return <Landmark className={className} />;
      case "CREDIT_CARD":
        return <CreditCard className={className} />;
      case "SAVINGS":
        return <PiggyBank className={className} />;
      case "INVESTMENT":
        return <TrendingUp className={className} />;
      default:
        return <Wallet className={className} />;
    }
  };

  return (
    <div className="space-y-12 pb-10">
      {/* --- SECTION 1: WALLET CARDS --- */}
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Wallets
            </h1>
            <p className="text-sm text-gray-500">
              Manage your accounts and track your wealth allocation.
            </p>
          </div>
          <AddWalletDialog onCreate={createWallet} isLoading={isCreating} />
        </div>

        {wallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
            <Wallet className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No wallets yet
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mt-1">
              Create a wallet to start tracking your balances.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wallets.map((wallet) => {
              const percentage =
                totalNetWorth === 0 || !wallet.isActive
                  ? 0
                  : (wallet.balance / totalNetWorth) * 100;

              return (
                <div
                  key={wallet.id}
                  className={`group relative flex h-60 flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-sm transition-all hover:shadow-md ${wallet.isActive ? "bg-linear-to-br from-brand-600 to-teal-800 text-white" : "bg-slate-50 border-2 border-slate-200 text-slate-600"}`}
                >
                  {wallet.isActive && (
                    <>
                      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-black/10 blur-xl"></div>
                    </>
                  )}

                  <div className="relative z-10 flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${wallet.isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"}`}
                      >
                        {getWalletIcon(wallet.type, "h-5 w-5")}
                      </div>
                      <div>
                        <h3
                          className={`font-bold tracking-wide ${wallet.isActive ? "text-white" : "text-slate-700"}`}
                        >
                          {wallet.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div
                            className={`h-2 w-2 rounded-full ${wallet.isActive ? "bg-emerald-300" : "bg-slate-400"}`}
                          ></div>
                          <span
                            className={`text-xs font-medium ${wallet.isActive ? "text-brand-100" : "text-slate-500"}`}
                          >
                            {wallet.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute right-0 top-0 h-8 w-8 transition-opacity opacity-0 group-hover:opacity-100 ${wallet.isActive ? "text-white/70 hover:bg-red-500 hover:text-white" : "text-slate-400 hover:bg-emerald-100 hover:text-emerald-600"}`}
                            onClick={() => toggleWallet(wallet.id)}
                          >
                            {wallet.isActive ? (
                              <Trash2 className="h-4 w-4" />
                            ) : (
                              <ArchiveRestore className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {wallet.isActive
                              ? "Disable Wallet"
                              : "Enable Wallet"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative z-10 mt-2">
                    <p
                      className={`text-xs font-medium uppercase tracking-wider mb-1 ${wallet.isActive ? "text-brand-200" : "text-slate-400"}`}
                    >
                      Current Balance
                    </p>
                    <p
                      className={`text-3xl font-bold tracking-tight ${wallet.isActive ? "text-white" : "text-slate-800"}`}
                    >
                      {formatCurrency(wallet.balance, currencyCode)}
                    </p>
                    {wallet.balance === 0 && wallet.isActive && (
                      <p className="flex items-center gap-1 mt-1 text-[11px] font-medium text-brand-200 bg-black/10 w-fit px-2 py-0.5 rounded-full">
                        <Info className="h-3 w-3" /> Log an income transaction
                        to add funds
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 mt-auto pt-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span
                        className={`flex items-center gap-1 ${wallet.isActive ? "text-brand-100" : "text-slate-500"}`}
                      >
                        <PieChart className="h-3 w-3" /> Allocation
                      </span>
                      <span
                        className={`font-medium ${wallet.isActive ? "text-white" : "text-slate-700"}`}
                      >
                        {wallet.isActive ? `${percentage.toFixed(1)}%` : "N/A"}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-1.5 w-full ${wallet.isActive ? "bg-black/20" : "bg-slate-200"}`}
                      indicatorClassName={
                        wallet.isActive ? "bg-white" : "bg-slate-400"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- SECTION 2: ANALYTICS CHART --- */}
      {wallets.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Cash Flow Analytics
              </h2>
              <p className="text-sm text-gray-500">
                Money in and out per wallet based on transactions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="h-9 w-[140px] text-sm bg-gray-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                  End Date
                </label>
                <Input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className="h-9 w-[140px] text-sm bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            {isLoadingAnalytics ? (
              <div className="flex h-full items-center justify-center text-gray-400">
                Loading chart...
              </div>
            ) : !analyticsData || analyticsData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-gray-400">
                No transaction data for this date range.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {/* Added barSize and barGap for sleeker visuals */}
                <BarChart
                  data={analyticsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={28}
                  barGap={8}
                >
                  {/* Softer grid lines */}
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="walletName"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 13, fontWeight: 500 }}
                    dy={15}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    dx={-10}
                    tickFormatter={(value) =>
                      formatCurrency(value, currencyCode)
                    }
                  />

                  {/* Premium tooltip styling */}
                  <ChartTooltip
                    cursor={{ fill: "#f8fafc" }}
                    formatter={(value: any) => [
                      `${formatCurrency(Number(value) || 0, currencyCode)}`,
                      undefined,
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow:
                        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                      padding: "12px",
                    }}
                    itemStyle={{ fontWeight: 600, fontSize: "14px" }}
                    labelStyle={{
                      color: "#64748b",
                      marginBottom: "4px",
                      fontSize: "13px",
                    }}
                  />

                  <Legend
                    wrapperStyle={{ paddingTop: "30px" }}
                    iconType="circle"
                    iconSize={10}
                  />

                  {/* Total IN Bar - Base fill added for the Legend to read */}
                  <Bar
                    dataKey="totalIn"
                    name="Money In"
                    fill="#10b981"
                    shape={(props: any) => {
                      const { payload, ...rest } = props;
                      const activeFill = payload.walletIsActive
                        ? "#10b981"
                        : "#a7f3d0";
                      return (
                        <Rectangle
                          {...rest}
                          fill={activeFill}
                          radius={[6, 6, 0, 0]}
                        />
                      );
                    }}
                  />

                  {/* Total OUT Bar - Base fill added for the Legend to read */}
                  <Bar
                    dataKey="totalOut"
                    name="Money Out"
                    fill="#ef4444"
                    shape={(props: any) => {
                      const { payload, ...rest } = props;
                      const activeFill = payload.walletIsActive
                        ? "#ef4444"
                        : "#fecaca";
                      return (
                        <Rectangle
                          {...rest}
                          fill={activeFill}
                          radius={[6, 6, 0, 0]}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
