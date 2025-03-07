"use client";
import { useGetAllMealsQuery } from "@/redux/features/meal/mealApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function HomeMealList() {
  const router = useRouter();
  const {
    data: meals,
    isLoading,
    isFetching,
  } = useGetAllMealsQuery(undefined, {
    refetchOnFocus: true,
  });
  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && (
        <div
          className={`grid grid-cols-1 2xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 font-arima`}
        >
          {meals?.data?.slice(0, 6)?.map((meal: any) => (
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
                  >
                    <Heart className="w-5 h-5" />
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
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground text-sm">(128)</span>
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
          ))}
        </div>
      )}
    </>
  );
}
