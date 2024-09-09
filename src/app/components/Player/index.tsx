import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaTimes,
  FaArrowDown,
} from "react-icons/fa";
import { useSpotify } from "../../contexts/SpotifyContext";
import useIsMobile from "../../hooks/useIsMobile";
import useBodyOverflow from "../../hooks/useBodyOverflow";

const MusicPlayer: React.FC = () => {
  const {
    urlMusic,
    musicSelected,
    isPlaying,
    setIsPlaying,
    setOpenMusicPlayer,
    setIdTrackPlayMoment,
    previousOrNextTrack,
  } = useSpotify();

  const isMobile = useIsMobile();

  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [viewFullPlayer, setViewFullPlayer] = useState<boolean>(false);

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef?.current) {
      audioRef?.current.pause();
    }

    if (urlMusic && audioRef.current) {
      audioRef.current.src = urlMusic;
      audioRef.current.load();
      audioRef?.current.play();
    }
  }, [urlMusic]);

  useEffect(() => {
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef?.current.pause();
      } else {
        audioRef?.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setProgress(Number(e.target.value));
    }
  };

  const updateProgress = () => {
    if (audioRef?.current) {
      setProgress(audioRef?.current.currentTime);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const newX = e.clientX - startPosition.x;
      const newY = e.clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const closeMusicPlayer = () => {
    setIdTrackPlayMoment("");
    setIsPlaying(false);
    setOpenMusicPlayer(false);
  };

  const transform =
    position.x !== 0 || position.y !== 0
      ? `translate(${position.x}px, ${position.y}px)`
      : undefined;

  const backgroundImage =
    isMobile && !viewFullPlayer
      ? undefined
      : `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${musicSelected?.track?.album?.images[1]?.url})`;

  useBodyOverflow(viewFullPlayer);

  return (
    <div
      className={`w-full md:w-[350px] lg:w-[350px] h-[${
        viewFullPlayer ? "100%" : "80px"
      }] md:h-[180px] lg:h-[180px] z-50 fixed left-1/2 transform -translate-x-1/2 bg-menu-aside-background rounded-lg shadow-lg text-white p-4 flex flex-col items-center`}
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform,
        bottom: isMobile ? "0px" : "2.5rem",
        cursor: dragging ? "grabbing" : "grab",
        transition: dragging ? "none" : "transform 0.2s ease",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <audio
        ref={audioRef}
        src={urlMusic}
        autoPlay
        onTimeUpdate={updateProgress}
        preload="metadata"
        onEnded={handleAudioEnd}
      />
      {isMobile ? (
        <div
          className={`flex flex-col items-center w-full ${
            viewFullPlayer ? "h-[100%] justify-center" : ""
          }`}
          onClick={() => setViewFullPlayer(true)}
        >
          <button
            className={`absolute bottom-16 right-1 p-1 rounded-full bg-gray-700 hover:bg-gray-600`}
            onClick={(e) => {
              e.stopPropagation();
              viewFullPlayer ? setViewFullPlayer(false) : closeMusicPlayer();
            }}
          >
            {viewFullPlayer ? (
              <FaArrowDown className="text-xl text-white w-4 h-4" />
            ) : (
              <FaTimes className="text-xl text-white w-4 h-4" />
            )}
          </button>
          <div className="flex items-center justify-between w-full mb-2 ">
            {!viewFullPlayer && (
              <img
                src={musicSelected?.track?.album?.images[0]?.url}
                alt={musicSelected?.track?.name}
                className="w-16 h-12 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 ml-2">
              <h3
                className={`font-semibold ${
                  viewFullPlayer ? "text-lg" : "text-xd"
                }`}
              >
                {musicSelected?.track?.name.slice(0, 14)}...
              </h3>
              <p className="text-[10px] text-gray-400">
                {musicSelected?.track?.artists[0]?.name}
              </p>
            </div>
            <div className="flex items-center space-x-2 mr-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousOrNextTrack("previous");
                }}
                className="p-2 z-auto rounded-full bg-lime-600 hover:bg-gray-600"
              >
                <FaBackward className="text-xl w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="p-2 z-auto rounded-full bg-lime-600 hover:bg-gray-600"
              >
                {isPlaying ? (
                  <FaPause className="text-xl w-4 h-4" />
                ) : (
                  <FaPlay className="text-xl w-4 h-4" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  previousOrNextTrack("next");
                }}
                className="p-2 z-auto rounded-full bg-lime-600 hover:bg-gray-600"
              >
                <FaForward className="text-xl w-4 h-4" />
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max={audioRef?.current?.duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className={`${
              viewFullPlayer ? "" : "absolute bottom-0"
            } left-0 w-full accent-lime-500`}
            style={{
              height: viewFullPlayer ? "12px" : "4px",
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <button
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600"
            onClick={() => closeMusicPlayer()}
          >
            <FaTimes className="text-xl text-white" />
          </button>

          <div className="text-center mt-2 mb-4">
            <h3 className="text-xs font-semibold">
              {musicSelected?.track?.name}
            </h3>
            <p className="text-sm text-gray-400">
              {musicSelected?.track?.artists[0]?.name}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={() => previousOrNextTrack("previous")}
              className="p-2 rounded-full bg-lime-600 hover:bg-gray-600"
            >
              <FaBackward className="text-xl" />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-full bg-lime-600 hover:bg-gray-600"
            >
              {isPlaying ? (
                <FaPause className="text-xl" />
              ) : (
                <FaPlay className="text-xl" />
              )}
            </button>
            <button
              onClick={() => previousOrNextTrack("next")}
              className="p-2 rounded-full bg-lime-600 hover:bg-gray-600"
            >
              <FaForward className="text-xl" />
            </button>
          </div>

          <input
            type="range"
            min="0"
            max={audioRef?.current?.duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-lime-500 mt-4"
            style={{
              height: "4px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
