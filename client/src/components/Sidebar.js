import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrow, faComments, faAddressBook, faUserPlus, faEdit, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACT_KEY = 'contacts'

export default function Sidebar({ id, setToggleSidebar }) {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalConversationOpen, setModalConversationOpen] = useState(false)
    const [modalContactOpen, setModalContactOpen] = useState(false)

    function closeModal() {
        setModalConversationOpen(false)
        setModalContactOpen(false)
    }

    return (
        <div className="d-flex flex-column bg-light text-success vh-100 p-3">
            <div className="d-flex flex-row">
                <h1 className="d-block flex-grow-1 mt-2 display-5">
                    <FontAwesomeIcon icon={faCrow} /> Parrots
                </h1>
                <Button 
                    onClick={() => setModalConversationOpen(true)}
                    variant="transparent"
                    className="text-success">
                    <FontAwesomeIcon icon={faEdit} size="lg"/>
                </Button>
                <Button 
                    onClick={() => setToggleSidebar(false)}
                    variant="transparent"
                    className="text-success">
                    <FontAwesomeIcon icon={faChevronRight} size="lg"/>
                </Button>
            </div>
            <div className="d-flex flex-column h-100">

                <small className="text-muted d-block my-2">Ton identifiant est : <u>{id}</u>. Partage le avec la personne avec qui tu veux discuter.</small>
                <Button 
                    onClick={() => window.localStorage.clear()}
                    variant="warning">
                    <FontAwesomeIcon icon={faTrash}/>
                    <small> Tout réinitialiser</small>
                </Button>

                <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                    
                    <Tab.Content className="overflow-auto flex-grow-1 bg-white my-3 rounded">
                        <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                            <Conversations setToggleSidebar={setToggleSidebar} />
                        </Tab.Pane>
                        <Tab.Pane eventKey={CONTACT_KEY}>
                            <Button onClick={() => setModalContactOpen(true)} variant="light" className="m-3">
                                <FontAwesomeIcon icon={faUserPlus} /> Ajouter un nouveau contact
                            </Button>
                            <Contacts />
                        </Tab.Pane>
                    </Tab.Content>

                    <Nav variant="pills" className="justify-content-center lead">
                        <Nav.Item>
                            <Nav.Link eventKey={CONVERSATIONS_KEY} className="text-dark">
                                <FontAwesomeIcon icon={faComments}/> Conversations
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={CONTACT_KEY} className="text-dark">
                                <FontAwesomeIcon icon={faAddressBook} /> Contacts
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                </Tab.Container>
                <Modal show={modalConversationOpen} onHide={closeModal}>
                    <NewConversationModal closeModal={closeModal} />
                </Modal>
                <Modal show={modalContactOpen} onHide={closeModal}>
                    <NewContactModal closeModal={closeModal} />
                </Modal>
            </div>
        </div>
    )
}
