import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'
import Cable from 'actioncable'
import CreateMessage from './CreateMessage'


const ChatPage = () => {



    
    const [connected, setConnected] = useState(false)
    const [socket, setSocket] = useState({})
    const [messageLog, setMessageLog] = useState([])
    
    useEffect(() => {
        if (!connected) {
            createSocket();
        }
    }, [connected])
    
    const [message, setMessage] = useState({
        content: ''
    })

    const submitMessage = (e) => {
        e.preventDefault()
        // console.log(message)
        socket.create(message)
    }

    // const createSocket = () => {
    //     let cable = Cable.createConsumer('ws://localhost:3001/cable');
    //     const chatConnection = cable.subscriptions.create({
    //         channel: 'ChatChannel'
    //     }, {
    //         connected: () => { },
    //         received: async (data) => {
    //             const resp = await JSON.parse(data);
    //             setChatLogs(resp.chat_messages)
    //             // setChatLogs(chatLogCopy);
    //         },
    //         create: (chatContent) => {
    //             chatConnection.perform('create', {
    //                 content: chatContent
    //             });
    //         }
    //     });
    //     setChats(chatConnection)
    //     setConnection(true);
    // }

    const createSocket = () => {

        let cable = Cable.createConsumer('ws://localhost:3001/cable');
        const chatsConnection = cable.subscriptions.create({
            channel: 'ChatChannel'
        }, {
            connected: () => {},
            received: async (data) => {
                const resp = await JSON.parse(data);
                // console.log(resp)
                setMessageLog(resp)
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

    console.log(messageLog)

    return (

        <>
            <div className="messageList">
                <h1>Chat</h1>
                <div className='chat-logs'>

                </div>
                <input
                    type='text'
                    placeholder='Enter your message...'
                    onChange={(e) => { setMessage(e.target.value) }}
                    className='chat-input' />
                <button className='send' type='submit' onClick={submitMessage}>
                    Send
                </button>


            </div>
            {/* <CreateMessage /> */}
        </>

    )
}

export default ChatPage


// const createSocket = (setSocket, messageLog, setMessageLog) => {

//     let cable = Cable.createConsumer('ws://localhost:3001/cable');
//     let chats = cable.subscriptions.create({
//         channel: 'ChatChannel'
//     }, {
//         connected: () => { },
//         received: (data) => {
//             console.log(data);
//             setMessageLog([...messageLog, data])
//         },
//         create: function (chatContent) {
//             this.perform('create', {
//                 content: chatContent
//             });
//         }
//     });

//     setSocket(chats)
// }

