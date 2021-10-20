import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'
import { ActionCableProvider, ActionCable } from 'react-actioncable-provider'
import Cable from './Cables';

const ChatPage = () => {

    const [messageState, setMessageState] = useState({
        conversations: [],
        activeConversation: null
    })

    const [conv, setConv] = useState()


    useEffect(() => {
        fetch(`http://localhost:3001/conversations`)
            .then(res => res.json())
            .then(conversations => setConv({ conversations }));
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()


    }

    const currentUser = useSelector(state => state.session.currentUser.user)

    const [newMessage, setNewMessage] = useState({
        recipient_id: null,
        sender_id: currentUser.id,
        content: ''
    })

    const handleFormChange = (e) => {

        setNewMessage({
            ...newMessage,
            [e.target.id]: e.target.value
        })
    }

    const handleReceivedConversation = response => {
        const { conversation } = response;
        setMessageState({
            conversations: [...this.state.conversations, conversation]
        });
    };

    const handleReceivedMessage = response => {
        const { message } = response;
        const conversations = [...messageState.conversations];
        const conversation = conversations.find(
            conversation => conversation.id === message.conversation_id
        );
        conversation.messages = [...conversation.messages, message];
        setConv({ conversations });
    };



    return (
        <ActionCableProvider url={'ws://localhost:3001/cable'}>
            <div className="conversationsList">
                <ActionCable
                    channel={{ channel: 'ConversationsChannel' }}
                    onReceived={handleReceivedConversation}
                />
                {messageState.conversations.length ? (
                    <Cable
                        conversations={conv}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                ) : null}
                <h2>Conversations</h2>
                {/* <ul>{mapConversations(conversations, this.handleClick)}</ul>
                <NewConversationForm />
                {activeConversation ? (
                    <MessagesArea
                        conversation={findActiveConversation(
                            conversations,
                            activeConversation
                        )}
                    />
                ) : null} */}
            </div>






            <div className='chatbox-container'>
                <form onSubmit={handleFormSubmit} onChange={handleFormChange} className='chatbox'>

                    <TextField value={newMessage.recipient_id} type='number' label='Recipient ID' id='recipient_id'></TextField>
                    <TextField value={newMessage.content} type='text' rows={4} multiline label='Message' id='content'></TextField>
                    <Button variant='contained' type='submit'>Send Message</Button>


                </form>

            </div>
        </ActionCableProvider>
    )
}

export default ChatPage
