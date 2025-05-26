// app/search/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useSearchMealsQuery } from "@/redux/features/meal/mealApi";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data, isLoading } = useSearchMealsQuery(query, {
    skip: !query,
  });

  const meals = data?.data || [];
  console.log(meals);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Results for &quot;{query}&quot;
      </h2>

      {isLoading ? (
        <div className="text-blue-500 font-medium text-center py-10">
          Loading search results...
        </div>
      ) : meals.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal: any) => (
            <Card
              key={meal._id}
              className="p-4 rounded-xl border border-gray-200 shadow hover:shadow-xl"
            >
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={meal.images[0]}
                  alt={meal.mealName}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{meal.mealName}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {meal.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                ₹{meal.price} • {meal.category}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No meals found for &quot;<strong>{query}</strong>&quot;
        </div>
      )}
    </div>
  );
};

export default SearchResults;
