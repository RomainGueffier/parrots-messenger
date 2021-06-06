import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { isSame } from '../library/Arrays'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {

    // default value is a empty array []
    const [conversations, setConversations] = useLocalStorage('conversations', [])
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts()
    const socket = useSocket()

    // add contact without replace all previous ones
    function createConversation(recipients) {
        setConversations(previousConversations => {
            return [...previousConversations, { recipients, messages: [] }]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(previousConversations => {
            let madeChange = false
            const newMessage = { sender, text }
            const newConversation = previousConversations.map(conversation => {
                if (isSame(conversation.recipients, recipients)) {
                    madeChange = true
                    return {
                        ...conversation, 
                        messages: [...conversation.messages, newMessage]
                    }
                }

                return conversation
            })

            if (madeChange) {
                return newConversation
            } else {
                return [...previousConversations, {
                    recipients, messages: [newMessage]
                }]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket === undefined) return

        socket.on('receive-message', addMessageToConversation)
        
        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text })

        addMessageToConversation({ recipients, text, sender: id })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return { id: recipient, name: name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}