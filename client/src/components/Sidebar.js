import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap-v5'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrow, faComments, faAddressBook,faTimes } from '@fortawesome/free-solid-svg-icons'
import Contacts from './Contacts'
import Conversations from './Conversations'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACT_KEY = 'contacts'

export default function Sidebar({ id }) {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)

    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className="offcanvas offcanvas-start bg-dark text-success" tabIndex="-1" id="sidebar" aria-labelledby="sidebarLabel" data-bs-scroll="true" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarLabel">
                    <FontAwesomeIcon icon={faCrow} /> Parrots
                </h5>
                <Button variant="dark" data-bs-dismiss="offcanvas" aria-label="Close">
                    <FontAwesomeIcon icon={faTimes} className="text-muted" />
                </Button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
                <small className="text-muted d-block mb-3">Ton identifiant est le <u>{id}</u></small>
                <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                    <Nav variant="pills" className="justify-content-center">
                        <Nav.Item>
                            <Nav.Link eventKey={CONVERSATIONS_KEY} className="text-light">
                                <FontAwesomeIcon icon={faComments} /> Conversations
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey={CONTACT_KEY} className="text-light">
                                <FontAwesomeIcon icon={faAddressBook} /> Contacts
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content className="overflow-auto flex-grow-1 my-3 rounded">
                        <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                            <Conversations />
                        </Tab.Pane>
                        <Tab.Pane eventKey={CONTACT_KEY}>
                            <Contacts />
                        </Tab.Pane>
                    </Tab.Content>

                    <Button onClick={() => setModalOpen(true)} variant="success">
                        { activeKey === CONVERSATIONS_KEY ? (
                            <>
                                <FontAwesomeIcon icon={faComments} /> Nouvelle conversation
                            </>
                            ) : (
                            <>
                                <FontAwesomeIcon icon={faAddressBook} /> Nouveau contact
                            </>
                            )
                        }
                    </Button>

                    <Modal show={modalOpen} onHide={closeModal}>
                        { activeKey === CONVERSATIONS_KEY ?
                            <NewConversationModal closeModal={closeModal} /> 
                            : 
                            <NewContactModal closeModal={closeModal} />
                        }
                    </Modal>
                    
                </Tab.Container>
            </div>
        </div>
    )
}
