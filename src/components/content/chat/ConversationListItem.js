import React from 'react'
import { Divider } from '@mui/material'

const ConversationListItem = ({ data, user, handleConversationClick }) => {

    return (
        <li className="conversation-list-item" onClick={() => handleConversationClick(data)}>
            <Divider />
            {data.recipient.id === user.id ?
                <>
                    <p>{data.user.username}</p>
                </>
                :
                <>
                    <p>{data.recipient.username}</p>
                </>
            }
        </li>
    )
}

export default ConversationListItem
