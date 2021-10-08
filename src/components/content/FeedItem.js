import React from 'react'
import { Box } from '@mui/system'
import { Paper, Typography } from '@mui/material'
import ReviewItem from './ReviewItem'
import { Divider } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import AddBoxIcon from '@mui/icons-material/AddBox';



TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const FeedItem = ({ data }) => {

    const reviewArray = data.reviews.map((item) => {
        if (item) {
            return <ReviewItem timeAgo={timeAgo} key={item.id} data={item} />
        }
    })

    const now = new Date()
    const dif = now.getTime() - Date.parse(data.created_at)
    const subject_age = timeAgo.format(now.getTime() - dif)

    const handleAddReviewClick = (e, subject) => {

        console.log(subject)


    }


    return (
        <li className='feed-item'>
            <Box
                className='feed-item-paper'
                sx={{
                    marginTop: '1%',
                    height: 'fit-content',
                    border: '3px solid #1481BA',
                    borderRadius: '4px'


                }}
            >
                <Box className='subject-content' sx={{
                    transition: "all .4s ease-in",
                    "&:hover": {
                        backgroundColor: '#B3EAF9',
                        cursor: 'default',
                    },
                }}>
                    <div className='subject-content-left'>
                        <div className='add-review-container'>
                            <AddBoxIcon
                            onClick={(e)=>{handleAddReviewClick(e, data)}}
                            sx={{
                                fontSize: "2vw",
                                marginLeft: '15%',
                                "&:hover": {
                                    opacity: '0.7',
                                    cursor: 'pointer',
                                }
                        }} />
                        </div>
                        <div className='subject-title-container'>
                            <Typography variant='h3'>{data.name}</Typography>
                            <Typography variant='subheader'>{data.description}</Typography>
                        </div>
                    </div>
                    <Divider orientation='vertical' flexItem />
                    <div className='subject-content-right'>
                        <Typography>Posted {subject_age}, by {data.username} </Typography>
                        <Typography>{data.reviews.length} Review(s)</Typography>
                        <Typography>{(data.avg_rating) / 2}/5 Average</Typography>

                    </div>
                </Box>
                <ul className='review-item-list'>
                    {reviewArray}
                </ul>


            </Box>
        </li>
    )
}

export default FeedItem
