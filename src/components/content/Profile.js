import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import anonPic from '../../assets/anon-profile-pic.png'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import {capitalize} from '../../globals'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


const Profile = ({ session }) => {

    const created_at = Date.parse(session.currentUser.user.created_at)
    const now = new Date() 
    const dif = now.getTime() - created_at

    const account_age = timeAgo.format(now.getTime() - dif)

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('jwt')
    }

    console.log(session)

    return (
        <Box className='profile-page'>
            <Typography align='center' variant={'h3'} sx={{marginTop: "2%"}} >Profile Details</Typography>
            <img
            alt='Profile'
            className='profilePic'
            src={session.currentUser.user.avatarLink ? session.currentUser.user.avatarLink : anonPic}
            />
            <Typography variant={'h4'}>{capitalize(session.currentUser.user.username)}</Typography>
            <ul className='profile-stats-list'>
                <li><Typography variant={'h5'}>Account Created {account_age}</Typography></li>
                <li><Typography variant={'h5'}>Followers: {session.currentUser.user.social_counts.followers}</Typography></li>
                <li><Typography variant={'h5'}>Following: {session.currentUser.user.social_counts.following}</Typography></li>
                <li><Typography variant={'h5'}>Number of subjects added: {session.currentUser.user.social_counts.subjects}</Typography></li>
                <li><Typography variant={'h5'}>Number of reviews: {session.currentUser.user.social_counts.reviews}</Typography></li>
                <li><Typography variant={'h5'}>Average rating: {session.currentUser.user.social_counts.avg_rating ? parseFloat(session.currentUser.user.social_counts.avg_rating).toFixed(2) : 'N/A'}</Typography></li>
                {/* <li><Typography variant={'h5'}>Community Score:</Typography></li> */}
            </ul>

            <Button
            variant='contained'
            sx={{fontSize: '1vw', color:'white'}}
            onClick={handleLogout}
            >Logout</Button>
        </Box>
    )
}

export default Profile
