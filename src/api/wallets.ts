import api from './axios';

export interface Wallet {
  id: number; 
  name: string;
  balance: number;
  type: "CASH" | "BANK_ACCOUNT" | "CREDIT_CARD" | "INVESTMENT"| "SAVINGS"
  isActive: boolean
}

export interface CreateWalletRequest {
  name: string;
  type: "CASH" | "BANK_ACCOUNT" | "CREDIT_CARD" | "INVESTMENT"| "SAVINGS"
}

export interface WalletCashFlowDto {
  walletId: number;
  walletName: string;
  totalIn: number;
  totalOut: number;
  walletIsActive: boolean;
}

export const getWalletAnalytics = async (startDate: string, endDate: string) => {
  const { data } = await api.get<WalletCashFlowDto[]>(`/wallets/analytics`, {
    params: { startDate: `${startDate}T00:00:00`, endDate: `${endDate}T23:59:59` }
  });
  return data;
};

// 1. Fetch All Wallets
export const getWallets = async () => {
  const { data } = await api.get<Wallet[]>('/wallets');
  return data;
};

// 2. Create Wallet
export const createWallet = async (wallet: CreateWalletRequest) => {
  const { data } = await api.post<Wallet>('/wallets', wallet);
  return data;
};

// 3. Delete Wallet
export const toggleWalletStatus = async (id: number) => {
  const { data } = await api.patch<Wallet>(`/wallets/${id}/toggle`);
  return data;
};