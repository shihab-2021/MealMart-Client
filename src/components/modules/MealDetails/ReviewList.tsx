import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  description: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
}: {
  reviews: any;
}) => {
  if (reviews?.data?.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 italic">
        No reviews yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-6">
      {reviews?.map((review: any) => (
        <div
          key={review?._id}
          className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
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
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">
                  {review?.user?.name}
                </span>
                <span className="text-sm text-gray-400">
                  {/* {new Date(review.createdAt).toLocaleDateString()} */}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 transition-colors ${
                      review.rating >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill={review.rating >= star ? "#facc15" : "none"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Comment */}
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            {review.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
