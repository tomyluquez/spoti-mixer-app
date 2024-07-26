import { getToken } from "./getToken";
const url = import.meta.env.VITE_SPOTIFY_URL_BASE || "";
const token = await getToken();

export const AddItemToPlaylist = async (playlistID: number, uris: string[]) => {
  const maxNumberOfItems = 100;
  let data;

  if (uris.length > maxNumberOfItems) {
    const numberOfChunks = Math.ceil(uris.length / maxNumberOfItems);
    for (let i = 0; i < numberOfChunks; i++) {
      const chunk = uris.slice(
        i * maxNumberOfItems,
        (i + 1) * maxNumberOfItems
      );
      await fetchData(playlistID, chunk);
    }
  } else {
    await fetchData(playlistID, uris);
  }

  console.log(data);
};

const fetchData = async (playlistID: number, uris: string[]) => {
  try {
    await fetch(`${url}/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        uris,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
