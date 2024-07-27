import { Table } from "../models/interfaces/tableInterface";
import { UserPlaylists } from "../models/User/Playlists/userPlaylists.model";

export const createDataTablePlaylists = (
  playlists: UserPlaylists,
  t: (key: string) => string
): Table => {
  const data: Table = {
    headers: [
      {
        value: t("TablePlaylists.playlists"),
        responsive: true,
      },
      {
        value: t("TablePlaylists.totalTracks"),
        responsive: false,
      },
    ],
    dataTable: playlists.items.map((playlist) => {
      return {
        isSelected: false,
        image: playlist.image,
        name: playlist.name,
        owner: playlist.owner,
        info: playlist.totalTracks,
        itemId: playlist.id,
        uri: playlist.uri,
      };
    }),
    type: "playlists",
    action: {
      contentButton: "Continuar",
      action: "tracks",
    },
  };
  console.log(data);
  return data;
};
