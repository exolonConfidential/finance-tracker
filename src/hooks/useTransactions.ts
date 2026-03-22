import { useQuery } from '@tanstack/react-query';
import { getTransactions, type TransactionFilters } from '@/api/transactions';


export const useTransactions = (filters: TransactionFilters) => {
  return useQuery({
    // By including filters in the queryKey, React Query automatically 
    // refetches data whenever ANY filter or page number changes!
    queryKey: ['transactions', filters],
    queryFn: () => getTransactions(filters),
    placeholderData: (previousData) => previousData, // Keeps old data on screen while fetching new page (smooth UX)
  });
};