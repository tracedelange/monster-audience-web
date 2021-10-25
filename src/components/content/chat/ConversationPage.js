import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import Cable from 'actioncable'
import { loadChatLogs } from '../../../requests'
import { TextField } from '@mui/material'
import ChatLogItem from './ChatLogItem'

const ConversationPage = ({ handleBack, conversationId, currentUser }) => {


    const [chatLogs, setChatLogs] = useState([])
    const [chatLogsArray, setChatLogsArray] = useState([])
    const [socket, setSocket] = useState({})
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (!connected) {
            createSocket();
            loadChatLogs(conversationId)
                .then(data => {
                    setChatLogs(data)
                })
        }
    }, [connected])

    useEffect(() => {
        if (chatLogs) {
            let array = chatLogs.map((item) => <ChatLogItem key={item.id} data={item} currentUser={currentUser} /> )
            setChatLogsArray(array)
        }
    }, [chatLogs])


    const submitMessage = (e) => {
        e.preventDefault()
        socket.create(message)
        setMessage('')

    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const createSocket = () => {

        let cable = Cable.createConsumer('ws://localhost:3001/cable');
        const chatsConnection = cable.subscriptions.create({
            channel: 'ChatChannel',
            id: conversationId,
            user_id: currentUser.id
        }, {
            connected: () => {
                
            },
            received: async (data) => {
                const resp = await JSON.parse(data);
                setChatLogs([...resp.chat_messages])
            },
            create: function (chatContent) {
                chatsConnection.perform('create', {
                    content: chatContent
                });
            }
        });

        setSocket(chatsConnection)
        setConnected(true)
    }


    return (
        <div className='conversation-container'>

            <Button sx={{color:'white'}} variant='contained' onClick={handleBack}>Conversations</Button>


            <ul className='chat-logs'>
                {chatLogsArray}
            </ul>
            <form className='new-message-form'>
                <TextField
                    type='text'
                    label='Message...'
                    value={message}
                    fullWidth
                    // multiline
                    // rows={1}
                    onChange={handleInputChange}
                    className='chat-input' />

                <Button
                sx={{color:'white'}}
                variant='contained'
                className='send'
                type='submit'
                onClick={submitMessage}>
                    Send
                </Button>
            </form>

        </div>
    )
}

export default ConversationPage
