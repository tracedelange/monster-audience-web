import React from 'react'


const ConversationListItem = ({ data, user, handleConversationClick }) => {

    return (
        <li className="conversation-list-item" onClick={() => handleConversationClick(data.id)}>
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
