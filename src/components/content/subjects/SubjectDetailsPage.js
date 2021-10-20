import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getSpecificSubject } from '../../../requests'
import ReviewItem from '../feed/FeedItem'
import TimeAgo from 'javascript-time-ago'
import { useSelector } from 'react-redux'
import SubjectReview from './SubjectReview'
import { Box } from '@mui/system'
import { Divider, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import SubjectDetailsNewReviewForm from './SubjectDetailsNewReviewForm'
import UserDetailsReviewFeedItem from '../users/UserDetailsReviewFeedItem'
import { useHistory } from 'react-router'

const timeAgo = new TimeAgo('en-US')

const SubjectDetailsPage = ({ base }) => {

    const { id } = useParams()

    const [subjectData, setSubjectData] = useState(null)
    const [reviewArray, setReviewArray] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)
    const [subjectAge, setSubjectAge] = useState()
    const [newReviewOpen, setNewReviewOpen] = useState(false)

    const history = useHistory()

    const user = useSelector(state => state.currentUser)

    useEffect(() => {
        getSpecificSubject(id)
            .then(response => {
                setSubjectData(response)
                setDataLoaded(true)
            })
    }, [])

    const handleNewReview = (data) => {

        let newReview = <UserDetailsReviewFeedItem timeAgo={timeAgo} data={data} />
        setReviewArray([newReview, ...reviewArray])
        setNewReviewOpen(false)


    }


    useEffect(() => {

        if (subjectData) {
            const reviewArray = subjectData.reviews.map((item) => {
                if (item) {
                    return <UserDetailsReviewFeedItem base={base} timeAgo={timeAgo} data={item} />
                }
            })
            setReviewArray(reviewArray)

            const created_at = Date.parse(subjectData.created_at)
            const now = new Date()
            const dif = now.getTime() - created_at
            const subject_age = timeAgo.format(now.getTime() - dif)
            setSubjectAge(subject_age)
        }

    }, [subjectData])

    const handleNewReviewClick = () => {
        setNewReviewOpen(!newReviewOpen)
    }

    const handleUsernameClick = () => {
        history.push(`${base}/users/${subjectData.user_id}`)
    }

    return (

        dataLoaded ?
            <div>
                <Box className='subject-details-container'>
                    <div className='subject-details-container-head'>
                        <div className='subject-details-container-first'>
                            <Typography variant='h3'>{subjectData.name}</Typography>
                            <Typography variant='subheader' sx={{width: '90%'}}>{subjectData.description}</Typography>
                        </div>
                        <Divider orientation='vertical' flexItem variant='middle' />
                        <div className='subject-details-container-last'>
                            <Typography variant='p' onClick={handleUsernameClick} sx={{ cursor: 'pointer' }} >Submitted {subjectAge} ago by {subjectData.username}</Typography>
                            <Typography variant='p'>{subjectData.reviews.length} Review(s)</Typography>
                            <Typography variant='p'>Average Rating: {subjectData.avg_rating ? parseFloat(subjectData.avg_rating).toFixed(2) : 0} / 10</Typography>

                        </div>
                        <div className='subject-details-container-second-last'>
                            <AddBoxIcon onClick={handleNewReviewClick} />
                        </div>
                    </div>
                    <ul className='subject-details-review-item-list'>
                        {newReviewOpen ? <SubjectDetailsNewReviewForm subjectId={subjectData.id} closeForm={() => { setNewReviewOpen(false) }} appendReview={handleNewReview} /> : null}
                        {reviewArray}
                    </ul>
                </Box>
            </div >
            :
            <>
                loading...
            </>

    )
}

export default SubjectDetailsPage
