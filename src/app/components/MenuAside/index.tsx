import React, { useEffect } from "react";
import { useSpotify } from "../../contexts/SpotifyContext";
import LastSearchs from "./LastSearchs";
import { FaMusic, FaTimes } from "react-icons/fa";
import AnimateIconPlaying from "../AnimateIconPlaying";
import useIsMobile from "../../hooks/useIsMobile";
import { useMenuAside } from "../../contexts/MenuAsideContext";

const MenuAside: React.FC = () => {
  const {
    fetchSearchApi,
    lastMusics,
    lastSearchs,
    searchQuery,
    setSearchQuery,
    idTrackPlayMoment,
  } = useSpotify();

  const isMobile = useIsMobile();

  const { setViewMenuAside } = useMenuAside();

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        fetchSearchApi(searchQuery);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery]);

  return (
    <aside
      className={`fixed z-50 top-20 left-4 w-[280px] h-[65vh] lg:h-[85vh] bg-menu-aside-background p-4 rounded-lg shadow-lg text-white flex flex-col`}
    >
      {isMobile && (
        <button
          className="absolute right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600"
          onClick={() => setViewMenuAside(false)}
        >
          <FaTimes className="text-xl text-white w-4 h-4" />
        </button>
      )}
      <div className="flex-1 flex flex-col justify-start">
        <h2 className="text-lg font-semibold mb-4">Ouvidas recentemente</h2>
        {lastMusics && lastMusics.length > 0 ? (
          <ul
            className={`${
              isMobile ? "h-[45vh]" : "h-[60vh]"
            } overflow-y-auto custom-scrollbar space-y-3`}
          >
            {lastMusics.map((track) => (
              <li key={track.track.id} className="flex items-center gap-2">
                <img
                  src={track?.track?.album?.images[0]?.url}
                  alt={track?.track?.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4
                    className={`${
                      idTrackPlayMoment === track?.track?.id
                        ? "text-lime-600"
                        : "text-white"
                    } text-xs flex items-center`}
                  >
                    {track?.track?.name.slice(0, 22)}...
                    {idTrackPlayMoment === track?.track?.id && (
                      <AnimateIconPlaying />
                    )}
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    {track?.track?.artists[0]?.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center h-full mt-[50%] text-center">
            <div className="mb-4 text-5xl text-gray-400">
              <FaMusic />
            </div>
            <p className="text-xs text-gray-300">
              Você ainda não ouviu nenhuma música
            </p>
          </div>
        )}
      </div>
      <div
        className={`mt-2 ${
          lastSearchs?.length === 0 ? "absolute bottom-4 left-4 right-4" : ""
        }`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Qual playlist você deseja ouvir?"
            className="text-xs w-full p-2 bg-[#000000] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 pr-8" // pr-8 para espaço do ícone
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchQuery("")}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
        <LastSearchs />
      </div>
    </aside>
  );
};

export default MenuAside;
