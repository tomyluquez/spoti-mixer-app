import { UserProfile } from "../models/User/Profile/userProfile.model";
import { UserProfileResponse } from "../models/User/Profile/userProfileResponde.model";
import { getToken } from "./getToken";
import notImage from "../assets/noimage.png";

export const GetUserProfile = async (userID: string) => {
  const url = import.meta.env.VITE_SPOTIFY_URL_BASE || "";
  const token = await getToken();

  try {
    const response = await fetch(`${url}/v1/users/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data: UserProfileResponse = await response.json();

    const profile = new UserProfile();
    profile.img = data.images[0].url || notImage;
    profile.userID = data.id;
    profile.userName = data.display_name;
    profile.userUri = data.uri;
    console.log(data);
    return profile;
  } catch (error) {
    console.log(error);
  }
};
