import type { ConversationRequest } from "../../types/chat";
import type { ChatMessageRequest } from "../../types/ChatMessage";
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
    const response = await api.post(
      "/chat/conversations/create",
      conversation,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

export const createMessage = async (request: ChatMessageRequest) => {
  try {
    const response = await api.post("/chat/messages/create", request, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

export const getMessages = async (conversationId: string) => {
  try {
    const response = await api.get(`/chat/messages/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
