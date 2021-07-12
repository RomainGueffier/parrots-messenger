import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button, Container } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useConversations } from '../contexts/ConversationsProvider'
import Navigation from './Navigation'

export default function Conversation({ setToggleSidebar }) {

    const [text, setText] = useState('')
    const { sendMessage, selectedConversation } = useConversations()
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        sendForm()
    }

    const handleEnterKey = e => {
        if (e.key === 'Enter' && text.length > 0) {
            e.preventDefault()
            sendForm()
        }
    }

    const sendForm = () => {
        sendMessage(
            selectedConversation.recipients.map(recipient => recipient.id),
            text
        )
        setText('')
    }

    return (
        <div className="conversation-wrapper d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto d-flex flex-column">

                <Navigation setToggleSidebar={setToggleSidebar}/>

                <Container className="d-flex flex-column align-items-start justify-content-end h-100">
                    { selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        const nextMessage = selectedConversation.messages[index+1]
                        const isNextMessageSameSender = nextMessage && nextMessage.sender === message.sender
                        return (
                            <div
                                ref={ lastMessage ? setRef : null }
                                key={index}
                                className={`message-wrapper my-2 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 shadow-sm ${message.fromMe ? 'bg-success text-light' : 'bg-white'}`}
                                >
                                    {message.text}
                                </div>
                                { !message.fromMe && !isNextMessageSameSender && (
                                    <div className="text-muted small">
                                        {message.senderName}
                                    </div>
                                    )
                                }
                            </div>
                        )
                    }) }
                </Container>
            </div>
            <Form className="m-2" onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            className="shadow-sm"
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyPress={handleEnterKey}
                        >
                        </Form.Control>
                        <Button type="submit" variant="success">
                            <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
