"use client";

import Header from "./components/Header";
import MenuAside from "./components/MenuAside";
import Categories from "./components/Dashboard";
import MusicPlayer from "./components/Player";
import { useSpotify } from "./contexts/SpotifyContext";
import Playlist from "./components/Playlist";
import MenuPlayer from "./components/MenuPlayer";
import SkeletonPlaylists from "./components/Skeleton/SkeletonPlaylists";
import ButtomMobile from "./components/MenuAside/ButtonMobile";
import useBodyOverflow from "./hooks/useBodyOverflow";
import useIsMobile from "./hooks/useIsMobile";
import { useMenuAside } from "./contexts/MenuAsideContext";
import { ItemPlaylist } from "./types/types";

export default function Dashboard() {
  const { openMusicPlayer, searchInput, openMenuListTracks, loadingSearch } =
    useSpotify();

  const isMobile = useIsMobile();

  const { viewMenuAside } = useMenuAside();

  const shouldBlockScroll = viewMenuAside || openMenuListTracks;

  useBodyOverflow(shouldBlockScroll);

  return (
    <>
      <div className="bg-dark-music-gradient flex flex-col min-h-screen custom-scrollbar">
        <Header />

        <div
          className={`flex flex-grow p-4 lg:p-16 space-x-4 mt-16 lg:mt-0 ${
            openMusicPlayer && isMobile ? "mb-20" : ""
          }`}
        >
          <div
            className={`flex-grow transition-all duration-300 md:ml-72 p-4 ${
              openMenuListTracks ? "md:mr-72" : "mr-0"
            } overflow-auto`}
          >
            {loadingSearch && <SkeletonPlaylists />}
            {searchInput ? (
              searchInput?.items
                ?.filter((playlist: ItemPlaylist) => playlist.tracks?.total > 0)
                .map((playlist: ItemPlaylist, index: number) => (
                  <Playlist playlist={playlist} index={index} />
                ))
            ) : (
              <Categories />
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <MenuAside />
      </div>
      <div className="lg:hidden">{viewMenuAside && <MenuAside />}</div>
      {openMenuListTracks && <MenuPlayer />}
      {openMusicPlayer && <MusicPlayer />}
      <ButtomMobile />
    </>
  );
}
