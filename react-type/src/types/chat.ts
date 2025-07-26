export interface ChatUser {
  id?: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Participant {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface ConversationRequest {
  type: string; // direct, group, or channel
  participantIds: string[];
}

export interface ConversationResponse {
  id: string;
  type: string; // direct, group, or channel
  participantHash: string;
  conversationAvatar: string;
  conversationName: string;
  participants: Participant[];
  createdAt: string;
  modifiedAt: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  avatar?: string;
}
