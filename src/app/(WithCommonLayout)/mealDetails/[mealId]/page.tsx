"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useGetSingleMealQuery } from "@/redux/features/meal/mealApi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function MealDetailPage({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [mealId, setMealId] = useState<string>("");
  const { data, refetch } = useGetSingleMealQuery(mealId, {
    skip: !mealId,
    refetchOnReconnect: true,
  });
  const meal = data?.data;

  useEffect(() => {
    (async () => {
      const { mealId } = await params;
      setMealId(mealId);
    })();
  }, [params]);

  useEffect(() => {
    if (mealId) refetch();
  }, [mealId]);

  const handleAddToCart = () => {
    if (!session?.user?.email) {
      toast.error("Please login!", { duration: 3000 });
      return;
    }
    const price: number = Number((meal.price * 1.1).toFixed(2));
    dispatch(
      addToCart({
        product: meal._id,
        orgId: meal.orgId._id,
        name: meal.mealName,
        price: price,
        quantity: quantity,
        imageUrl: meal.images[0] as string,
      })
    );
    toast.success("Meal added to cart!", { duration: 3000 });
  };

  return (
    <>
      {meal && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          {/* Image Gallery + Main Info */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Carousel */}
            <div className="relative">
              <Carousel className="rounded-xl overflow-hidden shadow-lg">
                <CarouselContent>
                  {meal?.images?.map((image: string, index: number) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square">
                        <Image
                          src={image}
                          alt={meal.mealName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              <div className="flex flex-wrap gap-2 mt-4">
                {meal.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative h-20 w-20 rounded-md overflow-hidden cursor-pointer border"
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Main Info */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm">
                  {meal.category}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-4xl font-bold">{meal.mealName}</h1>

              <div className="flex items-center gap-4 text-lg">
                <span className="text-3xl font-bold text-primary">
                  ${meal.price}
                </span>
                <div className="flex items-center gap-1 text-yellow-600">
                  <Star className="w-5 h-5" />
                  <span>4.8</span>
                  <span className="text-muted-foreground">(128 reviews)</span>
                </div>
              </div>

              {/* Nutrition Quick Facts */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="text-center">
                  <p className="text-lg font-bold">
                    {meal.nutritionalInfo.calories}
                  </p>
                  <p className="text-sm text-muted-foreground">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">
                    {meal.nutritionalInfo.protein}g
                  </p>
                  <p className="text-sm text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">
                    {meal.nutritionalInfo.carbs}g
                  </p>
                  <p className="text-sm text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">
                    {meal.nutritionalInfo.fat}g
                  </p>
                  <p className="text-sm text-muted-foreground">Fat</p>
                </div>
              </div>

              <p className="text-lg">{meal.description}</p>

              {/* Key Ingredients Preview */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {meal?.keyIngredients?.slice(0, 4).map((ingredient: any) => (
                    <Badge
                      key={ingredient.ingredientName}
                      variant="outline"
                      className="px-3 py-1 text-sm"
                    >
                      {ingredient.ingredientName}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Ingredients & Prep */}
            <div className="lg:col-span-2 space-y-12">
              {/* Full Ingredients */}
              <section>
                <h2 className="text-2xl font-bold mb-4">
                  Ingredients & Benefits
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {meal.keyIngredients.map((ingredient: any) => (
                    <div
                      key={ingredient.ingredientName}
                      className="p-4 bg-muted/50 rounded-lg"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        {ingredient.ingredientName}
                      </h3>
                      <p className="text-muted-foreground">
                        {ingredient.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Preparation */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Preparation</h2>
                <div className="space-y-4">
                  {meal.prepSteps.map((step: string, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center relative z-10">
                          {index + 1}
                        </div>
                        {index < meal.prepSteps.length - 1 && (
                          <div className="w-1 h-full bg-border absolute top-[1]  left-[46%] z-0" />
                        )}
                      </div>
                      <p className="flex-1 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <div className="space-y-6">
                  {meal.reviews.length === 0 ? (
                    <p className="text-muted-foreground">
                      No reviews yet. Be the first to review this meal!
                    </p>
                  ) : // Add review components here
                  null}
                </div>
              </section>
            </div>

            {/* Order Card */}
            <div className="sticky top-20 h-fit">
              <div className="border rounded-xl p-6 shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Quantity</span>
                    {/* <span className="text-muted-foreground">
                  {meal.quantity} in stock
                </span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                      variant="outline"
                      size="icon"
                    >
                      -
                    </Button>
                    <Input
                      value={quantity}
                      className="w-20 text-center"
                      readOnly
                    />
                    <Button
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                      variant="outline"
                      size="icon"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart()}
                  className="w-full gap-2"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Prepared fresh daily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>4.8 rating (128 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Organization Info */}
              <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                <h3 className="font-semibold mb-2">From FreshMeals Kitchen</h3>
                <p className="text-muted-foreground text-sm">
                  Certified organic kitchen • 100% sustainable ingredients •
                  Prepared with care daily
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
