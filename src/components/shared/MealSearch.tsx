"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSearchMealsQuery } from "@/redux/features/meal/mealApi";
import Image from "next/image";
import DemonImage from "../../assets/Home1.jpg";

// Define TypeScript interfaces for expected meal data
interface Meal {
  _id: string;
  mealName: string;
  description: string;
  category: string;
  price: number;
  images?: string[];
  orgId?: {
    name: string;
  };
}

const MealSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const {
    data,
    isLoading: mealLoading,
    isFetching,
  } = useSearchMealsQuery(searchQuery, {
    skip: !searchQuery,
  });
  console.log(data?.data, mealLoading, isFetching);

  //   useEffect(() => {
  //     const delayedSearch = setTimeout(async () => {
  //       if (searchQuery.trim()) {
  //         setIsLoading(true);
  //         try {
  //           setShowResults(true);
  //           setIsLoading(false);
  //         } catch (error) {
  //           console.error("Search error:", error);
  //           setSearchResults([]);
  //         }
  //       } else {
  //         setSearchResults([]);
  //         setShowResults(false);
  //       }
  //     }, 300);

  //     return () => clearTimeout(delayedSearch);
  //   }, [searchQuery]);

  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          setSearchResults(data?.data || []);
          setShowResults(true);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [data, searchQuery]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleMealClick = (meal: Meal) => {
    // Handle meal selection - navigate to meal detail page
    setShowResults(false);
    // Add your navigation logic here
    router.push(`/mealDetails/${meal._id}`);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-8 relative">
        <div ref={searchRef} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            placeholder="Search for meals, categories, ingredients..."
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={handleClearSearch}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div
            ref={resultsRef}
            className="absolute z-50 w-full min-w-[500px] mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
          >
            {isLoading || mealLoading || isFetching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                <span className="mt-2 block">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((meal: Meal) => (
                  <div
                    key={meal._id}
                    onClick={() => handleMealClick(meal)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        width={200}
                        height={200}
                        src={meal.images?.[0] ? meal.images?.[0] : DemonImage}
                        alt={meal.mealName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {meal.mealName}
                          </h3>
                          <span className="text-sm font-semibold text-blue-600">
                            ${meal.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {meal.description}
                        </p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {meal.category}
                          </span>
                          <span className="text-xs text-gray-400">
                            by {meal.orgId?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                <p>No meals found for &quot;{searchQuery}&quot;</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try searching with different keywords
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default MealSearch;

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search, X } from "lucide-react";
// import { useSearchMealsQuery } from "@/redux/features/meal/mealApi";
// import Image from "next/image";
// import DemonImage from "../../assets/Home1.jpg";

// // Define TypeScript interfaces for expected meal data
// interface Meal {
//   _id: string;
//   mealName: string;
//   description: string;
//   category: string;
//   price: number;
//   images?: string[];
//   orgId?: {
//     name: string;
//   };
// }

// const MealSearch: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<Meal[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [showResults, setShowResults] = useState<boolean>(false);
//   const searchRef = useRef<HTMLDivElement | null>(null);
//   const resultsRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();

//   const { data, isLoading: mealLoading } = useSearchMealsQuery(searchQuery, {
//     skip: !searchQuery,
//   });

//   // Handle search debounce and display logic
//   useEffect(() => {
//     const delayedSearch = setTimeout(() => {
//       if (searchQuery.trim()) {
//         setIsLoading(true);
//         setShowResults(true);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(delayedSearch);
//   }, [searchQuery]);

//   // Update search results when data changes
//   useEffect(() => {
//     const delayedResultUpdate = setTimeout(() => {
//       if (searchQuery.trim()) {
//         setIsLoading(true);
//         try {
//           setSearchResults(data?.data || []);
//           setShowResults(true);
//         } catch (error) {
//           console.error("Search error:", error);
//           setSearchResults([]);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(delayedResultUpdate);
//   }, [data, searchQuery]);

//   // Click outside handler to hide results
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         searchRef.current &&
//         !searchRef.current.contains(event.target as Node) &&
//         resultsRef.current &&
//         !resultsRef.current.contains(event.target as Node)
//       ) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setSearchResults([]);
//     setShowResults(false);
//   };

//   const handleMealClick = (meal: Meal) => {
//     setShowResults(false);
//     router.push(`/mealDetails/${meal._id}`);
//   };

//   return (
//     <div className="flex-1 max-w-2xl mx-8 relative">
//       <div ref={searchRef} className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Search className="h-5 w-5 text-gray-400" />
//         </div>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onFocus={() => searchQuery && setShowResults(true)}
//           placeholder="Search for meals, categories, ingredients..."
//           className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         {searchQuery && (
//           <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//             <button
//               onClick={handleClearSearch}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Search Results Dropdown */}
//       {showResults && (
//         <div
//           ref={resultsRef}
//           className="absolute z-50 w-full min-w-[500px] mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
//         >
//           {isLoading || mealLoading ? (
//             <div className="p-4 text-center text-gray-500">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
//               <span className="mt-2 block">Searching...</span>
//             </div>
//           ) : searchResults.length > 0 ? (
//             <div className="py-2">
//               {searchResults.map((meal) => (
//                 <div
//                   key={meal._id}
//                   onClick={() => handleMealClick(meal)}
//                   className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Image
//                       width={200}
//                       height={200}
//                       src={meal.images?.[0] ? meal.images?.[0] : DemonImage}
//                       alt={meal.mealName}
//                       className="w-12 h-12 rounded-lg object-cover"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center justify-between">
//                         <h3 className="text-sm font-medium text-gray-900 truncate">
//                           {meal.mealName}
//                         </h3>
//                         <span className="text-sm font-semibold text-blue-600">
//                           ${meal.price}
//                         </span>
//                       </div>
//                       <p className="text-xs text-gray-500 truncate mt-1">
//                         {meal.description}
//                       </p>
//                       <div className="flex items-center mt-1 space-x-2">
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                           {meal.category}
//                         </span>
//                         <span className="text-xs text-gray-400">
//                           by {meal.orgId?.name}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : searchQuery ? (
//             <div className="p-4 text-center text-gray-500">
//               <Search className="h-8 w-8 mx-auto text-gray-300 mb-2" />
//               <p>No meals found for &quot;{searchQuery}&quot;</p>
//               <p className="text-sm text-gray-400 mt-1">
//                 Try searching with different keywords
//               </p>
//             </div>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MealSearch;
