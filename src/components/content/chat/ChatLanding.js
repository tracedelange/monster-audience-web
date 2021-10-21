import React, { useEffect, useState } from 'react'
import { getConversations } from '../../../requests'
import ConversationListItem from './ConversationListItem'
import { useSelector } from 'react-redux'
import ConversationPage from './ConversationPage'

const ChatLanding = () => {

    const [conversations, setConversations] = useState([])
    const [conversationsArray, setConversationsArray] = useState([])
    const [conversationsLoaded, setConversationsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.currentUser.user)

    const [chosenConversation, setChosenConversation] = useState(null)

    const handleConvoClick = (convoId) => {
        setChosenConversation(convoId)
    }


    useEffect(() => {

        getConversations()
            .then(data => {
                console.log(data)
                if (data) {
                    let array = data.map(item => <ConversationListItem handleConversationClick={handleConvoClick} user={currentUser} key={item.id} data={item} />)
                    setConversationsArray(array)
                    setConversationsLoaded(true)
                }
            })

    }, [])

    return (
        <div>
            {chosenConversation ?
                <ConversationPage handleBack={() => setChosenConversation(null)} conversationId={chosenConversation} />
                :

                conversationsLoaded ?
                    <ul>
                        {conversationsArray}
                    </ul>
                    :
                    "Loading..."
            }
        </div >
    )
}

export default ChatLanding
