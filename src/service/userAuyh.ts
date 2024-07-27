export const userAuth = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    import.meta.env.VITE_SPOTIFY_REDIRECT_URI
  );
  const scopes = encodeURIComponent(
    "playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative"
  );

  if (!clientId || !redirectUri) {
    console.error("Client ID or Redirect URI is missing.");
    return;
  }

  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

  window.location.href = url;
};
