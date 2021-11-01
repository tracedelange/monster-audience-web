import React, {useState} from 'react'
import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { createFriendShip, destroyFriendShip } from '../../../requests'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'


const UserSearchResultItem = ({ data, timeAgo }) => {
    
    const history = useHistory();
    const base = useSelector(state => state.session.base)
    const handleUserClick = (e) => {
        history.push(`${base}/users/${data.id}`)
    }

    const created_at = Date.parse(data.created_at)
    const now = new Date()
    const dif = now.getTime() - created_at

    const account_age = timeAgo.format(now.getTime() - dif)

    const [following, setFollowing] = useState(data.following)


    const handleFriendshipClick = (e, user_id) => {
        switch (e.target.id) {
            case "follow":
                createFriendShip(user_id)
                    .then(resp => {
                        if (resp.following.id){
                            setFollowing(true)
                        }
                    })
                break;
            case "unfollow":
                destroyFriendShip(user_id)
                    .then(resp => {
                        if (resp.ok){
                            setFollowing(false)
                        }
                    })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <li className='search-result-item'>
                <Box className='user-name-search-results'>
                    <Typography
                        sx={{
                            fontSize: '200%',

                            cursor: "pointer",
                        }}
                        className='search-result-username'
                        onClick={handleUserClick}
                        >
                        {data.username}
                    </Typography>
                </Box>
                <Divider orientation='vertical' flexItem variant='middle' />
                <Box className='user-data'>
                    <Typography>{data.social_counts.subjects} subjects and {data.social_counts.reviews} reviews</Typography>
                    <Typography>Registered {account_age}</Typography>
                </Box>
                <Divider orientation='vertical' flexItem variant='middle' />
                <Box className='button-container'>


                    <Button
                        variant='contained'
                        onClick={((e) => { handleFriendshipClick(e, data.id) })}
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
                    {data.follows ?
                        <Box className='follow-status'>
                            <p className='follow-status'>Follows you</p>
                        </Box>
                        :
                        null
                    }
                </Box>
            </li>
            <Divider />
        </>
    )
}

export default UserSearchResultItem
