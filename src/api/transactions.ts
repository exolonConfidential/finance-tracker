import api from './axios';

// Matches your Java TransactionDto
export interface TransactionDto {
  id: number;
  amount: number;
  description?: string;
  transactionDate: string;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  walletName: string;
  targetWalletName?: string;
  categoryName?: string;
}

// Spring Boot Page structure
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // Current page index (0-based)
}

// The filters we will send to the backend
export interface TransactionFilters {
  page: number;
  size: number;
  startDate?: string;
  endDate?: string;
  type?: "INCOME" | "EXPENSE" | "TRANSFER" | "";
  walletId?: string;
  categoryId?: string;
}

export const getTransactions = async (filters: TransactionFilters) => {
  // Clean up undefined/empty filters so we don't send garbage to the API
  const params = new URLSearchParams();
  params.append('page', filters.page.toString());
  params.append('size', filters.size.toString());
  
  if (filters.startDate) params.append('startDate', `${filters.startDate}T00:00:00`);
  if (filters.endDate) params.append('endDate', `${filters.endDate}T23:59:59`);
  if (filters.type) params.append('type', filters.type);
  if (filters.walletId) params.append('walletId', filters.walletId);
  if (filters.categoryId) params.append('categoryId', filters.categoryId);

  const { data } = await api.get<PageResponse<TransactionDto>>(`/transactions?${params.toString()}`);
  return data;
};