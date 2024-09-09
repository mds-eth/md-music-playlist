import useSWR from "swr";
import spotifyAPI from "../../services/http-spotify";

const fetchPlaylists = async (categorieId: string) => {
  const response = await spotifyAPI.getPlaylistsByCategorie(categorieId);
  return response.playlists;
};

export const usePlaylistsByCategory = (categorieId: string | null) => {
  const { data, error, isValidating } = useSWR(
    categorieId ? `categorie-${categorieId}` : null,
    () => fetchPlaylists(categorieId as string),
    { revalidateOnFocus: false }
  );

  return {
    playlistsByCategorie: data,
    loading: isValidating,
    error,
  };
};
