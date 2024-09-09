import React from "react";
import { generateUUID } from "../../../utils/functions";

const SkeletonTracks: React.FC = () => {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <ul className="space-y-4">
      {skeletonItems.map((_) => (
        <li
          key={generateUUID()}
          className="flex items-center justify-between bg-gray-800 p-2 rounded-lg animate-pulse"
        >
          <div className="flex flex-col space-y-2">
            <div className="w-36 h-4 bg-gray-700 rounded-md"></div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              <div className="w-16 h-3 bg-gray-600 rounded-md"></div>
            </div>
          </div>
          <div className="bg-gray-600 w-8 h-8 rounded-full"></div>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonTracks;
