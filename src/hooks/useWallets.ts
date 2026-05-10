import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWallets, createWallet, toggleWalletStatus, getWalletAnalytics } from '@/api/wallets';
import { toast } from 'sonner';

export const useWallets = () => {
  const queryClient = useQueryClient();

  const walletsQuery = useQuery({
    queryKey: ['wallets'],
    queryFn: getWallets,
  });

  const createMutation = useMutation({
    mutationFn: createWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      // Also invalidate dashboard since total balance changes
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] }); 
      queryClient.invalidateQueries({ queryKey: ['wallet-analytics'] });
      toast.success("Wallet created successfully");
    },
    onError: () => toast.error("Failed to create wallet"),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleWalletStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success("Wallet status updated");
    },
    onError: () => toast.error("Failed to update wallet"),
  });

  return {
    wallets: walletsQuery.data || [],
    isLoading: walletsQuery.isLoading,
    createWallet: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    toggleWallet: toggleMutation.mutateAsync,
  };
};


export const useWalletAnalytics = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['wallet-analytics', startDate, endDate],
    queryFn: () => getWalletAnalytics(startDate, endDate),
    enabled: !!startDate && !!endDate, 
  });
};