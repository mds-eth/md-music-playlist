import React from "react";

import {
  FaPlay,
  FaClock,
  FaPause,
  FaMusic,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

import { useSpotify } from "../../contexts/SpotifyContext";

import { formatDuration, generateUUID } from "../../../utils/functions";

import SkeletonTracks from "../Skeleton/SkeletonTracks";

import { ObjectTrack } from "../../types/types";
import AnimateIconPlaying from "../AnimateIconPlaying";
import useIsMobile from "../../hooks/useIsMobile";

const MenuPlayer: React.FC = () => {
  const {
    tracks,
    loadingTracks,
    isPlaying,
    playMusic,
    playlistSelected,
    setMusicSelected,
    setIsPlaying,
    setOpenMenuListTracks,
    idTrackPlayMoment,
    setIdTrackPlayMoment,
    addMusicToHistory,
  } = useSpotify();

  if (!tracks) return <></>;

  const isMobile = useIsMobile();

  const handlePlayMusic = (track: ObjectTrack) => {
    const { id: trackId, preview_url } = track?.track;

    if (trackId === idTrackPlayMoment) {
      return setIsPlaying(!isPlaying);
    }

    setIdTrackPlayMoment(trackId === idTrackPlayMoment ? "" : trackId);

    setMusicSelected(track);

    addMusicToHistory(track);

    playMusic?.(preview_url);
  };

  return (
    <aside className="fixed top-20 z-50 right-4 w-[280px] h-[65vh] lg:h-[85vh] bg-menu-aside-background p-4 rounded-lg shadow-lg text-white overflow-y-auto flex flex-col">
      <div>
        <div className="flex flex-col items-center mb-4">
          <img
            src={playlistSelected?.images[0]?.url}
            alt={"Playlist"}
            className="w-32 h-32 object-cover rounded-lg mb-2"
          />
          <p className="text-center text-white text-xs font-semibold">
            {playlistSelected?.name || ""}
          </p>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600"
        onClick={() => setOpenMenuListTracks(false)}
      >
        <FaTimes className="text-xl text-white" />
      </button>
      <div className="flex justify-between mb-4">
        <h3 className="text-md font-semibold mb-2">Músicas</h3>
        <span className="flex items-center justify-between gap-2">
          {playlistSelected?.tracks.total || "---"}
          <FaMusic className="w-[10px]" />
        </span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {!loadingTracks ? (
          <ul className="space-y-4">
            {tracks?.items?.filter(
              (track: ObjectTrack) => track?.track?.preview_url
            ).length > 0 ? (
              tracks?.items
                .filter((track: ObjectTrack) => track?.track?.preview_url)
                .map((track: ObjectTrack) => (
                  <li
                    key={generateUUID()}
                    {...(isMobile && { onClick: () => handlePlayMusic(track) })}
                    className="flex items-center justify-between bg-[#000000] p-2 rounded-lg"
                  >
                    <div>
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
                      <div className="text-gray-400 text-[10px] flex items-center gap-2">
                        <FaClock className="mr-1" />
                        <p>{formatDuration(track?.track?.duration_ms)}</p>{" "}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayMusic(track)}
                      className="bg-lime-600 hover:bg-gray-600 w-8 h-8 flex items-center justify-center rounded-full shadow-md"
                    >
                      {idTrackPlayMoment === track?.track?.id && isPlaying ? (
                        <FaPause width={24} className="text-white" />
                      ) : (
                        <FaPlay className="text-white" />
                      )}
                    </button>
                  </li>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="mb-4 text-5xl text-gray-400">
                  <FaExclamationCircle />
                </div>
                <p className="text-xs text-gray-300">
                  Não foi possível carregar as músicas neste momento
                </p>
              </div>
            )}
          </ul>
        ) : (
          <SkeletonTracks />
        )}
      </div>
    </aside>
  );
};

export default MenuPlayer;
