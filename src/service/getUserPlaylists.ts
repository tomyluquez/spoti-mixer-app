import { getToken } from "./getToken";
import notImage from "../assets/noimage.png";
import { UserPlaylistsResponse } from "../models/User/Playlists/userPlaylistsResponse";
import { UserPlaylists } from "../models/User/Playlists/userPlaylists.model";

export const getUserPlaylists = async (userId: string) => {
  const url = import.meta.env.VITE_SPOTIFY_URL_BASE || "";
  const token = await getToken();

  try {
    const response = await fetch(`${url}/v1/users/${userId}/playlists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data: UserPlaylistsResponse = await response.json();

    const userPlaylists = new UserPlaylists();
    userPlaylists.total = data.total;
    userPlaylists.items = data.items.map((item) => {
      return {
        name: item.name,
        id: item.id,
        image:
          item.images && item.images.length > 0 ? item.images[0].url : notImage,
        public: item.public,
        uri: item.uri,
        owner: item.owner.display_name || "unknown",
        totalTracks: item.tracks.total,
        isPublic: item.public,
      };
    });
    return userPlaylists;
  } catch (error) {
    console.log(error);
  }
};
