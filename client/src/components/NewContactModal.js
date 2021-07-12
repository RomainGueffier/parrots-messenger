import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap-v5'
import { useContacts } from '../contexts/ContactsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

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
            <Modal.Header closeButton>
                <FontAwesomeIcon icon={faAddressBook} size="2x" className="text-success"/>
                Créer un contact
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Identifiant</Form.Label>
                        <Form.Control type="text" ref={idRef} required></Form.Control>
                        <Form.Text className="text-muted">
                            La personne que tu souhaites ajouter doit te partager son identifiant.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du contact</Form.Label>
                        <Form.Control type="text" ref={nameRef} required></Form.Control>
                        <Form.Text className="text-muted">
                            Choisi le nom de ce contact.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
        </>
    )
}
