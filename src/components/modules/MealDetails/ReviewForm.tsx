"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { useAddReviewMutation } from "@/redux/features/meal/mealApi";
import { toast } from "sonner";

interface ReviewFormProps {
  mealId: string;
  refetch: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ mealId, refetch }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (rating === 0 || reviewText.trim() === "") return;
      const res = await addReview({
        id: mealId,
        reviewData: {
          rating: rating,
          description: reviewText.trim(),
        },
      }).unwrap();
      if (res.success) {
        toast.success("Review added successfully!");
      }
      // onSubmit(rating, reviewText.trim());
      refetch();
      setRating(0);
      setHoveredRating(0);
      setReviewText("");
    } catch (error: any) {
      //   console.log(error);
      toast.error(error?.data?.message || "Something went wrong!");
      setRating(0);
      setHoveredRating(0);
      setReviewText("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Leave a Review
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="flex items-center mb-4 space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  (hoveredRating || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                fill={(hoveredRating || rating) >= star ? "#facc15" : "none"}
              />
            </button>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Write your honest opinion here..."
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all disabled:opacity-50"
          disabled={rating === 0 || reviewText.trim() === "" || isLoading}
        >
          {isLoading ? "Submitting ..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
