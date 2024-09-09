import React, { useEffect } from "react";
import { useSpotify } from "../../contexts/SpotifyContext";
import { generateUUID } from "../../../utils/functions";

const LastSearchs = () => {
  const { fetchSearchApi, lastSearchs, searchQuery, setSearchQuery } =
    useSpotify();

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        fetchSearchApi(searchQuery);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery]);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <div className="mt-2 flex flex-nowrap gap-2">
        {lastSearchs?.map((search) => (
          <span
            key={generateUUID()}
            className="text-[10px] bg-gray-700 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-lime-600 whitespace-nowrap"
            onClick={() => setSearchQuery(search)}
          >
            {search}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LastSearchs;
