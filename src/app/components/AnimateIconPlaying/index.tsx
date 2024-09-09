import React from "react";
import { useSpotify } from "../../contexts/SpotifyContext";

const AnimateIconPlaying = () => {
  const { isPlaying } = useSpotify();

  return (
    <img
      src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
      alt="Playing"
      className={`ml-2 w-2 h-2 ${isPlaying ? "animate-equalizer" : ""}`}
    />
  );
};

export default AnimateIconPlaying;
