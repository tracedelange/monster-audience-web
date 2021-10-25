import React from 'react'
import { Typography } from '@mui/material'
import { useHistory } from 'react-router'




const EmptyFeed = ({base}) => {


    const history = useHistory()



    return (
        <ul className='empty-feed'>
            <Typography variant='h2'>Your feed is empty!</Typography>
            <Typography>Suggestions: </Typography>
            <Typography className='empty-feed-link' onClick={()=>{history.push(`${base}/subjects`)}}>Review an existing subject</Typography>
            <Typography className='empty-feed-link' onClick={()=>{history.push(`${base}/subject/create`)}}>Create a Subject to review</Typography>
            <Typography className='empty-feed-link' onClick={()=>{history.push(`${base}/users`)}}>Find some users to follow</Typography>
        </ul>
    )
}

export default EmptyFeed
