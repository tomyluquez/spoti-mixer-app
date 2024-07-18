import { checkValidateToken } from "../helpers/checkValidateToken";

export const getToken = async () => {
  const isTokenExpired = checkValidateToken();
  if (isTokenExpired) {
    await fetchAccessToken();
  }

  const { access_token } = JSON.parse(
    localStorage.getItem("access_token_data")!
  );
  return access_token;
};
export const fetchAccessToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const url = import.meta.env.VITE_SPOTIFY_URL_TOKEN || "";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await response.json();
  const expirationTime = Date.now() + data.expires_in * 1000;

  localStorage.setItem(
    "access_token_data",
    JSON.stringify({
      ...data,
      expirationTime,
    })
  );
};
