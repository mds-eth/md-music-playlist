import useSWR from "swr";
import spotifyAPI from "../../services/http-spotify";

export const usePlaylistsCategories = () => {
  const {
    data,
    error,
    isValidating: loadingCategories,
  } = useSWR(
    "categories",
    async () => {
      const response = await spotifyAPI.getMusicCategories();
      return response.categories;
    },
    { revalidateOnFocus: false }
  );

  return {
    categories: data,
    loadingCategories,
    error,
  };
};
