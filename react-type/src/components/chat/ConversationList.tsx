import React, { useState } from "react";
import type { ConversationResponse } from "../../types/chat";
import ConversationItem from "./ConversationItem";
import { useChatContext } from "../../contexts/ChatContext";

interface ConversationListProps {
  className?: string;
  onSelectConversation?: (conversation: ConversationResponse) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  className = "",
  onSelectConversation,
}) => {
  const { conversations, selectedConversation, isLoadingConversations } = useChatContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    // We'll use the helper function from ConversationItem for consistency
    const conversationName = conversation.conversationName ||
      (conversation.type === "direct" && conversation.participants.length > 0
        ? `${conversation.participants[0].firstName} ${conversation.participants[0].lastName}`.trim() ||
          conversation.participants[0].username
        : "Cuộc trò chuyện");
    
    return conversationName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelectConversation = (conversation: ConversationResponse) => {
    onSelectConversation?.(conversation);
  };

  return (
    <div
      className={`h-full sidebar-area border-r border-slate-200 ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Tin nhắn</h2>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm cuộc trò chuyện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingConversations ? (
            <div className="p-4 text-center text-gray-500">
              <p>Đang tải cuộc trò chuyện...</p>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>Không tìm thấy cuộc trò chuyện nào</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={selectedConversation?.id === conversation.id}
                  onSelect={handleSelectConversation}
                />
              ))}
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Trò chuyện mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
