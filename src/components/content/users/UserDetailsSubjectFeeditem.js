import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import UserDetailsReviewFeedItem from './UserDetailsReviewFeedItem'
import { Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'


const UserDetailsSubjectFeeditem = ({ data, timeAgo, base }) => {
    
    const [reviewData, setReviewData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [reviewArray, setReviewArray] = useState([])
    const [subjectAge, setSubjectAge] = useState(0)
    
    
    const history = useHistory();
    
    useEffect(() => {
        // console.log(data)
        if (data.name) { //source is a subject
            setReviewData([...data.reviews])
            setSubjectData(data)
            setSubjectAge(data.created_at)
        } else { //source is a review
            setReviewData(data)
            setSubjectData(data.subject)
            setSubjectAge(data.subject.created_at)
        }
        
    }, [])
    
    useEffect(() => {
        if (Array.isArray(reviewData)) {
            setReviewArray(reviewData.map(item => <UserDetailsReviewFeedItem base={base} timeAgo={timeAgo}  key={item.id} data={item} />))
        } else {
            setReviewArray([<UserDetailsReviewFeedItem key={reviewData.id} base={base} timeAgo={timeAgo} data={reviewData} />])
        }
    }, [reviewData])

    const handleUsernameClick = () => {
        history.push(`${base}/users/${subjectData.user_id}`)
    }
    const handleSubjectClick = () => {
        history.push(`${base}/subjects/${subjectData.id}`)
    }
    
    const created_at = Date.parse(subjectAge)
    const now = new Date()
    const dif = now.getTime() - created_at

    const subject_age = timeAgo.format(now.getTime() - dif)

    return (
        <li className='user-details-feed-item'>
            <Box className='user-details-feed-subject-container' sx={{
                transition: "all .4s ease-in",
                "&:hover": {
                    backgroundColor: '#B3EAF9',
                    cursor: 'default',
                },
            }}>
                <div className='user-details-subject-content-left'>
                    <Typography variant='h3' sx={{cursor:'pointer'}} onClick={handleSubjectClick} >{subjectData.name}</Typography>
                    <Typography variant='subheader'>{subjectData.description}</Typography>
                </div>
                <Divider orientation='vertical' flexItem />
                <div className='user-details-subject-content-right'>
                    <Typography sx={{cursor:'pointer'}} onClick={handleUsernameClick} variant='subheader'>Posted {subject_age}, by {subjectData.username}</Typography>
                    <Typography variant='subheader'>Average Rating: {parseFloat(subjectData.avg_rating).toFixed(2)}</Typography>
                </div>
            </Box>
            <Divider />
            <ul className='user-details-feed-review-container'>
                {reviewArray}
            </ul>
        </li>
    )
}

export default UserDetailsSubjectFeeditem
