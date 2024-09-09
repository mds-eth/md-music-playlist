import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import {
  CLIENT_ID_SPOTIFY,
  CLIENT_SECRET_SPOTIFY,
  URL_API_SPOTIFY,
  URL_API_TOKEN_SPOTIFY,
} from "../constants/constants";

class SpotifyAPI {
  private api: AxiosInstance;
  private accessToken: string | null = null;
  private tokenExpiration: number | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: URL_API_SPOTIFY,
      timeout: 5000,
    });

    this.setupInterceptors();
  }

  private async getSpotifyAccessToken(): Promise<string> {
    if (
      this.accessToken &&
      this.tokenExpiration &&
      Date.now() < this.tokenExpiration
    ) {
      return this.accessToken;
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const authString = Buffer.from(
      `${CLIENT_ID_SPOTIFY}:${CLIENT_SECRET_SPOTIFY}`
    ).toString("base64");

    try {
      const response = await axios.post(URL_API_TOKEN_SPOTIFY, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authString}`,
        },
      });

      this.accessToken = response.data.access_token;

      const expiresIn = response.data.expires_in * 1000;

      this.tokenExpiration = Date.now() + expiresIn;

      return this.accessToken as string;
    } catch (error) {
      console.error("Erro ao obter token do Spotify:", error);
      throw error;
    }
  }

  private async setupInterceptors() {
    const token = await this.getSpotifyAccessToken();

    this.api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  public async request(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ) {
    try {
      const token = await this.getSpotifyAccessToken();

      const response = await this.api.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(config?.headers || {}),
        },
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao fazer requisição para ${url}:`, error);
      throw error;
    }
  }

  public async getMusicCategories() {
    return this.request("/browse/categories");
  }

  public async getPlaylistsByCategorie(category_id: string) {
    return this.request(`/browse/categories/${category_id}/playlists`);
  }

  public async getTracksPlaylist(urlTracks: string) {
    return this.request(urlTracks);
  }
  public async fetchSearchApi(search: string) {
    return this.request(
      `/search?q=${encodeURIComponent(search)}&type=playlist`
    );
  }
}

const spotifyAPI = new SpotifyAPI();

export default spotifyAPI;
