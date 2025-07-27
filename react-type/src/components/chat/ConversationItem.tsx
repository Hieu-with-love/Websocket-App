import React from "react";
import type { ConversationResponse } from "../../types/chat";
import avatar from "../../../public/photo-1728577740843-5f29c7586afe.avif";

interface ConversationItemProps {
  conversation: ConversationResponse;
  isSelected: boolean;
  onSelect: (conversation: ConversationResponse) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onSelect,
}) => {
  // Helper function to get conversation display name
  const getConversationName = (): string => {
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
  const getConversationAvatar = (): string => {
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

  return (
    <button
      onClick={() => onSelect(conversation)}
      className={`w-full p-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
        isSelected ? "bg-blue-50 border-r-2 border-blue-500" : ""
      }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            className="h-12 w-12 rounded-full"
            src={avatar}
            // src={getConversationAvatar()}
            alt={getConversationName()}
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
                isSelected ? "text-blue-900" : "text-gray-900"
              }`}
            >
              {getConversationName()}
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
  );
};

export default ConversationItem;
