import { Typography } from '@mui/material'
import React from 'react'
import { Divider } from '@mui/material'
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json'

// TimeAgo.addDefaultLocale(en)
// const timeAgo = new TimeAgo('en-US')

const ReviewItem = ({ data, timeAgo }) => {

    const now = new Date()
    const dif = now.getTime() - Date.parse(data.created_at)
    const review_age = timeAgo.format(now.getTime() - dif)

    return (
        <>
            <Divider />
            <li className='review-item'>
                <div className='infoBox'>
                    <h2 className='rating'>{(data.rating) / 2}/5</h2>
                    <Typography sx={{ paddingTop: "2%" }}>Rated {review_age}, by {data.username}</Typography>
                </div>
                <Divider orientation='vertical' flexItem variant='middle'/>
                <div className='contentBox'>
                    <Typography>{data.content}</Typography>
                </div>
            </li>
        </>
    )
}

export default ReviewItem
