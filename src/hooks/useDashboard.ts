import { getDashboardStats } from "@/api/dashboard";
import { useQuery } from "@tanstack/react-query";



export const useDashboard = () =>{
    return useQuery(
        {
            queryKey: ['user-dashboard'],
            queryFn: getDashboardStats,
            staleTime: 1000*60*5,
            retry: false
        }
    )
} 