import { getToken } from "./getToken";
import notImage from "../assets/noimage.png";
import { TracksResponse } from "../models/User/Tracks/tracksResponse";
import { Track, TracksList } from "../models/User/Tracks/tracks.model";

export const getTracks = async (playlistsIds: string[]) => {
  const url = import.meta.env.VITE_SPOTIFY_URL_BASE || "";
  const token = await getToken();
  let tracks: Track[] = [];

  for (const playlistId of playlistsIds) {
    const tracksOfPLaylist = await fetchTracks(url, token, playlistId);
    tracks = tracks.concat(tracksOfPLaylist!);
  }

  return { totalTracks: tracks.length, items: tracks } as TracksList;
};

const fetchTracks = async (url: string, token: string, playlistId: string) => {
  try {
    const response = await fetch(`${url}/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data: TracksResponse = await response.json();

    const tracksLists: Track[] = data.items.map((item) => ({
      name: item.track.name,
      id: item.track.id,
      image: item.track.album.images[0]?.url || notImage,
      uri: item.track.uri,
      artistName: item.track.artists.map((artist) => artist.name),
      popularity: item.track.popularity,
    }));
    return tracksLists;
  } catch (error) {
    console.log(error);
  }
};
