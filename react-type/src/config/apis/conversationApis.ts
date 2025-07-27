import type { ConversationRequest } from "../../types/chat";
import { api } from "./api";

export const getConversations = async () => {
  try {
    const reponse = await api.get("/chat/conversations", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return reponse.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

export const createConversation = async (conversation: ConversationRequest) => {
  try {
    const response = await api.post("/chat/conversations/create", conversation);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};
