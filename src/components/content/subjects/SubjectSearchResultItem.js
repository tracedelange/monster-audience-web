import React from 'react'
import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

const SubjectSearchResultItem = ({ data, timeAgo }) => {

    const base = useSelector(state => state.session.base)
    const history = useHistory()

    const created_at = Date.parse(data.created_at)
    const now = new Date()
    const dif = now.getTime() - created_at

    const subject_age = timeAgo.format(now.getTime() - dif)

    const handleUserClick = () => {
        history.push(`${base}/subjects/${data.id}`)
    }
    const handleUsernameClick = () => {
        history.push(`${base}/users/${data.user_id}`)
    }

    return (
        <>
            <li className='search-result-item' id="subject-search-results">
                {/* <Typography>{data.name}</Typography> */}
                <Box className='subject-search-results'>
                    <Typography
                        sx={{
                            fontSize: '150%',
                            cursor: "pointer",
                        }}
                        className='search-result-username'
                        onClick={handleUserClick}
                    >
                        {data.name}
                    </Typography>
                    <Typography>{data.description}</Typography>
                </Box>
                <Divider orientation='vertical' flexItem variant='middle' />
                <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography>{data.reviews.length} Review(s)</Typography>
                    <Typography>{data.avg_rating ? parseFloat(data.avg_rating).toFixed(2) : "N/A"} Average</Typography>
                    <Typography onClick={handleUsernameClick} sx={{ cursor: 'pointer' }}>
                        Posted {subject_age}, by {data.username}
                    </Typography>
                    {/* <Typography>Registered {account_age}</Typography> */}
                </Box>
            </li>
            <Divider />
        </>
    )
}

export default SubjectSearchResultItem
