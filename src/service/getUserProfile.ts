import { UserProfile } from "../models/User/Profile/userProfile.model";
import { UserProfileResponse } from "../models/User/Profile/userProfileResponde.model";
import { getToken } from "./getToken";

export const GetUserProfile = async (username: string) => {
  const url = import.meta.env.VITE_SPOTIFY_URL_BASE || "";
  const token = await getToken();
  console.log(username);

  const response = await fetch(`${url}/v1/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data: UserProfileResponse = await response.json();

  const profile = new UserProfile();
  console.log(data);
  profile.img = data.images[0].url;
  profile.userID = data.id;
  profile.userName = data.display_name;
  profile.userUri = data.uri;
  return profile;
};
