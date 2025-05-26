import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 text-center text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        <span className="mt-2 block">Loading...</span>
      </div>
    </div>
  );
}
