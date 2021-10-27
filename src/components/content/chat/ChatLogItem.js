import React from 'react'
import { Typography } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import { Tooltip } from '@mui/material'


// TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const ChatLogItem = ({ data, currentUser, age }) => {

    const now = new Date()
    const dif = now.getTime() - Date.parse(data.created_at)
    const message_age = timeAgo.format(now.getTime() - dif)

    return (

        <li className={data.author.id == currentUser.id ? 'chat-item-sent' : 'chat-item-received'} >
            <div className='message-container'>
                <Tooltip title={message_age} enterDelay={1000} placement={data.author.id == currentUser.id ? 'left' : 'right'}>
                    <Typography sx={{ fontSize: 20, minWidth: 'fit-content', maxWidth: '100%', padding: '10px' }} variant='p'> {data.content} </Typography>
                </Tooltip>
                <p className='message-age'>{age ? message_age : null}</p>

            </div>
        </li>
    )
}

export default ChatLogItem
