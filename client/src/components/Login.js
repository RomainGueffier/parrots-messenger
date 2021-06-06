import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrow } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuid } from 'uuid'

export default function Login({ onIdSubmit }) {

    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        onIdSubmit(idRef.current.value)
    }

    function createNewId() {
        onIdSubmit(uuid())
    }

    return (
        <Container className="align-items-center d-flex vh-100" >
            <Form onSubmit={handleSubmit} className="w-100 text-center">
                <FontAwesomeIcon icon={faCrow} size="4x" />
                <h1 className="mb-5">Parrots</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Ton identifiant :</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" className="me-2">Connexion</Button>
                <Button onClick={createNewId} variant="secondary">Inscription</Button>
            </Form>
        </Container>
    )
}