import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap-v5'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

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
            <Modal.Header closeButton>Créer une conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                    <Button variant="success" type="submit">
                        Discuter
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}
