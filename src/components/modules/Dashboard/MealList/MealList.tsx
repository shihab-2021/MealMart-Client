"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllMealsQuery } from "@/redux/features/meal/mealApi";
import { useState } from "react";
import { Heart, Search, Sliders, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "@/utils/favoritesUtils";

export default function MealListingPage() {
  const router = useRouter();
  const { data: meals, isLoading } = useGetAllMealsQuery(undefined, {
    refetchOnFocus: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(1);

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

  const dietaryOptions = [
    { label: "High Protein", key: "highProtein" },
    { label: "Low Carb", key: "lowCarb" },
    { label: "Low Fat", key: "lowFat" },
  ];

  const filteredMeals = meals?.data?.filter((meal: any) => {
    const matchesSearch = meal.mealName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;
    const matchesDietary = dietaryFilters.every((filter) => {
      if (filter === "highProtein") return meal.nutritionalInfo.protein >= 20;
      if (filter === "lowCarb") return meal.nutritionalInfo.carbs <= 30;
      if (filter === "lowFat") return meal.nutritionalInfo.fat <= 10;
      return true;
    });

    return matchesSearch && matchesCategory && matchesDietary;
  });

  const handleFavoriteToggle = (mealId: string) => {
    if (isFavorite(mealId)) {
      removeFromFavorites(mealId);
    } else {
      addToFavorites(mealId);
    }
    setTrigger(trigger + 1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search meals..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-60">
              <Sliders className="mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="priceLowHigh">Price: Low to High</SelectItem>
              <SelectItem value="priceHighLow">Price: High to Low</SelectItem>
              <SelectItem value="calories">Calories</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map((option) => (
            <Button
              key={option.key}
              variant={
                dietaryFilters.includes(option.key) ? "default" : "outline"
              }
              size="sm"
              onClick={() =>
                setDietaryFilters((prev) =>
                  prev.includes(option.key)
                    ? prev.filter((f) => f !== option.key)
                    : [...prev, option.key]
                )
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Meal Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : filteredMeals?.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-xl text-muted-foreground">
            No meals found matching your criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setDietaryFilters([]);
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeals?.map((meal: any) => {
            const ratings = meal?.reviews?.map((review: any) => review?.rating);
            const total = ratings?.reduce((acc: any, cur: any) => acc + cur, 0);
            const averageRating =
              ratings?.length > 0 ? (total / ratings?.length)?.toFixed(1) : 0.0;
            return (
              <Card
                key={meal._id}
                className="hover:shadow-lg transition-shadow group"
              >
                <CardHeader className="pb-0 px-4 pt-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    {meal.images?.[0] && (
                      <Image
                        src={meal.images[0]}
                        alt={meal.mealName}
                        fill
                        className="object-cover"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => handleFavoriteToggle(meal?._id)}
                    >
                      <Heart
                        fill={isFavorite(meal?._id) ? "red" : "white"}
                        className={`w-5 h-5 ${
                          isFavorite(meal?._id) && "text-red-600"
                        }`}
                      />
                    </Button>
                    {!meal.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <p className="font-semibold">Out of Stock</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{meal.mealName}</h3>
                    <Badge variant="secondary" className="capitalize">
                      {meal.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {meal.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium">{averageRating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({meal?.reviews?.length})
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xl font-bold">${meal.price}</p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{meal.nutritionalInfo.calories} cal</span>
                      <span>•</span>
                      <span>{meal.nutritionalInfo.protein}g protein</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/mealDetails/${meal?._id}`)}
                    size="sm"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
