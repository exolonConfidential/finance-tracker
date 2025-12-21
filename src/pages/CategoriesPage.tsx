
import { useCategories } from "@/hooks/useCategories";
import AddCategoryDialog from "@/components/categories/AddCategoryDialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2, Tag, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function CategoriesPage() {
  const { categories, isLoading, createCategory, isCreating, deleteCategory } = useCategories();
  
  // Filter categories by type
  const incomeCategories = categories.filter(c => c.type === 'INCOME');
  const expenseCategories = categories.filter(c => c.type === 'EXPENSE');

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">Manage labels for your transactions.</p>
        </div>
        <AddCategoryDialog onCreate={createCategory} isLoading={isCreating} />
      </div>

      <Tabs defaultValue="EXPENSE" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="EXPENSE">Expenses</TabsTrigger>
          <TabsTrigger value="INCOME">Income</TabsTrigger>
        </TabsList>

        {/* EXPENSE TAB */}
        <TabsContent value="EXPENSE" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpCircle className="h-5 w-5 text-red-500" />
                Expense Categories
              </CardTitle>
              <CardDescription>
                Where your money goes (e.g., Rent, Food).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {expenseCategories.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <Tag className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No expense categories yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {expenseCategories.map((category) => (
                    <div 
                      key={category.id} 
                      className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all hover:border-red-100"
                    >
                      <span className="font-medium text-gray-700">{category.name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* INCOME TAB */}
        <TabsContent value="INCOME" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownCircle className="h-5 w-5 text-emerald-500" />
                Income Categories
              </CardTitle>
              <CardDescription>
                Sources of money (e.g., Salary, Freelance).
              </CardDescription>
            </CardHeader>
            <CardContent>
              {incomeCategories.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <Tag className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No income categories yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {incomeCategories.map((category) => (
                    <div 
                      key={category.id} 
                      className="group flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all hover:border-emerald-100"
                    >
                      <span className="font-medium text-gray-700">{category.name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}