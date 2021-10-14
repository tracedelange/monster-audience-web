import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getSpecificUserFeed } from '../../../requests'
import UserDetailsReviewFeedItem from './UserDetailsReviewFeedItem'
import UserDetailsSubjectFeedItem from './UserDetailsSubjectFeeditem'
import TimeAgo from 'javascript-time-ago'
import { Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'
import { createFriendShip, destroyFriendShip } from '../../../requests'



const timeAgo = new TimeAgo('en-US')

const feed_sort = (a, b) => {
    return Date.parse(b.updated_at) - Date.parse(a.updated_at)
}


const UserDetailsPage = ({base}) => {

    const { id } = useParams()
    const [feed, setFeed] = useState()
    const [feedArray, setFeedArray] = useState([])
    const [page, setPage] = useState(0)
    const [userDetails, setUserDetails] = useState({
        created_at: 0
    })

    const [dataLoaded, setDataLoaded] = useState(false)
    const [following, setFollowing] = useState(false)


    //Make a backend call to get a user-specific feed including user data.
    useEffect(() => {
        getSpecificUserFeed(id)
            .then(resp => {
                if (resp) {
                    let feed = [
                        ...resp.reviews,
                        ...resp.subjects
                    ]
                    setFeed(feed.sort(feed_sort))

                    setUserDetails(resp.userDetails)
                    setFollowing(resp.userDetails.following)
                    setDataLoaded(true)
                }
            })
    }, [])




    useEffect(() => {
        if (feed) {
            setFeedArray(
                feed.map(item => <UserDetailsSubjectFeedItem base={base} timeAgo={timeAgo} key={item.key} data={item} userData={userDetails} />)
            )
        }
    }, [feed])

    const handleFriendshipClick = (e, user_id) => {
        switch (e.target.id) {
            case "follow":
                console.log('createFriendship')
                createFriendShip(user_id)
                    .then(resp => {
                        if (resp.following.id){
                            setFollowing(true)
                        }
                    })
                break
            case "unfollow":
                console.log('destroyFriendship')
                destroyFriendShip(user_id)
                    .then(resp => {
                        if (resp.ok){
                            setFollowing(false)
                        }
                    })
                break
        }
    }

    const created_at = Date.parse(userDetails.created_at)
    const now = new Date()
    const dif = now.getTime() - created_at
    const account_age = timeAgo.format(now.getTime() - dif)

    


    return (
        <>
            {dataLoaded ?
                <>
                    <div className='user-details-container'>
                        <div className='user-details-header'>
                            <Typography variant='h3' sx={{ fontWeight: 500, fontSize: '64px' }}>{userDetails.username}</Typography>
                            <Typography variant='subheader' sx={{ fontWeight: 500 }}>Joined {account_age}</Typography>
                        </div>
                        <Divider variant='middle' flexItem orientation='vertical' />
                        <div className='user-details-stats'>
                            <Typography variant='subheader'>{userDetails.social_counts.followers} Followers, Follows {userDetails.social_counts.following}</Typography>
                            <Typography variant='subheader'>{userDetails.social_counts.subjects} Subjects posted, {userDetails.social_counts.reviews} subjects reviewed</Typography>
                            <Typography variant='subheader'>{parseFloat(userDetails.social_counts.avg_rating).toFixed(2)} Average Rating</Typography>
                        </div>
                        <Button
                        variant='contained'
                        sx={{width: '10%'}}
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
                        sx={{ color: 'white' }}>
                        {
                            following ?
                                "Unfollow"
                                :
                                "Follow"
                        }
                    </Button>
                    </div>
                    <div className='user-details-feed-container'>
                        <ul className='user-details-feed-container-list'>
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
