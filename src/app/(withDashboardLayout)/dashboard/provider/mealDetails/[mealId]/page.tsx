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

export default function MealDetailPage() {
  const meal = {
    _id: {
      $oid: "67c834ef5155c670843a1b4c",
    },
    mealName: "Sweet Potato + Wild Rice Hash",
    orgId: {
      $oid: "67c8334c5155c670843a1b35",
    },
    description:
      "How do you make a burrito even better? Unwrap it…and make it an excellent source of fiber, too. We started with wild rice, a seed (not a grain!!), added sweet potatoes and great northern beans for heartiness, and stirred in a smoky-sweet tomato sauce. And of course, we finished it off with avocado—because what is a burrito bowl without avocado?",
    price: 10,
    nutritionalInfo: {
      calories: 330,
      protein: 8,
      carbs: 18,
      fat: 11,
    },
    category: "Harvest Bowls",
    keyIngredients: [
      {
        ingredientName: "Maitake",
        description:
          "Also known as hen of the woods mushrooms, maitake means “dancing mushroom” in Japanese. These mushrooms pack in Maitake mushrooms also pack in important B vitamins like niacin, thiamin and riboflavin. Maitake mushrooms are commonly available in both fresh and powdered form.",
        _id: {
          $oid: "67c834ef5155c670843a1b4d",
        },
      },
      {
        ingredientName: "Avocado",
        description:
          "A serving of avocado makes a good source of fiber, which promotes good digestion, and folate, which supports heart health. Avocado is also known for its monounsaturated fats.",
        _id: {
          $oid: "67c834ef5155c670843a1b4e",
        },
      },
      {
        ingredientName: "Tomato",
        description:
          "These babies are blowing up with vitamin C and antioxidants, the super goodies needed to boost your immune system and glowing skin to boot.",
        _id: {
          $oid: "67c834ef5155c670843a1b4f",
        },
      },
      {
        ingredientName: "Great Northern Bean",
        description:
          "A classic in soups and stews, a half cup of medium-sized Great Northern Beans is rich in fiber and folate and makes a good source of iron, magnesium, and plant-based protein.",
        _id: {
          $oid: "67c834ef5155c670843a1b50",
        },
      },
      {
        ingredientName: "Sweet Potato",
        description:
          "One medium sweet potato makes an excellent source of vitamin A to maintain eye health and a good source of fiber to help with digestion.",
        _id: {
          $oid: "67c834ef5155c670843a1b51",
        },
      },
      {
        ingredientName: "Wild Rice",
        description:
          "A serving of wild rice makes a good source of fiber and magnesium, a mineral needed for energy production.",
        _id: {
          $oid: "67c834ef5155c670843a1b52",
        },
      },
    ],
    prepSteps: [
      "Remove tray from carton and discard seal. Pour contents into pan, then break apart and disperse evenly in pan. Cook over medium-high heat, stirring occasionally, for 3-5 minutes.",
      "Follow directions carefully. Cook with care & do not leave unattended while cooking. Cook to an internal temperature of 165°F.",
      "Enjoy with caution: contents may be hot.",
    ],
    images: [
      "https://res.cloudinary.com/dvszolotz/image/upload/v1741173996/image4_ksznti.webp",
      "https://res.cloudinary.com/dvszolotz/image/upload/v1741173996/image3_iacjev.webp",
      "https://res.cloudinary.com/dvszolotz/image/upload/v1741173996/image2_xngnjt.webp",
      "https://res.cloudinary.com/dvszolotz/image/upload/v1741173996/image1_basyio.webp",
    ],
    inStock: true,
    reviews: [],
    createdAt: {
      $date: "2025-03-05T11:26:39.222Z",
    },
    updatedAt: {
      $date: "2025-03-05T11:28:24.887Z",
    },
    __v: 0,
  };

  return (
    <div className="">
      {/* Image Gallery + Main Info */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Image Carousel */}
        <div className="relative">
          <Carousel className="rounded-xl overflow-hidden shadow-lg">
            <CarouselContent>
              {meal.images.map((image, index) => (
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

          <div className="flex gap-2 mt-4">
            {meal.images.map((image, index) => (
              <div
                key={index}
                className="relative h-20 w-20 rounded-md overflow-hidden cursor-pointer"
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
              <p className="text-lg font-bold">{meal.nutritionalInfo.carbs}g</p>
              <p className="text-sm text-muted-foreground">Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{meal.nutritionalInfo.fat}g</p>
              <p className="text-sm text-muted-foreground">Fat</p>
            </div>
          </div>

          <p className="text-lg">{meal.description}</p>

          {/* Key Ingredients Preview */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Key Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {meal.keyIngredients.slice(0, 4).map((ingredient) => (
                <Badge
                  key={ingredient._id.$oid}
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
            <h2 className="text-2xl font-bold mb-4">Ingredients & Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {meal.keyIngredients.map((ingredient) => (
                <div
                  key={ingredient._id.$oid}
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
              {meal.prepSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    {index < meal.prepSteps.length - 1 && (
                      <div className="w-1 h-full bg-border" />
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
                <Button variant="outline" size="icon">
                  -
                </Button>
                <Input value="1" className="w-20 text-center" readOnly />
                <Button variant="outline" size="icon">
                  +
                </Button>
              </div>
            </div>

            <Button className="w-full gap-2" size="lg">
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
  );
}
