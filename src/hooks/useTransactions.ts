import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { createTrasaction, getTransactions, type TransactionFilters } from '@/api/transactions';
import { toast } from 'sonner';


export const useTransactions = (filters: TransactionFilters) => {
  return useQuery({
    // By including filters in the queryKey, React Query automatically 
    // refetches data whenever ANY filter or page number changes!
    // because the when filters change the queryKey changes which causes the refetch for the new queryKey
    // we can have any thing in the queryKey array and it deep comapres everything
    queryKey: ['transactions', filters],
    queryFn: () => getTransactions(filters),
    placeholderData: (previousData) => previousData, // Keeps old data on screen while fetching new page (smooth UX)
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: createTrasaction,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transactions']})
      queryClient.invalidateQueries({queryKey: ['wallet-analytics']})
      queryClient.invalidateQueries({queryKey: ['wallets']})
      queryClient.invalidateQueries({queryKey: ['user-dashboard']})
      toast.success("Transaction added successfully")
    },
    onError: (error:any) => {
      toast.error(error.response?.data?.message || "Failed to create transaction")
    }
  })
}

