import { api } from "./api";
import { getLocalStorage } from "./storage";

export const getMyInfo = async () => {
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
