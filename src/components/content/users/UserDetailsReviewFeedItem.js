import React from 'react'
import { Divider } from '@mui/material'
import Typography from '@mui/material/Typography'

const UserDetailsReviewFeedItem = ({ data, timeAgo }) => {

    const created_at = Date.parse(data.created_at)
    const now = new Date()
    const dif = now.getTime() - created_at

    const review_age = timeAgo.format(now.getTime() - dif)

    return (
        <>
            <li className='user-details-review-item'>
                <div className='user-details-review-item-left'>
                    <div className='user-details-review-item-rating'>
                        <h2 className='rating'>
                            {data.rating}/10
                        </h2>
                    </div>
                    <div className='user-details-review-item-user'>
                        <Typography>
                            Rated {review_age}, by {data.username}
                        </Typography>
                    </div>
                </div>
                <Divider sx={{marginRight: '3%'}} orientation='vertical' flexItem variant='middle' />
                <div className='user-details-review-item-right'>
                    <Typography>
                        {data.content}
                    </Typography>
                </div>



            </li>
            <Divider />
        </>
    )
}

export default UserDetailsReviewFeedItem
