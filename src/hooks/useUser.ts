import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/user';

export const useUser = () => {
  return useQuery({
    queryKey: ['user-profile'], // Unique key for caching
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,   // Keep data fresh for 5 minutes
    retry: false,               // Don't retry if 401 (Auth failed)
  });
};