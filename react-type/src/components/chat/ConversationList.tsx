import React, { useEffect, useState } from "react";
import type { ConversationResponse } from "../../types/chat";
import {
  createConversation,
  getConversations,
} from "../../config/apis/conversationApis";

interface ConversationListProps {
  className?: string;
  onSelectConversation?: (conversation: ConversationResponse) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  className = "",
  onSelectConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [conversations, setConversations] = useState<ConversationResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwt");

        if (!token) {
          console.log("No JWT token found, user not logged in");
          setLoading(false);
          return;
        }

        const response = await getConversations();
        console.log("Conversations response:", response);

        // Assuming the API returns data in response.result or response.data
        const conversationsData = response.result || response.data || response;
        console.log("Conversations data:", conversationsData);

        if (conversationsData && conversationsData.length > 0) {
          console.log(
            "First conversation modifiedAt:",
            conversationsData[0].modifiedAt
          );
          console.log(
            "Type of modifiedAt:",
            typeof conversationsData[0].modifiedAt
          );
        }

        setConversations(
          Array.isArray(conversationsData) ? conversationsData : []
        );

        // Select first conversation if available
        if (conversationsData && conversationsData.length > 0) {
          setSelectedId(conversationsData[0].id);
          onSelectConversation?.(conversationsData[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [onSelectConversation]);

  // Helper function to get conversation display name
  const getConversationName = (conversation: ConversationResponse): string => {
    if (conversation.conversationName) {
      return conversation.conversationName;
    }

    // For direct conversations, show the other participant's name
    if (
      conversation.type === "direct" &&
      conversation.participants.length > 0
    ) {
      const otherParticipant = conversation.participants[0];
      return (
        `${otherParticipant.firstName} ${otherParticipant.lastName}`.trim() ||
        otherParticipant.username
      );
    }

    return "Cuộc trò chuyện";
  };

  // Helper function to get conversation avatar
  const getConversationAvatar = (
    conversation: ConversationResponse
  ): string => {
    if (conversation.conversationAvatar) {
      return conversation.conversationAvatar;
    }

    // For direct conversations, show the other participant's avatar
    if (
      conversation.type === "direct" &&
      conversation.participants.length > 0
    ) {
      return conversation.participants[0].avatarUrl || "/default-avatar.png";
    }

    return "/default-group-avatar.png";
  };

  // Helper function to format time
  const formatTime = (dateString: string): string => {
    try {
      if (!dateString) return "N/A";

      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn("Invalid date string:", dateString);
        return "N/A";
      }

      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMinutes < 1) return "Vừa xong";
      if (diffInMinutes < 60) return `${diffInMinutes}m`;
      if (diffInHours < 24) return `${diffInHours}h`;
      if (diffInDays < 30) return `${diffInDays}d`;

      // For older dates, show actual date
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting time:", error, "for date:", dateString);
      return "N/A";
    }
  };

  const filteredConversations = conversations.filter((conversation) =>
    getConversationName(conversation)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSelectConversation = (conversation: ConversationResponse) => {
    setSelectedId(conversation.id);
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
          {loading ? (
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
                <button
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`w-full p-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    selectedId === conversation.id
                      ? "bg-blue-50 border-r-2 border-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={getConversationAvatar(conversation)}
                        alt={getConversationName(conversation)}
                      />
                      {conversation.type === "group" && (
                        <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-blue-500 ring-2 ring-white">
                          <svg
                            className="h-2 w-2 text-white mx-auto mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium truncate ${
                            selectedId === conversation.id
                              ? "text-blue-900"
                              : "text-gray-900"
                          }`}
                        >
                          {getConversationName(conversation)}
                        </p>
                        <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatTime(
                            conversation.modifiedAt ||
                              conversation.createdAt ||
                              new Date().toISOString()
                          )}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.type === "DIRECT"
                            ? "Cuộc trò chuyện riêng tư"
                            : "Cuộc trò chuyện nhóm"}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
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
