import React from 'react'
import Sidebar from './Sidebar'
import { Container, Button } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUsers } from '@fortawesome/free-solid-svg-icons'
import { useConversations } from '../contexts/ConversationsProvider'
import Conversation from './Conversation'

export default function Dashboard({ id }) {

    const { selectedConversation } = useConversations()

    return (
        <>
            <Sidebar id={id} />
            <div className="sticky-top d-flex flex-row align-items-center justify-items-middle p-2 justify-content-between bg-dark text-muted">
                <Button variant="dark" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
                    <FontAwesomeIcon icon={faBars} className="text-muted" />
                </Button>
                <div>
                    <FontAwesomeIcon icon={faUsers} /> Conversation
                </div>
            </div>
            <Container className="d-flex vh-100">
                { selectedConversation && <Conversation /> }
            </Container>
        </>
    )
}
