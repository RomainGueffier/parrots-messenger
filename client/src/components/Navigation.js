import React from 'react'
import { Button } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faUserCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Navigation({ setToggleSidebar }) {

    const { selectedConversation } = useConversations()

    return (
        <div className="conversation-nav sticky-top d-flex flex-row align-items-center 
                        justify-items-middle p-2 justify-content-between text-muted">
            <Button variant="muted" onClick={() => setToggleSidebar(true)}>
                <FontAwesomeIcon icon={faChevronLeft} className="text-muted" size="lg"/>
            </Button>
            <div>
                { selectedConversation.recipients.length > 1 ? (
                    <FontAwesomeIcon icon={faUsers} size="lg"/>
                    ) : (
                    <FontAwesomeIcon icon={faUserCircle} size="lg"/>
                )}
                <small> {selectedConversation.recipients.map(recipient => recipient.name).join(', ')}</small>
            </div>
        </div>
    )
}
