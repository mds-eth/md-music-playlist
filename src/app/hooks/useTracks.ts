import useSWR from "swr";
import spotifyAPI from "../../services/http-spotify";

export const useTracks = (trackId: string) => {
  const { data, error, isValidating } = useSWR(
    trackId ? `tracks-${trackId}` : null,
    async () => {
      return await spotifyAPI.getTracksPlaylist(trackId);
    },
    { revalidateOnFocus: false }
  );

  return {
    tracks: data,
    loading: isValidating,
    error,
  };
};
