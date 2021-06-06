import React from 'react'
import { ListGroup } from 'react-bootstrap-v5'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {

    const { conversations, selectConversationIndex } = useConversations()

    return (
        <ListGroup variant="flush">
            { conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                    data-bs-dismiss="offcanvas">
                    {conversation.recipients.map(recipient => recipient.name).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
