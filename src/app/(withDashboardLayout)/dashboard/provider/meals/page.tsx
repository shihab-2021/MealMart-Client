"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useDeleteMealMutation,
  useGetProviderMealsQuery,
  useUpdateStockMutation,
} from "@/redux/features/meal/mealApi";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Box, Edit, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSidebar } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MealProviderDashboard() {
  const { open, isMobile } = useSidebar();
  const { data: session } = useSession();
  const router = useRouter();
  const {
    data: meals,
    isLoading,
    refetch,
  } = useGetProviderMealsQuery(session?.accessToken, {
    skip: !session?.accessToken,
  });
  const [updateStock] = useUpdateStockMutation();
  const [deleteMeal] = useDeleteMealMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Smoothies",
    "Breakfast Bowls",
    "Pasta",
    "Harvest Bowls",
    "Grains",
    "Soups",
    "Snacks",
  ];

  const filteredMeals = meals?.data?.filter((meal: any) => {
    const matchesSearch = meal.mealName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpdateStock = async (mealId: string, inStock: boolean) => {
    try {
      const res = await updateStock({ mealId, inStock }).unwrap();
      if (res.success) toast.success("Stock updated successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update stock!");
    }
  };

  const handleDelete = async (mealId: string) => {
    try {
      const res = await deleteMeal(mealId).unwrap();
      if (res.success) toast.success("Meal deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete meal!");
    }
  };

  return (
    <div className="pb-10 space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" />
            Meal Management
          </h1>
          <p className="text-muted-foreground">
            {meals?.data?.length | 0} meals available
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Input
            placeholder="Search meals..."
            className="max-w-md p-2 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // startIcon={FiSearch}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-md border border-input bg-background"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Meals</p>
                <p className="text-2xl font-bold">{meals?.data?.length || 0}</p>
              </div>
              <Box className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        {/* Add more stat cards as needed */}
      </div>

      {/* Meal Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredMeals?.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-xl text-muted-foreground">No meals found</p>
          <Button
            onClick={() => {
              router.push("/dashboard/provider/addMeal");
            }}
          >
            <Plus className="mr-2" />
            Create New Meal
          </Button>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 ${
            !isMobile && open
              ? "2xl:grid-col-3 md:grid-cols-1 lg:grid-cols-2"
              : "2xl:grid-col-4 md:grid-cols-2 lg:grid-cols-3"
          } gap-6`}
        >
          {filteredMeals?.map((meal: any) => (
            <Card key={meal._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-0 px-4 pt-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">
                    {meal.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Label>In Stock</Label>
                    <Switch
                      checked={meal.inStock}
                      onCheckedChange={() => {
                        handleUpdateStock(meal._id, meal.inStock);
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Meal Image */}
                {meal.images?.[0] && (
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={meal.images[0]}
                      alt={meal.mealName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Meal Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/dashboard/provider/mealDetails/${meal?._id}`}
                      className="text-xl font-semibold hover:underline"
                    >
                      {meal.mealName}
                    </Link>
                    <p className="text-2xl font-bold text-primary">
                      ${meal.price}
                    </p>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {meal.description}
                  </p>
                </div>

                {/* Nutritional Info */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {meal.nutritionalInfo.calories}
                    </p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {meal.nutritionalInfo.protein}g
                    </p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {meal.nutritionalInfo.carbs}g
                    </p>
                    <p className="text-xs text-muted-foreground">Carbs</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {meal.nutritionalInfo.fat}g
                    </p>
                    <p className="text-xs text-muted-foreground">Fat</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/provider/editMeal/${meal?._id}`)
                    }
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1 gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this meal? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDelete(meal?._id);
                          }}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
