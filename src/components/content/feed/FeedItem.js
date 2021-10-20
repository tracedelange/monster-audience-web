import React, {useState, useEffect} from 'react'
import { Box } from '@mui/system'
import { Paper, Typography } from '@mui/material'
import ReviewItem from './ReviewItem'
import { Divider } from '@mui/material'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import AddBoxIcon from '@mui/icons-material/AddBox';
import NewReviewForm from './NewReviewForm'
import {useHistory} from 'react-router-dom'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const FeedItem = ({ data, feedIndex, user, base }) => {

    const reviewArray = data.reviews.map((item) => {
        if (item) {

            return <ReviewItem base={base} feedIndex={feedIndex} user={user} timeAgo={timeAgo} key={item.id} data={item} />
        }
    })

    
    const now = new Date()
    const dif = now.getTime() - Date.parse(data.created_at)
    const subject_age = timeAgo.format(now.getTime() - dif)
    
    const [newReviewOpen, setNewReviewOpen] = useState(false)
    const handleAddReviewClick = (e, subject) => {
        setNewReviewOpen(!newReviewOpen)
    }

    const history = useHistory();

    const handleUsernameClick = () => {
        history.push(`${base}/users/${data.user_id}`)
    }
    
    const handleSubjectTitleClick = () => {
        history.push(`${base}/subjects/${data.id}`)
    }

    return (
        <li className='feed-item'>
            <Box
                className='feed-item-paper'
                sx={{
                    marginTop: '1%',
                    height: 'fit-content',
                    border: '2px solid #1481BA',
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
                            <Typography variant='h3' sx={{cursor: 'pointer'}} onClick={handleSubjectTitleClick}>{data.name}</Typography>
                            <Typography variant='subheader'>{data.description}</Typography>
                        </div>
                    </div>
                    <Divider orientation='vertical' flexItem />
                    <div className='subject-content-right'>
                        <Typography onClick={handleUsernameClick} sx={{'&:hover': {cursor: 'pointer'}}}>Posted {subject_age}, by {data.username} </Typography>
                        <Typography>{data.reviews.length} Review(s)</Typography>
                        <Typography>Average Rating: {parseFloat(data.avg_rating) ? (parseFloat(data.avg_rating).toFixed(1))+"/10" : "N/A" }</Typography>

                    </div>
                </Box>
                <ul className='review-item-list'>
                    {newReviewOpen ? <NewReviewForm feedIndex={feedIndex} closeForm={()=>{setNewReviewOpen(false)}} subjectId={data.id}/> : null}
                    {/* <NewReviewForm open={newReviewOpen} feedIndex={feedIndex} subjectId={data.id}/> */}
                    {reviewArray}
                </ul>


            </Box>
        </li>
    )
}

export default FeedItem
