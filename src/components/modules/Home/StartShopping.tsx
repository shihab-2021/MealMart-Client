"use client";
import dynamic from "next/dynamic";

const HomeMealList = dynamic(() => import("./HomeMealList"), { ssr: false });

export default function StartShopping() {
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold font-molengo text-center">
          Featured
          <span className="text-blue-600">.</span>
        </h1>
        <HomeMealList />
      </div>
    </div>
  );
}
