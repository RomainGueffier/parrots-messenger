import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap-v5'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'

export default function NewConversationModal({ closeModal }) {

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()

        createConversation(selectedContactIds)
        closeModal()
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(previousSelectedContactIds => {
            if (previousSelectedContactIds.includes(contactId)) {
                return previousSelectedContactIds.filter(previousId => {
                    return contactId !== previousId
                })
            } else {
                return [...previousSelectedContactIds, contactId]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>
                <FontAwesomeIcon icon={faComments} size="2x" className="text-success"/>
                Nouvelle discussion
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Liste des contacts</Form.Label>
                    {contacts.map(contact => (
                        <Form.Group className="mb-3" controlId={contact.id} key={contact.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}>

                            </Form.Check>
                        </Form.Group>
                    ))}
                    <Form.Text className="text-muted">
                        Coche plusieurs contacts pour créer une conversation de groupe
                    </Form.Text>
                    <Button variant="success" type="submit" className="d-block mt-3">
                        Commencer à discuter
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}
