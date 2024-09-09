import React from "react";

import { FaListAlt, FaMusic } from "react-icons/fa";
import { useSpotify } from "../../contexts/SpotifyContext";
import { useMenuAside } from "../../contexts/MenuAsideContext";
import { SpotifyPlaylistItem } from "../../types/types";

type IProps = {
  playlist: SpotifyPlaylistItem;
  index: number;
};

const Playlist = (props: IProps) => {
  const {
    fetchTracksList,
    setPlaylistSelected,
    setLoadingTracks,
    setOpenMenuListTracks,
  } = useSpotify();

  const { setViewMenuAside } = useMenuAside();

  const handlePlayer = async (playlist: SpotifyPlaylistItem) => {
    try {
      setViewMenuAside(false);
      setLoadingTracks(true);
      setOpenMenuListTracks(true);

      setPlaylistSelected(playlist);

      await fetchTracksList(playlist?.tracks.href);
    } catch (error) {}
  };

  return (
    <div
      className={`group flex-shrink-0 w-full max-h-[120px] rounded-lg transition-all cursor-pointer mb-4 ${
        props?.index === 1 ? "flex-grow-2" : "flex-grow"
      }`}
    >
      <div className="flex items-center p-4 bg-[#1D1B19] rounded-lg h-full">
        <img
          src={props?.playlist?.images[0]?.url}
          alt={props?.playlist?.title}
          className="w-24 h-24 object-cover rounded-lg sm:w-16 sm:h-16"
        />
        <div className="ml-4 pt-2 pb-4 flex flex-col justify-between h-full flex-grow">
          <div>
            <h3 className="text-white text-lg font-semibold sm:text-base">
              {" "}
              {props?.playlist?.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-xs">
              {" "}
              {props?.playlist?.name}
            </p>
          </div>
          <div className="flex items-center text-white text-sm sm:text-xs">
            {" "}
            <FaMusic className="mr-2 text-xs" /> {props?.playlist?.tracks.total}{" "}
            músicas
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <span className="text-white text-sm mr-2 hidden sm:block">
            Visualizar músicas
          </span>

          <button
            onClick={() => handlePlayer(props?.playlist)}
            className="bg-red-600 w-8 h-8 flex items-center justify-center rounded-full shadow-lg sm:w-6 sm:h-6"
          >
            <FaListAlt className="text-black text-lg sm:text-base" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
