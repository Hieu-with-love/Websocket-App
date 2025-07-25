package demo.app.chat_app.service.impl;

import demo.app.chat_app.dto.request.ConversationRequest;
import demo.app.chat_app.dto.response.ConversationResponse;
import demo.app.chat_app.mapper.ConversationMapper;
import demo.app.chat_app.repository.ConversationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ConversationService {
    ConversationRepository conversationRepo;
    ConversationMapper conversationMapper;

    public List<ConversationResponse> myConversations() {
        return null;
    }

    public ConversationResponse create(ConversationRequest request) {
        return null;
    }

    private String generateParticipantHash(List<String> ids) {
        StringJoiner stringJoiner = new StringJoiner("_");
        ids.forEach(stringJoiner::add);
        return stringJoiner.toString();
    }

//    private ConversationResponse toConversationResponse(Conversation conversation) {
//        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
//
//        ConversationResponse conversationResponse = conversationMapper.toConversationResponse(conversation);
//
//        conversation.getParticipants().stream()
//                .filter(participantInfo -> !participantInfo.getUserId().equals(currentUserId))
//                .findFirst().ifPresent(participantInfo -> {
//                    conversationResponse.setConversationName(participantInfo.getUsername());
//                    conversationResponse.setConversationAvatar(participantInfo.getAvatar());
//                });
//
//        return conversationResponse;
//    }
}
