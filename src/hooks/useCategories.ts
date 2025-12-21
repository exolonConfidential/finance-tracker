import { createCategory, deleteCategory, getCategories } from "@/api/category"
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
            onError: () =>{
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