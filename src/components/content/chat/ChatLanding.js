import React, { useEffect, useState } from 'react'
import ConversationListItem from './ConversationListItem'
import { useSelector } from 'react-redux'
import ConversationPage from './ConversationPage'
import { Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import NewChatForm from './NewChatForm'
import { getFriendsList, submitNewChat, getConversations } from '../../../requests'


const ChatLanding = () => {


    const [conversationsArray, setConversationsArray] = useState([])
    const [conversationsLoaded, setConversationsLoaded] = useState(false)
    const currentUser = useSelector(state => state.session.currentUser.user)

    const [friendsList, setFriendsList] = useState([])

    const [newChatFormOpen, setNewChatFormOpen] = useState(false)

    const [chosenConversation, setChosenConversation] = useState(null)

    const handleConvoClick = (convoData) => {
        setChosenConversation(convoData)
    }

    const handleChatSubmit = (recipient) => {
        newChatFormClose()
        submitNewChat(recipient.id)
        .then((data)=>{
            if (data){
                setChosenConversation(data)
                // setConversationsArray([...conversationsArray, <ConversationListItem handleConversationClick={handleConvoClick} user={currentUser} key={data.id} data={data} />])
            }
        })
    }

    useEffect(() => {

        getConversations()
            .then(data => {
                if (data) {
                    let array = data.map(item => <ConversationListItem handleConversationClick={handleConvoClick} user={currentUser} key={item.id} data={item} />)
                    setConversationsArray(array)
                    setConversationsLoaded(true)
                }
            })
            getFriendsList()
            .then(data => {
                if (data){
                    setFriendsList(data)
            }
        })

    }, [])

    const newChatFormClose = () => {
        setNewChatFormOpen(false)
    }

    return (
        <div>

            {chosenConversation ?
                <ConversationPage currentUser={currentUser} handleBack={() => setChosenConversation(null)} conversationData={chosenConversation} />
                :
                conversationsLoaded ?
                    <>
                        <div className='messages-header-container'>
                            <Typography variant='h3'>User Messages</Typography>
                            <AddBoxIcon onClick={() => { setNewChatFormOpen(!newChatFormOpen) }} />
                            <NewChatForm friendsList={friendsList} handleSubmitChat={handleChatSubmit} currentUser={currentUser} handleClose={newChatFormClose} open={newChatFormOpen} />
                        </div>
                        <ul className='conversation-list'>
                            {conversationsArray}
                        </ul>
                    </>
                    :
                    null
            }
        </div >
    )
}

export default ChatLanding
