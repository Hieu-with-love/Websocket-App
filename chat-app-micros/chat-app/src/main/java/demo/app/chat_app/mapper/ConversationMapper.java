package demo.app.chat_app.mapper;

import demo.app.chat_app.dto.response.ConversationResponse;
import demo.app.chat_app.model.Conversation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConversationMapper {
    ConversationResponse toResponse(Conversation conversation);
}
