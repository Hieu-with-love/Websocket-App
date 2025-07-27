import React, { useState } from "react";
import Navigation from "../components/layout/Navigation";
import Sidebar from "../components/layout/Sidebar";
import ConversationList from "../components/chat/ConversationList";
import ChatWindow from "../components/chat/ChatWindow";
import type { Conversation } from "../types/chat";

const ChatLayout: React.FC = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="chat-layout">
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Navigation */}
        <Navigation className="flex-shrink-0" />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          {/* Sidebar */}
          <Sidebar className="w-64 flex-shrink-0" />

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
                user={selectedConversation || undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
