"use client";

import { useParams } from "next/navigation";

import { useEffect } from "react";
import Header from "../../components/Header";

import MenuAside from "../../components/MenuAside";
import { useSpotify } from "../../contexts/SpotifyContext";
import MenuPlayer from "../../components/MenuPlayer";
import MusicPlayer from "../../components/Player";
import SkeletonPlaylists from "../../components/Skeleton/SkeletonPlaylists";
import Playlist from "../../components/Playlist";
import NoResultMessage from "../../components/NotResultMessage";
import React from "react";
import { generateUUID } from "../../../utils/functions";
import ButtomMobile from "../../components/MenuAside/ButtonMobile";
import useBodyOverflow from "../../hooks/useBodyOverflow";
import useIsMobile from "../../hooks/useIsMobile";
import { useMenuAside } from "../../contexts/MenuAsideContext";
import { ItemPlaylist } from "../../types/types";

export default function CategorieDetails() {
  const params = useParams();

  const isMobile = useIsMobile();

  const categorieId = params.categorieId as string;

  const {
    playlistCategories,
    loadingPlaylists,
    fetchPlaylistsByCategories,
    openMusicPlayer,
    openMenuListTracks,
    searchInput,
  } = useSpotify();

  const { viewMenuAside } = useMenuAside();

  useEffect(() => {
    fetchPlaylistsByCategories(categorieId);
  }, [categorieId]);

  const shouldBlockScroll = viewMenuAside || openMenuListTracks;

  useBodyOverflow(shouldBlockScroll);

  return (
    <>
      <div className="bg-dark-music-gradient flex flex-col min-h-screen">
        <Header />
        <div
          className={`flex flex-grow pb-0 lg:p-16 ${isMobile ? "mt-16" : ""} ${
            openMusicPlayer && isMobile ? "mb-20" : ""
          }`}
        >
          {!isMobile || viewMenuAside ? <MenuAside /> : null}
          <div
            className={`flex-grow transition-all duration-300 md:ml-72 p-4 ${
              openMenuListTracks ? "md:mr-72" : "mr-0"
            } overflow-auto`}
          >
            <>
              {loadingPlaylists && <SkeletonPlaylists />}

              {!loadingPlaylists &&
                (searchInput?.items?.length > 0 ? (
                  searchInput?.items
                    ?.filter(
                      (playlist: ItemPlaylist) => playlist.tracks?.total > 0
                    )
                    .map((playlist: ItemPlaylist, index: number) => (
                      <React.Fragment key={generateUUID()}>
                        <Playlist playlist={playlist} index={index} />
                      </React.Fragment>
                    ))
                ) : playlistCategories?.items?.length > 0 ? (
                  playlistCategories?.items?.filter(
                    (playlist: ItemPlaylist) => playlist.tracks?.total > 0
                  ).length > 0 ? (
                    playlistCategories.items
                      ?.filter(
                        (playlist: ItemPlaylist) => playlist.tracks?.total > 0
                      )
                      ?.map((playlist: ItemPlaylist, index: number) => (
                        <React.Fragment key={generateUUID()}>
                          <Playlist playlist={playlist} index={index} />
                        </React.Fragment>
                      ))
                  ) : (
                    <NoResultMessage />
                  )
                ) : (
                  <NoResultMessage />
                ))}
            </>
          </div>
        </div>
      </div>
      {openMenuListTracks && <MenuPlayer />}
      {openMusicPlayer && <MusicPlayer />}
      <ButtomMobile />
    </>
  );
}
