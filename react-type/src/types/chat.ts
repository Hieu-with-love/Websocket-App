export interface ChatUser {
  id?: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Conversation extends ChatUser {
  id: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isGroup?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  avatar?: string;
}
