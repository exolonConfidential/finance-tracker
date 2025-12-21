import { useDashboard } from "@/hooks/useDashboard";
import { useUser } from "@/hooks/useUser";
import { formatCurrency } from "@/utils/Currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    ArrowDownRight, 
    ArrowUpRight, 
    Wallet, 
    ArrowRightLeft, 
    Loader2 
} from "lucide-react"; 
import { format } from "date-fns";
import type { RecentTransaction } from "@/api/dashboard";

export default function DashboardPage() {
    // 1. Fetch Data
    const { data: user } = useUser();
    const { data: stats, isLoading, error } = useDashboard();

    const currencyCode = user?.currency || "USD";

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Failed to load dashboard data.</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <Button className="bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-100">
                    + New Transaction
                </Button>
            </div>

            {/* 1. Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {/* Total Balance */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(stats?.totalBalance || 0, currencyCode)}
                        </div>
                    </CardContent>
                </Card>

                {/* Income */}
                <Card className="border-l-4 border-l-brand-600 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Income</CardTitle>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                            <ArrowDownRight className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">
                            +{formatCurrency(stats?.totalIncome || 0, currencyCode)}
                        </div>
                    </CardContent>
                </Card>

                {/* Expense */}
                <Card className="border-l-4 border-l-red-400 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            -{formatCurrency(stats?.totalExpense || 0, currencyCode)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Main Grid: Charts (Placeholder) & Recent Transactions */}
            <div className="grid gap-4 md:grid-cols-7">
                
                {/* Left Side: Charts (Taking up 4 columns) */}
                <Card className="col-span-4 hidden md:block border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-gray-400 bg-gray-50/50 rounded-lg m-4 border border-dashed">
                        Chart Component Coming Soon
                    </CardContent>
                </Card>

                {/* Right Side: Recent Transactions (Taking up 3 columns) */}
                <Card className="col-span-4 md:col-span-3 border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {(stats?.recentTransactions || []).length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-4">No recent transactions</p>
                            ) : (
                                stats?.recentTransactions.map((t: RecentTransaction) => (
                                    <div key={t.id} className="flex items-center justify-between group">
                                        <div className="flex items-center space-x-4">
                                            {/* Icon Logic */}
                                            <div className={`
                                                flex h-10 w-10 items-center justify-center rounded-full transition-colors
                                                ${t.type === 'INCOME' ? 'bg-emerald-100 text-emerald-600' : ''}
                                                ${t.type === 'EXPENSE' ? 'bg-red-100 text-red-600' : ''}
                                                ${t.type === 'TRANSFER' ? 'bg-blue-100 text-blue-600' : ''}
                                            `}>
                                                {t.type === 'INCOME' && <ArrowDownRight className="h-5 w-5" />}
                                                {t.type === 'EXPENSE' && <ArrowUpRight className="h-5 w-5" />}
                                                {t.type === 'TRANSFER' && <ArrowRightLeft className="h-5 w-5" />}
                                            </div>

                                            <div className="space-y-1">
                                                {/* Logic to show "Food" or "Transfer to Savings" */}
                                                <p className="text-sm font-medium leading-none text-gray-900">
                                                    {t.type === 'TRANSFER' && t.targetWalletName 
                                                        ? `Transfer to ${t.targetWalletName}` 
                                                        : t.categoryName || t.description}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {format(new Date(t.transactionDate), 'MMM dd, yyyy')} • {t.walletName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`font-bold text-sm 
                                            ${t.type === 'INCOME' ? 'text-emerald-600' : ''}
                                            ${t.type === 'EXPENSE' ? 'text-gray-900' : ''}
                                            ${t.type === 'TRANSFER' ? 'text-blue-600' : ''}
                                        `}>
                                            {t.type === 'INCOME' ? '+' : ''}
                                            {t.type === 'EXPENSE' ? '-' : ''}
                                            {formatCurrency(t.amount, currencyCode)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}