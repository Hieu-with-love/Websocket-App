import { api } from "./api";

export const getToken = async (username: string, password: string) => {
  try {
    const response = await api.post(`/identity/auth/token`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

export const loginWithGoogle = async (code: string) => {
  try {
    const response = await api.post(
      `/identity/auth/outbound/authenticate?code=${code}`
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};
