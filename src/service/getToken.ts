import { checkValidateToken } from "../helpers/checkValidateToken";
import { userAuth } from "./userAuyh";

export const getToken = async () => {
  const isTokenExpired = checkValidateToken();

  if (isTokenExpired) {
    const code = localStorage.getItem("code");
    if (!code) {
      userAuth(); // Redirige para obtener un nuevo código
      return;
    }
    await fetchAccessToken(code);
  }

  const accessTokenData = localStorage.getItem("access_token_data");
  if (accessTokenData) {
    const { access_token } = JSON.parse(accessTokenData);
    return access_token;
  }
  return null;
};

export const fetchAccessToken = async (code: string) => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const url = import.meta.env.VITE_SPOTIFY_URL_TOKEN || "";

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
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
