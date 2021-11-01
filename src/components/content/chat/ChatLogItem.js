import React from 'react'
import { Typography } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'

// TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const ChatLogItem = ({ data, currentUser, age }) => {

    const now = new Date()
    const dif = now.getTime() - Date.parse(data.created_at)
    const message_age = timeAgo.format(now.getTime() - dif)

    return (

        <li className={data.author.id === currentUser.id ? 'chat-item-sent' : 'chat-item-received'} >
            <div className='message-container'>
                <Tooltip title={message_age} enterDelay={1000} placement={data.author.id === currentUser.id ? 'left' : 'right'}>
                    <div className='message-object'>
                        <Box sx={data.author.id === currentUser.id ?
                            { minWidth: '10px', backgroundColor: '#1481BA', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }
                            :
                            { minWidth: '10px', backgroundColor: '#e3f9ff', borderTopLeftRadius: '10px' }
                        }
                        />
                        <Typography sx={{ fontSize: 20, minWidth: 'fit-content', maxWidth: '100%', padding: '10px' }} variant='p'> {data.content}</Typography>
                        <Box sx={data.author.id === currentUser.id ?
                            { minWidth: '10px', backgroundColor: '#1481BA', borderTopRightRadius: '10px', borderBottomRightRadius: '0px' }
                            :
                            { minWidth: '10px', backgroundColor: '#e3f9ff', borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }
                        }
                        />
                    </div>
                </Tooltip>
                <p className='message-age'>{age ? message_age : null}</p>

            </div>
        </li>
    )
}

export default ChatLogItem
