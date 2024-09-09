import React from "react";
import { generateUUID } from "../../../utils/functions";

const SkeletonCategories: React.FC = () => {
  const skeletonCategories = Array.from({ length: 9 });

  return (
    <div className="flex flex-wrap w-full justify-center items-center gap-4">
      {skeletonCategories.map((_, index) => (
        <div
          key={generateUUID()}
          className={`group flex-shrink-0 min-w-[254px] max-w-[254px] h-[254px] max-h-[254px] text-center box-border rounded-lg overflow-hidden transition-all cursor-pointer ${
            index === 1 ? "flex-grow-2" : "flex-grow"
          }`}
        >
          <div className="relative w-full h-full animate-pulse bg-gray-700 rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-gray-600 rounded-lg"></div>
            <div className="absolute top-0 left-0 p-4 z-10">
              <div className="w-24 h-4 bg-gray-500 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCategories;
