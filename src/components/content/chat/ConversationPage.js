import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import Cable from 'actioncable'
import { loadChatLogs } from '../../../requests'

const ConversationPage = ({ handleBack, conversationId }) => {


    const [chatLogs, setChatLogs] = useState([])
    const [chatLogsArray, setChatLogsArray] = useState([])
    const [socket, setSocket] = useState({})
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState({
        content: ''
    })

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
            let array = chatLogs.map((item) => {
                return <li key={item.id}>{item.content}</li>
            })
            setChatLogsArray(array)
        }
    }, [chatLogs])


    const submitMessage = (e) => {
        e.preventDefault()
        socket.create(message)
        setMessage({content: ''})

    }

    const createSocket = () => {

        let cable = Cable.createConsumer('ws://localhost:3001/cable');
        const chatsConnection = cable.subscriptions.create({
            channel: 'ChatChannel',
            id: conversationId
        }, {
            connected: () => {
                console.log(`connected to channel ${conversationId}`)
            },
            received: async (data) => {
                const resp = await JSON.parse(data);
                console.log(resp)
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
        <div>
            <Button variant='contained' onClick={handleBack}>Conversations</Button>

            <ul className='chat-logs'>
                {chatLogsArray}
            </ul>
            <form>
                <input
                    type='text'
                    placeholder='Enter your message...'
                    value={message.content}
                    onChange={(e) => { setMessage(e.target.value) }}
                    className='chat-input' />
                <button className='send' type='submit' onClick={submitMessage}>
                    Send
                </button>
            </form>

        </div>
    )
}

export default ConversationPage
