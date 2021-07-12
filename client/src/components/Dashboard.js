import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useConversations } from '../contexts/ConversationsProvider'
import Conversation from './Conversation'

export default function Dashboard({ id }) {

    const [toggleSidebar, setToggleSidebar] = useState(0)
    const { selectedConversation } = useConversations()

    return toggleSidebar ?  (
            <Sidebar id={id} setToggleSidebar={setToggleSidebar}/>
        ) : (
        <div className="d-flex flex-column vh-100">
            { selectedConversation && <Conversation setToggleSidebar={setToggleSidebar}/> }
        </div>
    )
}
