"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { useSpotify } from "../../contexts/SpotifyContext";
import SkeletonCategories from "../Skeleton/SkeletonCategories";
import { generateUUID } from "../../../utils/functions";
import { SpotifyCategory } from "../../types/types";

const Categories: React.FC = () => {
  const router = useRouter();

  const { categories, loadingCategories } = useSpotify();

  return (
    <div className="flex flex-col items-center justify-center w-full pt-4 lg:pr-14 lg:pb-0 lg:pl-14 box-border">
      {loadingCategories ? (
        <SkeletonCategories />
      ) : categories ? (
        <div className="flex flex-wrap w-full gap-4 justify-center md:justify-between">
          {categories?.items.map(
            (categorie: SpotifyCategory, index: number) => (
              <div
                key={generateUUID()}
                className={`group flex-shrink-0 text-center box-border rounded-lg overflow-hidden transition-all cursor-pointer
              min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px] 
              ${index === 1 ? "flex-grow-2" : "flex-grow"}`}
                onClick={() => router.push(`/categories/${categorie.id}`)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={categorie.icons[0].url}
                    alt={categorie.name}
                    width={254}
                    height={254}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full p-4 text-white text-sm font-semibold text-center z-10 whitespace-nowrap">
                    {categorie.name}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p>Nenhum gênero disponível</p>
      )}
    </div>
  );
};

export default Categories;
