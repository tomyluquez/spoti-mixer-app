export class UserPlaylists {
  total!: number;
  items!: Playlist[];
}

export interface Playlist {
  name: string;
  id: string;
  image: string;
  public: boolean;
  uri: string;
  owner: string;
  totalTracks: number;
  isPublic: boolean;
}
