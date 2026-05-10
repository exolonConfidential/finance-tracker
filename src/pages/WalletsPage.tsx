import { useState } from "react";
import { useWallets, useWalletAnalytics } from "@/hooks/useWallets";
import { useUser } from "@/hooks/useUser";
import { formatCurrency } from "@/utils/Currency";
import AddWalletDialog from "@/components/wallets/AddWalletDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { motion, type Variants } from "framer-motion";
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
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

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
      <div className="flex h-[50vh] items-center justify-center text-muted-foreground animate-pulse">
        Loading accounts...
      </div>
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
      {/* --- SECTION 1: ACCOUNT CARDS --- */}
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">
              Accounts
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your accounts and track your wealth allocation.
            </p>
          </div>
          <AddWalletDialog onCreate={createWallet} isLoading={isCreating} />
        </div>

        {wallets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl py-20 text-center shadow-2xl"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Wallet className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No accounts yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-2 leading-relaxed">
              Create your first account to start tracking your balances and cash
              flow.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {wallets.map((wallet) => {
              const percentage =
                totalNetWorth === 0 || !wallet.isActive
                  ? 0
                  : (wallet.balance / totalNetWorth) * 100;

              return (
                <motion.div
                  variants={itemVariants}
                  key={wallet.id}
                  className={`group relative flex h-64 flex-col justify-between rounded-3xl p-6 transition-all duration-300 border
                    ${
                      wallet.isActive
                        ? "bg-card/40 backdrop-blur-xl border-white/10 shadow-[0_0_15px_rgba(79,70,229,0.08)] hover:border-primary/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.25)] hover:-translate-y-1 cursor-pointer"
                        : "bg-background/20 backdrop-blur-md border-white/5 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                    }`}
                >
                  <div className="relative z-10 flex items-start justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-2xl border ${wallet.isActive ? "bg-white/10 border-white/10 text-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]" : "bg-white/5 border-white/5 text-muted-foreground"}`}
                      >
                        {getWalletIcon(wallet.type, "h-6 w-6")}
                      </div>
                      <div>
                        <h3
                          className={`font-bold tracking-wide text-lg ${wallet.isActive ? "text-foreground drop-shadow-sm" : "text-muted-foreground"}`}
                        >
                          {wallet.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className={`h-2 w-2 rounded-full ${wallet.isActive ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-muted-foreground"}`}
                          ></div>
                          <span
                            className={`text-[11px] font-semibold uppercase tracking-wider ${wallet.isActive ? "text-emerald-400" : "text-muted-foreground"}`}
                          >
                            {wallet.isActive ? "Active" : "Archived"}
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
                            className={`absolute right-0 top-0 h-9 w-9 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 border border-transparent z-20
                              ${wallet.isActive ? "text-muted-foreground hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30" : "text-muted-foreground hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30"}`}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents card click if you ever add one
                              toggleWallet(wallet.id);
                            }}
                          >
                            {wallet.isActive ? (
                              <Trash2 className="h-4 w-4" />
                            ) : (
                              <ArchiveRestore className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-background/90 backdrop-blur-xl border-white/10 text-foreground font-medium">
                          <p>
                            {wallet.isActive
                              ? "Archive Account"
                              : "Restore Account"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="relative z-10 mt-4">
                    <p
                      className={`text-xs font-semibold uppercase tracking-widest mb-1.5 ${wallet.isActive ? "text-muted-foreground" : "text-muted-foreground/50"}`}
                    >
                      Current Balance
                    </p>
                    <p
                      className={`text-4xl font-extrabold tracking-tight ${wallet.isActive ? "text-foreground drop-shadow-md" : "text-muted-foreground"}`}
                    >
                      {formatCurrency(wallet.balance, currencyCode)}
                    </p>
                    {wallet.balance === 0 && wallet.isActive && (
                      <p className="flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 w-fit px-2.5 py-1 rounded-full">
                        <Info className="h-3.5 w-3.5" /> Awaiting initial funds
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 mt-auto pt-6">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span
                        className={`flex items-center gap-1.5 font-medium ${wallet.isActive ? "text-muted-foreground" : "text-muted-foreground/50"}`}
                      >
                        <PieChart className="h-3.5 w-3.5" /> Net Worth
                        Allocation
                      </span>
                      <span
                        className={`font-bold ${wallet.isActive ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {wallet.isActive ? `${percentage.toFixed(1)}%` : "N/A"}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-2 w-full rounded-full ${wallet.isActive ? "bg-black/40" : "bg-black/20"}`}
                      indicatorClassName={
                        wallet.isActive
                          ? "bg-gradient-to-r from-primary to-cyan-400"
                          : "bg-muted-foreground"
                      }
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* --- SECTION 2: GLOWING ANALYTICS CHART --- */}
      {wallets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          // THE UPGRADE: Completely unclickable (cursor-default), deeply blurred, with a stunning breathing edge glow
          className="rounded-[2.5rem] border border-white/10 bg-card/20 backdrop-blur-3xl p-6 lg:p-8 shadow-[0_0_30px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] relative overflow-hidden transition-all duration-700 hover:border-primary/30 hover:shadow-[0_0_50px_rgba(79,70,229,0.15),inset_0_0_20px_rgba(255,255,255,0.02)] cursor-default group"
        >
          {/* Subtle background glow that pulses gently on hover */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-br from-primary/5 to-purple-500/5 blur-[100px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>

          <div className="mb-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-end relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight drop-shadow-sm">
                Cash Flow Analytics
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Money in vs. money out across your active accounts.
              </p>
            </div>

            {/* THE UPGRADE: Glassmorphic Inline Date Pills */}
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-inner self-start xl:self-auto">
              {/* Start Date Pill */}
              <div className="flex items-center bg-white/5 hover:bg-white/10 rounded-xl px-3 py-1.5 border border-white/5 transition-colors focus-within:border-primary/50 focus-within:bg-primary/5 group/input">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors">
                  Start
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
                  className="h-7 text-xs font-medium bg-transparent border-0 focus-visible:ring-0 shadow-none px-1 appearance-none [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                />
              </div>

              <div className="h-4 w-px bg-white/10 mx-1"></div>

              {/* End Date Pill */}
              <div className="flex items-center bg-white/5 hover:bg-white/10 rounded-xl px-3 py-1.5 border border-white/5 transition-colors focus-within:border-primary/50 focus-within:bg-primary/5 group/input">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors" />
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2 group-focus-within/input:text-primary transition-colors">
                  End
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
                  className="h-7 text-xs font-medium bg-transparent border-0 focus-visible:ring-0 shadow-none px-1 appearance-none [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                />
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full relative z-10">
            {isLoadingAnalytics ? (
              <div className="flex h-full items-center justify-center text-muted-foreground animate-pulse">
                Rendering analytics...
              </div>
            ) : !analyticsData || analyticsData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No transaction data found for this period.
              </div>
            ) : (
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="cursor-default"
              >
                <BarChart
                  data={analyticsData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                  barSize={32}
                  barGap={12}
                >
                  {/* SVG DEFS FOR NEON GRADIENTS */}
                  <defs>
                    <linearGradient
                      id="incomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fb7185" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#e11d48"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                    <linearGradient
                      id="incomeInactive"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseInactive"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fb7185" stopOpacity={0.3} />
                      <stop
                        offset="100%"
                        stopColor="#e11d48"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="walletName"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "rgba(255,255,255,0.5)",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                    dy={15}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                    dx={-10}
                    tickFormatter={(value) =>
                      formatCurrency(value, currencyCode)
                    }
                  />

                  {/* GLASSMORPHIC TOOLTIP */}
                  <ChartTooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    formatter={(value: any) => [
                      `${formatCurrency(Number(value) || 0, currencyCode)}`,
                      undefined,
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      backdropFilter: "blur(16px)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                      padding: "16px",
                      color: "#fff",
                    }}
                    itemStyle={{
                      fontWeight: 600,
                      fontSize: "15px",
                      paddingTop: "4px",
                    }}
                    labelStyle={{
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  />

                  <Legend
                    wrapperStyle={{ paddingTop: "30px" }}
                    iconType="circle"
                    iconSize={8}
                  />

                  <Bar
                    dataKey="totalIn"
                    name="Money In"
                    fill="url(#incomeGradient)"
                    shape={(props: any) => {
                      const { payload, ...rest } = props;
                      const activeFill = payload.walletIsActive
                        ? "url(#incomeGradient)"
                        : "url(#incomeInactive)";
                      return (
                        <Rectangle
                          {...rest}
                          fill={activeFill}
                          radius={[6, 6, 0, 0]}
                        />
                      );
                    }}
                  />

                  <Bar
                    dataKey="totalOut"
                    name="Money Out"
                    fill="url(#expenseGradient)"
                    shape={(props: any) => {
                      const { payload, ...rest } = props;
                      const activeFill = payload.walletIsActive
                        ? "url(#expenseGradient)"
                        : "url(#expenseInactive)";
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
        </motion.div>
      )}
    </div>
  );
}
