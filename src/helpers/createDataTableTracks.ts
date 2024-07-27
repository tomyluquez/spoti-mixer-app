import { Table } from "../models/interfaces/tableInterface";
import { TracksList } from "../models/User/Tracks/tracks.model";

export const createDataTableTracks = (
  tracksList: TracksList,
  t: (key: string) => string
): Table => {
  const data: Table = {
    headers: [
      {
        value: t("TableTracks.tracks"),
        responsive: true,
      },
      {
        value: t("TableTracks.popularity"),
        responsive: false,
      },
    ],
    dataTable: tracksList.items.map((track) => {
      return {
        isSelected: true,
        image: track.image,
        name: track.name,
        owner: track.artistName[0],
        info: track.popularity,
        itemId: track.id,
        uri: track.uri,
      };
    }),
    type: "tracks",
    action: {
      contentButton: "Mixear",
      action: () => {
        console.log("Mixear");
      },
    },
  };
  console.log(data);
  return data;
};
