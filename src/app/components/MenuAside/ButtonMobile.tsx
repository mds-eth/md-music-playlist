import React from "react";
import { FaListAlt } from "react-icons/fa";

import { useSpotify } from "../../contexts/SpotifyContext";
import useIsMobile from "../../hooks/useIsMobile";
import { useMenuAside } from "../../contexts/MenuAsideContext";

const ButtomMobile = () => {
  const isMobile = useIsMobile();

  const { openMusicPlayer, setOpenMenuListTracks } = useSpotify();

  const { viewMenuAside, setViewMenuAside } = useMenuAside();

  const toggleMenu = () => {
    setOpenMenuListTracks(false);
    setViewMenuAside(true);
  };

  return (
    <div
      className={`fixed bottom-4 ${viewMenuAside ? "hidden" : "left-4"} ${
        openMusicPlayer && isMobile ? "mb-20" : ""
      } flex items-center justify-center lg:hidden bg-red-600 text-white p-3 rounded-full shadow-lg`}
      style={{ width: "40px", height: "40px" }}
      onClick={toggleMenu}
    >
      <FaListAlt className="text-2xl" />
    </div>
  );
};

export default ButtomMobile;
