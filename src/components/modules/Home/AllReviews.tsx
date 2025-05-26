"use client";
import React from "react";
import Image from "next/image";
import { useGetAllMealReviewsQuery } from "@/redux/features/meal/mealApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

interface Review {
  _id: string;
  rating: number;
  description: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  meal: {
    _id: string;
    mealName: string;
    category: string;
    images: string[];
  };
}

interface AllReviewsProps {
  reviews: Review[];
}

const AllReviews = () => {
  const {
    data: reviews,
    isLoading,
    refetch: reviewRefetch,
  } = useGetAllMealReviewsQuery(undefined, {
    refetchOnReconnect: true,
  });
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            What People Are Saying
          </h2>
          <p className="text-gray-600 text-lg">
            Real reviews from our happy customers
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div id="pc-carousel">
          <Carousel className="w-full max-w-full">
            <CarouselContent className="-ml-1">
              {reviews?.data?.map((review: Review) => (
                <CarouselItem
                  key={review._id}
                  className="pl-4 md:basis-1/3 py-5"
                >
                  <div
                    //   key={review._id}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                      {review?.user?.avatar ? (
                        <Image
                          src={review.user.avatar}
                          alt={review.user.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 text-white flex items-center justify-center text-lg font-semibold shadow-sm">
                          {review?.user?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {review.user.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {review.user.email}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-yellow-400 text-lg ${
                            i < review.rating ? "opacity-100" : "opacity-30"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>

                    {/* Review Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                      {review.description}
                    </p>

                    {/* Meal Info */}
                    <div className="flex items-center gap-4 mt-4 border-t pt-4">
                      <Image
                        src={review.meal.images[0]}
                        alt={review.meal.mealName}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                      <div>
                        <Link
                          href={`/mealDetails/${review?.meal?._id}`}
                          className="text-base font-medium text-gray-800"
                        >
                          {review.meal.mealName}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {review.meal.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Fallback for no reviews */}
        {reviews?.data?.length === 0 && (
          <div className="text-center mt-20 text-gray-600 text-lg">
            No reviews yet. Be the first to leave one!
          </div>
        )}
      </div>
    </section>
  );
};

export default AllReviews;
