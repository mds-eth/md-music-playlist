"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

import spotifyAPI from "../../services/http-spotify";

import {
  ObjectTrack,
  SpotifyCategoriesResponse,
  SpotifyPlaylistItem,
  SpotifyPlaylistResponse,
  TracksObject,
} from "../types/types";
import { usePlaylistsByCategory } from "../hooks/usePlaylistByCategorie";
import { usePlaylistsCategories } from "../hooks/usePlaylistCategories";
import { useTracks } from "../hooks/useTracks";
import { useMenuAside } from "./MenuAsideContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useIsMobile from "../hooks/useIsMobile";

interface SpotifyContextType {
  tracks: TracksObject;
  loadingTracks: boolean;
  isPlaying: boolean;
  searchQuery: string;
  loadingPlaylists: boolean;
  loadingSearch: boolean;
  loadingCategories: boolean;
  openMenuListTracks: boolean;
  idTrackPlayMoment: string;
  searchInput: any | undefined;
  musicSelected: ObjectTrack | undefined;
  lastSearchs: string[];
  lastMusics: ObjectTrack[] | undefined;
  openMusicPlayer: boolean;
  urlMusic: string;
  playlistSelected: SpotifyPlaylistItem;
  playlistCategories: any | undefined;
  categories: SpotifyCategoriesResponse | undefined;
  setIsPlaying: (isPlay: boolean) => void;
  playMusic(urlMusic: string): void;
  setSearchQuery: (searchQuery: string) => void;
  fetchPlaylistsByCategories: (categoryId: string) => void;
  fetchTracksList: (urlTracks: string) => void;
  setPlaylistSelected: (playlist: SpotifyPlaylistItem) => void;
  setMusicSelected: (music: any) => void;
  setOpenMusicPlayer: (open: boolean) => void;
  fetchSearchApi: (search: string) => void;
  setLoadingTracks: (loading: boolean) => void;
  setOpenMenuListTracks: (menuListTracks: boolean) => void;
  addMusicToHistory: (music: ObjectTrack) => void;
  setIdTrackPlayMoment: (idTrack: string) => void;
  previousOrNextTrack: (order: string) => void;
  setPlaylistCategories: (playlist: any) => void;
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

const SpotifyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [urlTrack, setUrlTrack] = useState<string>("");
  const [openMusicPlayer, setOpenMusicPlayer] = useState<boolean>(false);
  const [urlMusic, setUrlMusic] = useState<string>("");
  const [playlistCategories, setPlaylistCategories] =
    useState<SpotifyPlaylistResponse>();
  const [categories, setCategories] = useState<SpotifyCategoriesResponse>();
  const [playlistSelected, setPlaylistSelected] = useState<any>({});
  const [musicSelected, setMusicSelected] = useState<ObjectTrack>();

  const [isPlaying, setIsPlaying] = useState(urlMusic ? true : false);

  const [searchInput, setSearchInput] = useState<any>();

  const [idTrackPlayMoment, setIdTrackPlayMoment] = useState<string>("");

  const [loadingTracks, setLoadingTracks] = useState<boolean>(true);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  const [categorieId, setCategorieId] = useState<string>("");

  const [openMenuListTracks, setOpenMenuListTracks] = useState<boolean>(false);

  const isMobile = useIsMobile();
  const { setViewMenuAside } = useMenuAside();

  const [lastMusics, setLastMusics] = useLocalStorage("lastMusics", []);
  const [lastSearchs, setLastSearchs] = useLocalStorage("lastSearchs", []);

  const { tracks: tracksData, loading } = useTracks(urlTrack ?? "");

  useEffect(() => {
    setLoadingTracks(loading);
    if (tracksData) {
      setTracks(tracksData);
    }
  }, [tracksData]);

  const { playlistsByCategorie, loading: loadingPlaylists } =
    usePlaylistsByCategory(categorieId || "");

  useEffect(() => {
    if (categorieId && playlistsByCategorie) {
      setPlaylistCategories(playlistsByCategorie);
    }
  }, [categorieId, playlistsByCategorie]);

  const { categories: cachedCategories, loadingCategories } =
    usePlaylistsCategories();

  useEffect(() => {
    if (cachedCategories) {
      setCategories(cachedCategories);
    }
  }, [cachedCategories]);

  useEffect(() => {
    if (searchQuery === "" && !isMobile) {
      setSearchInput(undefined);
    }
  }, [searchQuery]);

  const addMusicToHistory = (newTrack: ObjectTrack) => {
    setLastMusics((prevMusics: ObjectTrack[]) => {
      const isTrackInHistory = prevMusics?.some(
        (track: ObjectTrack) => track.track.id === newTrack.track.id
      );

      if (isTrackInHistory) {
        return prevMusics;
      }

      if (prevMusics?.length >= 10) {
        return [newTrack, ...prevMusics.slice(0, 9)];
      }
      return [newTrack, ...prevMusics];
    });
  };

  const fetchPlaylistsByCategories = async (categorieId: string) => {
    if (categorieId) {
      try {
        setCategorieId(categorieId);
      } catch (error) {
        console.error("Erro ao buscar detalhes do gênero:", error);
      }
    }
  };

  const fetchTracksList = async (urlTracks: string) => {
    try {
      setLoadingTracks(true);
      const urlTrack = urlTracks?.split("v1")[1];

      setUrlTrack(urlTrack);

      setLoadingTracks(false);
    } catch (error) {
      setLoadingTracks(false);
      setTracks([]);
    } finally {
      setLoadingTracks(false);
    }
  };

  const fetchSearchApi = async (search: string) => {
    try {
      if (search === "") {
        return setSearchInput(undefined);
      }

      setLoadingSearch(true);

      const response = await spotifyAPI.fetchSearchApi(search);

      setSearchInput(response.playlists);

      setLastSearchs((prevSearches: string[]) => {
        if (prevSearches.includes(search)) {
          return prevSearches;
        }
        return [search, ...prevSearches].slice(0, 5);
      });

      setViewMenuAside(false);

      if (isMobile) setSearchQuery("");
    } catch (error) {
    } finally {
      setLoadingSearch(false);
    }
  };

  const playMusic = (urlMusic: string) => {
    setOpenMusicPlayer(true);
    setUrlMusic(urlMusic);
    setIsPlaying(true);
  };

  const previousOrNextTrack = (order: string) => {
    if (!tracks || !tracks?.items || tracks?.items.length === 0) {
      return;
    }

    const currentIndex = tracks?.items.findIndex(
      (item: any) => item.track.id === idTrackPlayMoment
    );

    if (currentIndex === -1) {
      return;
    }

    let newIndex: number | null = null;

    if (order === "previous") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : null;
    } else if (order === "next") {
      newIndex =
        currentIndex < tracks?.items.length - 1 ? currentIndex + 1 : null;
    }

    if (newIndex !== null) {
      addMusicToHistory(tracks?.items[newIndex]);
      setMusicSelected(tracks?.items[newIndex]);
      setIdTrackPlayMoment(tracks?.items[newIndex].track.id);
      setUrlMusic(tracks?.items[newIndex].track.preview_url);
    }
  };

  const value = {
    tracks,
    categories,
    isPlaying,
    searchQuery,
    loadingTracks,
    lastSearchs,
    loadingCategories,
    loadingSearch,
    loadingPlaylists,
    musicSelected,
    urlMusic,
    lastMusics,
    openMusicPlayer,
    playlistCategories,
    playlistSelected,
    idTrackPlayMoment,
    openMenuListTracks,
    searchInput,
    playMusic,
    setIsPlaying,
    setSearchQuery,
    setOpenMusicPlayer,
    fetchTracksList,
    setPlaylistSelected,
    fetchSearchApi,
    setMusicSelected,
    setLoadingTracks,
    setIdTrackPlayMoment,
    setOpenMenuListTracks,
    addMusicToHistory,
    previousOrNextTrack,
    setPlaylistCategories,
    fetchPlaylistsByCategories,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};

const useSpotify = () => {
  const context = React.useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};

export { SpotifyProvider, useSpotify };
