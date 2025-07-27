import React, { useState, useEffect } from "react";
import Navigation from "../components/layout/Navigation";
import Sidebar from "../components/layout/Sidebar";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import type { UserProfile } from "../types/user";
import { getMyInfo } from "../config/apis/userApis";
import { useNavigate } from "react-router-dom";
import { ChatProvider, useChatContext } from "../contexts/ChatContext";

const ChatLayoutContent: React.FC = () => {
  const { selectedConversation, setSelectedConversation } = useChatContext();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        setUserProfile(response.result);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div className="chat-layout">
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Navigation */}
        <Navigation className="flex-shrink-0" />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          {/* Sidebar */}
          <Sidebar
            className="w-64 flex-shrink-0"
            userProfile={userProfile}
            isLoadingUser={isLoadingUser}
          />

          {/* Chat Area */}
          <div className="flex-1 flex min-w-0">
            {/* Conversation List */}
            <ConversationList
              className="w-80 flex-shrink-0"
              onSelectConversation={setSelectedConversation}
            />

            {/* Chat Window */}
            <div className="flex-1 flex flex-col min-w-0">
              <ChatWindow
                className="flex-1"
                target={selectedConversation || undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatLayout: React.FC = () => {
  return (
    <ChatProvider>
      <ChatLayoutContent />
    </ChatProvider>
  );
};

export default ChatLayout;
