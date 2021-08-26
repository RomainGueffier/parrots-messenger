import React, { useState } from "react"
import Sidebar from "./Sidebar"
import { useConversations } from "../contexts/ConversationsProvider"
import Conversation from "./Conversation"

export default function Dashboard({ id }) {
  const [toggleSidebar, setToggleSidebar] = useState(0)
  const { selectedConversation } = useConversations()

  const sidebarVisibility = toggleSidebar ? "sidebar" : "sidebar sidebar-opened"

  return (
    <>
      <Sidebar
        id={id}
        setToggleSidebar={setToggleSidebar}
        sidebarVisibility={sidebarVisibility}
      />
      <div className="d-flex flex-column vh-100">
        {selectedConversation && (
          <Conversation setToggleSidebar={setToggleSidebar} />
        )}
      </div>
    </>
  )
}
