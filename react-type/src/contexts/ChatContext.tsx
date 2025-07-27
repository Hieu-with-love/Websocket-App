import React, { createContext, useContext, useState, useEffect } from "react";
import type { ConversationResponse } from "../types/chat";
import { getConversations } from "../config/apis/conversationApis";

interface ChatContextType {
  conversations: ConversationResponse[];
  selectedConversation: ConversationResponse | null;
  isLoadingConversations: boolean;
  setSelectedConversation: (conversation: ConversationResponse | null) => void;
  refreshConversations: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationResponse | null>(null);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);

  const fetchConversations = async () => {
    try {
      setIsLoadingConversations(true);
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.log("No JWT token found, user not logged in");
        return;
      }

      const response = await getConversations();
      console.log("Conversations response:", response);

      const conversationsData = response.result || response.data || response;
      console.log("Conversations data:", conversationsData);

      const conversationsList = Array.isArray(conversationsData)
        ? conversationsData
        : [];
      setConversations(conversationsList);

      // Auto-select first conversation if none selected and conversations exist
      if (!selectedConversation && conversationsList.length > 0) {
        setSelectedConversation(conversationsList[0]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setConversations([]);
    } finally {
      setIsLoadingConversations(false);
    }
  };

  const refreshConversations = async () => {
    await fetchConversations();
  };

  useEffect(() => {
    const initializeConversations = async () => {
      try {
        setIsLoadingConversations(true);
        const token = localStorage.getItem("jwt");

        if (!token) {
          console.log("No JWT token found, user not logged in");
          return;
        }

        const response = await getConversations();
        console.log("Conversations response:", response);

        const conversationsData = response.result || response.data || response;
        console.log("Conversations data:", conversationsData);

        const conversationsList = Array.isArray(conversationsData)
          ? conversationsData
          : [];
        setConversations(conversationsList);

        // Auto-select first conversation if conversations exist
        if (conversationsList.length > 0) {
          setSelectedConversation(conversationsList[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setConversations([]);
      } finally {
        setIsLoadingConversations(false);
      }
    };

    initializeConversations();
  }, []); // Only run on mount

  const value: ChatContextType = {
    conversations,
    selectedConversation,
    isLoadingConversations,
    setSelectedConversation,
    refreshConversations,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
