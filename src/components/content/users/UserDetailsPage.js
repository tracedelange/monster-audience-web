import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getSpecificUserFeed } from '../../../requests'
import UserDetailsSubjectFeedItem from './UserDetailsSubjectFeeditem'
import TimeAgo from 'javascript-time-ago'
import { Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'
import { createFriendShip, destroyFriendShip } from '../../../requests'
import { useSelector, useDispatch } from 'react-redux'
import { setUserFeed, addNextUserPage } from '../../../actions/userFeeds'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom'

const timeAgo = new TimeAgo('en-US')

const feed_sort = (a, b) => {
    return Date.parse(b.updated_at) - Date.parse(a.updated_at)
}


const UserDetailsPage = () => {

    const { id } = useParams();
    // const [feed, setFeed] = useState();
    const [feedArray, setFeedArray] = useState([]);
    const history = useHistory();
    const [userDetails, setUserDetails] = useState({
        created_at: 0
    })

    const [dataLoaded, setDataLoaded] = useState(false)
    const [following, setFollowing] = useState(false)

    const dispatch = useDispatch();
    const base = useSelector(state => state.session.base)
    const feed = useSelector(state => state.userFeed.userFeed)
    const page = useSelector(state => state.userFeed.userPage)
    const loggedUser = useSelector(state => state.session.currentUser.user)




    //Make a backend call to get a user-specific feed including user data.
    useEffect(() => {
        getSpecificUserFeed(id)
            .then(resp => {
                if (resp) {
                    let feed = [
                        ...resp.reviews,
                        ...resp.subjects
                    ]
                    let sortedFeed = feed.sort(feed_sort)
                    dispatch(setUserFeed(sortedFeed))

                    setUserDetails(resp.userDetails)
                    setFollowing(resp.userDetails.following)
                    setDataLoaded(true)
                }
            })
    }, [id, dispatch])



    useEffect(() => {
        if (feed.length > 0) {
            let array = feed.map(item => <UserDetailsSubjectFeedItem timeAgo={timeAgo} key={uuidv4()} data={item} userData={userDetails} />)
            setFeedArray(array)
        }
    }, [feed, userDetails])

    const handleFriendshipClick = (e, user_id) => {
        switch (e.target.id) {
            case "follow":
                createFriendShip(user_id)
                    .then(resp => {
                        if (resp.following.id) {
                            setFollowing(true)
                        }
                    })
                break;
            case "unfollow":
                destroyFriendShip(user_id)
                    .then(resp => {
                        if (resp.ok) {
                            setFollowing(false)
                        }
                    })
                break;
            default:
                break;
        }
    }

    const created_at = Date.parse(userDetails.created_at)
    const now = new Date()
    const dif = now.getTime() - created_at
    const account_age = timeAgo.format(now.getTime() - dif)

    const handleReviewListScroll = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop === (e.target.clientHeight)) {
            let nextPage = page + 1
            getSpecificUserFeed(id, nextPage)
                .then(resp => {
                    if (resp.ok) {
                        let feed = [
                            ...resp.reviews,
                            ...resp.subjects
                        ]
                        let sortedFeed = feed.sort(feed_sort)
                        dispatch(addNextUserPage(sortedFeed))
                    }
                })
        }
    }


    return (
        <>
            {dataLoaded ?
                <>
                    <div className='user-details-container'>
                        <div className='user-details-header'>
                            <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '54px' }}>{userDetails.username}</Typography>
                            <Typography variant='subheader' sx={{ fontWeight: 500 }}>Joined {account_age}</Typography>

                            {
                                userDetails.id === loggedUser.id ?
                                    <Typography variant='subheader' sx={{ fontWeight: 500, opacity: '0.7' }}>You</Typography>
                                    :
                                    userDetails.follows ?
                                        <Typography variant='subheader' sx={{ fontWeight: 500, opacity: '0.7' }}>Follows you</Typography>
                                        :
                                        null
                            }

                        </div>
                        <Divider variant='middle' flexItem orientation='vertical' />
                        <div className='user-details-stats'>
                            <Typography variant='subheader'>{userDetails.social_counts.followers} Followers, Follows {userDetails.social_counts.following}</Typography>
                            <Typography variant='subheader'>{userDetails.social_counts.subjects} Subjects posted, {userDetails.social_counts.reviews} subjects reviewed</Typography>
                            <Typography variant='subheader'>{parseFloat(userDetails.social_counts.avg_rating).toFixed(2)} Average Rating</Typography>
                        </div>
                        {userDetails.id === loggedUser.id ?
                            <Button
                                onClick={() => { history.push(`${base}/profile`) }}
                                variant='contained'
                                sx={{ width: '20%', color: 'white' }}
                            >
                                Profile Details
                            </Button>
                            :
                            <Button
                                variant='contained'
                                sx={{ width: '10%', color: 'white' }}
                                onClick={((e) => { handleFriendshipClick(e, userDetails.id) })}
                                id={
                                    following ?
                                        "unfollow"
                                        :
                                        "follow"
                                }
                                color={
                                    following ?
                                        "secondary"
                                        :
                                        "primary"
                                }
                            >
                                {
                                    following ?
                                        "Unfollow"
                                        :
                                        "Follow"
                                }
                            </Button>
                        }

                    </div>
                    <div className='user-details-feed-container'>
                        <ul className='user-details-feed-container-list' onScroll={handleReviewListScroll}>
                            {feedArray}
                        </ul>
                    </div>
                </>
                :
                null
            }


        </>
    )
}

export default UserDetailsPage
