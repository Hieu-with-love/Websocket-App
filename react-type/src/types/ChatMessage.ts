import type { Participant } from "./chat";

export interface ChatMessageRequest {
  conversationId: string;
  message: string;
}

export interface ChatMessageResponse {
  id: string;
  conversationId: string;
  me: boolean;
  message: string;
  sender: Participant;
  createdAt: string;
}
