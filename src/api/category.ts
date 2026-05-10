import api from "./axios";


export interface CategoryResponse {
    id: string;
    name: string;
    type: 'INCOME' | 'EXPENSE';
    budgetLimit?: number
}

export interface CategroryCreation {
    name: string;
    type: 'INCOME' | 'EXPENSE';
    bugetLimit?: number;
}

export interface DeleteCategoryRes {
    message: string;
}

export const getCategories = async () =>{
    const {data} = await api.get<CategoryResponse[]>("/categories");
    return data;
}

export const createCategory = async (category: CategroryCreation) => {
    const {data} = await api.post<CategoryResponse>("/categories",category);
    return data;
}

export const deleteCategory = async (id: string) =>{
    const { data } = await api.delete<DeleteCategoryRes>(`/categories/${id}`)
    return data;
}


export interface CategoryStatsDto {
  categoryName: string;
  type: "INCOME" | "EXPENSE";
  totalAmount: number;
}

export const getCategoryStats = async (startDate: string, endDate: string) => {
  const params = new URLSearchParams();
  params.append('startDate', `${startDate}T00:00:00`);
  params.append('endDate', `${endDate}T23:59:59`);
  
  const { data } = await api.get<CategoryStatsDto[]>(`/transactions/stats?${params.toString()}`);
  return data;
};