export type SpotifyCategoryIcon = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyCategory = {
  href: string;
  id: string;
  icons: SpotifyCategoryIcon[];
  name: string;
};

export type SpotifyCategoriesResponse = {
  href: string;
  items: SpotifyCategory[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifyPlaylistOwner = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type SpotifyPlaylistImage = {
  height: number | null;
  url: string;
  width: number | null;
};

export type SpotifyPlaylistTrack = {
  href: string;
  total: number;
};

export type SpotifyPlaylistResponse = {
  href: string;
  items: SpotifyPlaylistItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export type SpotifyPlaylistItem = {
  collaborative: boolean;
  description: string;
  title?: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyPlaylistImage[];
  name: string;
  owner: SpotifyPlaylistOwner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyPlaylistTrack;
  type: string;
  uri: string;
};

export type SpotifyPlaylists = {
  href: string;
  items: SpotifyPlaylistItem[];
};

export type SpotifyResponse = {
  message: string;
  playlists: SpotifyPlaylists;
};

export type TracksObject = {
  href: string;
  items: ObjectTrack[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type ObjectTrack = {
  added_at: string;
  added_by: Addedby;
  is_local: boolean;
  primary_color?: any;
  track: Track;
  video_thumbnail: Videothumbnail;
};
export type Videothumbnail = {
  url?: any;
};
export type Track = {
  preview_url: string;
  available_markets: string[];
  explicit: boolean;
  type: string;
  episode: boolean;
  track: boolean;
  album: Album;
  artists: Artist[];
  disc_number: number;
  track_number: number;
  duration_ms: number;
  external_ids: Externalids;
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  uri: string;
  is_local: boolean;
};
export type Externalids = {
  isrc: string;
};

export type Album = {
  available_markets: string[];
  type: string;
  album_type: string;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  uri: string;
  artists: Artist[];
  external_urls: Externalurls;
  total_tracks: number;
};
export type Artist = {
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};
export type Image = {
  height: number;
  url: string;
  width: number;
};
export type Addedby = {
  external_urls: Externalurls;
  href: string;
  id: string;
  type: string;
  uri: string;
};
export type Externalurls = {
  spotify: string;
};

export type Root = {
  artists: Artists;
};

export type Artists = {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type Item = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type Followers = {
  href: any;
  total: number;
};

export type PlaylistType = {
  playlists: Playlists;
};

export type Playlists = {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type ItemPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: any;
  public: any;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
};

export type Owner = {
  display_name: string;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type ExternalUrls2 = {
  spotify: string;
};

export type Tracks = {
  href: string;
  total: number;
};
