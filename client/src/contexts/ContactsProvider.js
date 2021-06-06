import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {

    // default value is a empty array []
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    // add contact without replace all previous ones
    function createContact(id, name) {
        setContacts(previousContacts => {
            return [...previousContacts, {id, name}]
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}
