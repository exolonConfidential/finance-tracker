import api from "./axios";



export interface RecentTransaction {
    id: number;
    amount: number;
    description: string;
    transactionDate: Date;
    type: "EXPENSE" | "INCOME" | "TRANSFER";
    categoryName?: string ;
    walletName: string;
    targetWalletName?: string;
}

interface DashboardStats {
    totalBalance: number;
    totalIncome: number;
    totalExpense: number;
    recentTransactions: RecentTransaction[];
}

export const getDashboardStats = async () =>{
    const { data } = await api.get<DashboardStats>("/dashboard");
    return data;
}