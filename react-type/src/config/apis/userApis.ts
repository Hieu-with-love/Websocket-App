import { api } from "./api";
import { getLocalStorage } from "./storage";
import type { ApiResponse, UserProfile } from "../../types/user";

export const getMyInfo = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    console.log(getLocalStorage<string>("jwt"));

    const response = await api.get("/identity/users/my-info", {
      headers: {
        Authorization: `Bearer ${getLocalStorage<string>("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
