export class TracksList {
  totalTracks!: number;
  items!: Track[];
}

export interface Track {
  name: string;
  id: string;
  image: string;
  uri: string;
  artistName: string[];
  popularity: number;
}
