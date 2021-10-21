import React from 'react'
import { Typography } from '@mui/material'

const ChatLogItem = ({data, currentUser}) => {
    console.log(data)
    return (
        <li className={data.author.id == currentUser.id ? 'chat-item-sent' : 'chat-item-received'} >

            <Typography sx={{fontSize: 20, maxWidth: '30%', padding:'10px', margin:'5px'}} variant='p'> {data.content} </Typography>

        </li>
    )
}

export default ChatLogItem
