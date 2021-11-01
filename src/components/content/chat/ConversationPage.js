import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import Cable from 'actioncable'
import { loadChatLogs } from '../../../requests'
import { TextField } from '@mui/material'
import ChatLogItem from './ChatLogItem'
import { websocket } from '../../../globals'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setChatLogs, addMessage } from '../../../actions/chat'


const ConversationPage = ({ handleBack, conversationData, currentUser }) => {

    const [chatLogsArray, setChatLogsArray] = useState([])
    const [socket, setSocket] = useState({})
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState('')
    const base = useSelector(state => state.session.base)
    const chatLogs = useSelector(state => state.chatData.messages)

    const chatLogsBottom = useRef(null)

    const history = useHistory();
    const dispatch = useDispatch();

    // const createSocket = () => {

    //     let cable = Cable.createConsumer(websocket);
    //     const chatsConnection = cable.subscriptions.create({
    //         channel: 'ChatChannel',
    //         id: conversationData.id,
    //         user_id: currentUser.id
    //     }, {
    //         connected: () => {

    //         },
    //         received: async (data) => {
    //             const resp = await JSON.parse(data);
    //             dispatch(addMessage(resp))
    //         },
    //         create: function (chatContent) {
    //             chatsConnection.perform('create', {
    //                 content: chatContent
    //             });
    //         }
    //     });

    //     setSocket(chatsConnection)
    //     setConnected(true)
    // }


    useEffect(() => {

        const createSocket = () => {

            let cable = Cable.createConsumer(websocket);
            const chatsConnection = cable.subscriptions.create({
                channel: 'ChatChannel',
                id: conversationData.id,
                user_id: currentUser.id
            }, {
                connected: () => {
    
                },
                received: async (data) => {
                    const resp = await JSON.parse(data);
                    dispatch(addMessage(resp))
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

        if (!connected) {
            createSocket();
            loadChatLogs(conversationData.id)
                .then(data => {
                    setChatLogs(data)
                    dispatch(setChatLogs(data, conversationData.recipient))
                })
        }
    }, [connected, dispatch, conversationData, currentUser.id])

    useEffect(() => {
        if (chatLogs) {
            let array = chatLogs.map((item, index, array) => {
                if (array[index + 1]) {
                    if (array[index + 1].author.id === array[index].author.id) {
                        return <ChatLogItem age={false} key={item.id} data={item} currentUser={currentUser} />
                    } else {
                        return <ChatLogItem age={true} key={item.id} data={item} currentUser={currentUser} />
                    }
                } else {
                    return <ChatLogItem age={true} key={item.id} data={item} currentUser={currentUser} />
                }
            })
            setChatLogsArray(array)
        }
    }, [chatLogs, currentUser])

    useEffect(() => {

        chatLogsBottom.current.scrollIntoView({ behavior: 'smooth' });

    }, [chatLogsArray])

    const submitMessage = (e) => {
        e.preventDefault()
        socket.create(message)
        setMessage('')

    }

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const handleUsernameClick = () => {
        history.push(`${base}/users/${conversationData.recipient.id}`)
    }

    return (
        <div className='conversation-container'>

            <div className='conversation-header'>
                <div className='conversation-header-first'>
                    <Button sx={{ color: 'white' }} variant='contained' onClick={handleBack}>Conversations</Button>
                </div>
                <div className='conversation-header-second'>
                    <h3 className='conversation-header-h3' onClick={handleUsernameClick}>{conversationData.recipient.id === currentUser.id ? conversationData.user.username : conversationData.recipient.username}</h3>
                </div>
                <div className='conversation-header-third'>
                </div>
            </div>
            <ul className='chat-logs'>
                {chatLogsArray}
                <li ref={chatLogsBottom}></li>
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
                    sx={{ color: 'white' }}
                    variant='contained'
                    className='send'
                    type='submit'
                    disabled={message === '' ? true : false}
                    onClick={submitMessage}>
                    Send
                </Button>
            </form>

        </div>
    )
}

export default ConversationPage
