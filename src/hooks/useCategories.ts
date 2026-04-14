import { createCategory, deleteCategory, getCategories, getCategoryStats } from "@/api/category"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";



export const useCategories = () => {
    const queryClient = useQueryClient();

    const getAllCategories =  useQuery({
            queryKey: ['get-categories'],
            queryFn: getCategories,
        })
    

    const uploadCategory =  useMutation({
            mutationKey: ['create-category'],
            mutationFn: createCategory,
            onSuccess: (data) =>{
                queryClient.invalidateQueries({ queryKey: ['get-categories']})
                toast.success(`${data.name} created successfully`);
            },
            onError: () =>{
                toast.error("Failed to create category");
            }
        })

    const removeCategory = useMutation({
            mutationKey: ['delete-category'],
            mutationFn: deleteCategory,
            onSuccess: () =>{
                queryClient.invalidateQueries({ queryKey: ['get-categories'] })
                toast.success(`Deleted successfully`);
            },
            onError: (error) =>{
                console.log("inside remove category error")
                console.log(error)
                toast.error("Some error occured");
            }
        })
    
    return {
        categories: getAllCategories.data || [],
        isLoading: getAllCategories.isLoading,
        createCategory: uploadCategory.mutateAsync,
        isCreating: uploadCategory.isPending,
        deleteCategory: removeCategory.mutateAsync
    }
}

export const useCategoryStats = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['category-stats', startDate, endDate],
    queryFn: () => getCategoryStats(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};