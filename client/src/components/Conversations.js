import React from 'react'
import { ListGroup } from 'react-bootstrap-v5'
import { useConversations } from '../contexts/ConversationsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons'

export default function Conversations({ setToggleSidebar }) {

    const { conversations, selectConversationIndex } = useConversations()

    function selectConversation({index}) {
        selectConversationIndex(index)
        // hide sidebar to show conversation itself
        setToggleSidebar(0)
    }

    return (
        <ListGroup variant="flush">
            { conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => selectConversation({index})}
                    active={conversation.selected}
                    className="d-flex align-items-center"
                    >
                    { conversation.recipients.length > 1 ? (
                        <FontAwesomeIcon icon={faUsers} size="2x" fixedWidth/>
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} size="2x" fixedWidth/>
                    ) }
                    <span className="ms-2">
                        {conversation.recipients.map(recipient => recipient.name).join(', ')}
                    </span>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
