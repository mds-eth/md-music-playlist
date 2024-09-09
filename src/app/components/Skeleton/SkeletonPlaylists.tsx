import React from "react";
import { generateUUID } from "../../../utils/functions";

const SkeletonPlaylists: React.FC = () => {
  const skeletonPlaylists = Array.from({ length: 5 });

  return (
    <>
      {skeletonPlaylists.map((_, index) => (
        <div
          key={generateUUID()}
          className={`group flex-shrink-0 w-full max-h-[120px] rounded-lg transition-all cursor-pointer mb-4 ${
            index !== 0 ? "mt-4" : ""
          } ${index === 1 ? "flex-grow-2" : "flex-grow"}`}
        >
          <div className="flex items-center p-4 bg-[#1D1B19] rounded-lg h-full animate-pulse">
            <div className="w-24 h-24 bg-gray-700 rounded-lg"></div>
            <div className="ml-4 pt-2 pb-4 flex flex-col justify-between h-full flex-grow">
              <div>
                <div className="w-32 h-4 bg-gray-600 rounded-md mb-2"></div>
                <div className="w-24 h-3 bg-gray-500 rounded-md"></div>
              </div>
            </div>
            <div className="flex items-center ml-auto">
              <div className="hidden sm:block w-24 h-4 bg-gray-600 rounded-md mr-2"></div>
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonPlaylists;
