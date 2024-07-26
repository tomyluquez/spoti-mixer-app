import { getToken } from "./getToken";

export const CreatePlaylist = async (userID: string, playlistsName: string) => {
  const url = import.meta.env.VITE_SPOTIFY_URL_BASE || "";
  const token = await getToken();

  try {
    const response = await fetch(`${url}/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: playlistsName,
      }),
    });
    const data = await response.json();
    return {
      id: data.id,
      href: data.external_urls.spotify,
    };
  } catch (error) {
    console.log(error);
    return {
      id: "",
      href: "",
    };
  }
};
