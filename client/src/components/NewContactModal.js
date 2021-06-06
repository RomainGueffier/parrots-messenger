import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap-v5'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {

    const idRef = useRef()
    const nameRef = useRef()
    const { createContact } = useContacts()

    function handleSubmit(e) {
        e.preventDefault()

        createContact(idRef.current.value, nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Créer un contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Identifiant</Form.Label>
                        <Form.Control type="text" ref={idRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du contact</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}
