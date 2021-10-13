import { Typography } from '@mui/material'
import React from 'react'
import { Divider } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useSelector } from 'react-redux';
import RemoveReviewConfirmation from './RemoveReviewConfirmation'


const ReviewItem = ({ data, timeAgo, user, feedIndex }) => {

    const now = new Date()
    const dif = now.getTime() - Date.parse(data.created_at)
    const review_age = timeAgo.format(now.getTime() - dif)


    return (
        <>
            <Divider />
            <li className='review-item'>
                <div className='infoBox'>
                    <h2 className='rating'>{(data.rating)}/10</h2>
                    <Typography sx={{ paddingTop: "2%" }}>Rated {review_age}, by {data.username}</Typography>
                </div>
                <Divider orientation='vertical' flexItem variant='middle' />
                <div className='contentBox'>
                    <Typography sx={{
                        width: '100%'
                    }}>{data.content}</Typography>
                    {data.user_id === user.id ?
                        <>
                            <RemoveReviewConfirmation feedIndex={feedIndex} data={data} />
                        </>
                        :
                        null
                    }
                </div>
            </li>
        </>
    )
}

export default ReviewItem
