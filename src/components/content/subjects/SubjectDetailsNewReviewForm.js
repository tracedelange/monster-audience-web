import React, { useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import { TextField } from '@mui/material'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { color } from '@mui/system';
import { postReview } from '../../../requests';
import { useDispatch } from 'react-redux';
import { addReviewToFeed } from '../../../actions/feed'


const SubjectDetailsNewReviewForm = ({ subjectId, feedIndex, closeForm, appendReview }) => {

    const dispatch = useDispatch()

    const [newReviewObject, setNewReviewObject] = useState({
        rating: 0,
        content: '',
        subject_id: subjectId
    })

    const handleReviewSubmission = (e) => {
        e.preventDefault()
        // console.log(newReviewObject)
        // console.log()
        postReview(newReviewObject)
            .then(data => {
                if (data.errors) {
                    console.log("We've got a problem!")
                    console.log(data.errors)
                } else {
                    appendReview(data)
                }
            })

    }

    const handleInputChange = (e) => {
        setNewReviewObject({
            ...newReviewObject,
            [e.target.name]: e.target.value
        })
    }

    return (

        <>
            < Divider />
            <form onSubmit={handleReviewSubmission}>
                <li className='subject-details-new-review' >
                    <div className='subject-details-infoBox'>

                        <h2 className='rating'>{(newReviewObject.rating)}/10</h2>
                        <Rating sx={{ fontSize: '1vw', }} name="rating" value={newReviewObject.rating} max={10} onChange={handleInputChange} />

                        {/* <Typography sx={{ paddingTop: "2%" }}>Rated {review_age}, by {data.username}</Typography> */}
                    </div>
                    <Divider orientation='vertical' flexItem variant='middle' />
                    <div className='contentBox'>
                        <div className='internal-content-box'>
                            <TextField
                                sx={{
                                    width: '80%',
                                    left: "5%",
                                }}
                                InputProps={{sx:{marginTop: '2%', marginBottom:'2%'}}}
                                name='content'
                                multiline
                                rows={3}
                                value={newReviewObject.content}
                                onChange={handleInputChange}
                            />
                            <Button variant='contained' color='primary'
                                type='submit'
                                disabled={newReviewObject.content === '' ? true : false}
                                sx={{
                                    color: 'white',
                                    width: '10%',
                                    right: '2%',
                                    fontSize: '1.5vmin'
                                }}>
                                Review
                            </Button>
                        </div>
                        {/* <Typography>{data.content}</Typography> */}
                    </div>
                </li>
            </form>
                    <Divider />
        </>

    )
}

export default SubjectDetailsNewReviewForm
