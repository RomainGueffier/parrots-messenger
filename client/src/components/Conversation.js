import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversation() {

    const [text, setText] = useState('')
    const { sendMessage, selectedConversation } = useConversations()
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        sendMessage(
            selectedConversation.recipients.map(recipient => recipient.id),
            text
        )
        setText('')
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end">
                    { selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={ lastMessage ? setRef : null }
                                key={index}
                                className={`my-2 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div
                                    className={`rounded px-2 py-1 shadow-sm ${message.fromMe ? 'bg-success text-light' : 'bg-white'}`}
                                >
                                    {message.text}
                                </div>
                                { !message.fromMe && (
                                    <div className="text-muted small">
                                        {message.senderName}
                                    </div>
                                    )
                                }
                            </div>
                        )
                    }) }
                </div>
            </div>
            <Form className="my-3" onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            className="shadow-sm"
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value)}
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
