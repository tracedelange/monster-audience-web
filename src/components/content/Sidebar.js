import React from 'react'
import { Button, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import { Link, useHistory } from 'react-router-dom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import GroupIcon from '@mui/icons-material/Group';

const Sidebar = ({ base }) => {



    const dispatch = useDispatch()

    const history = useHistory();

    const handleLinkClick = (e) => {
        history.push(`${base}/${e.target.id}`)
    }


    return (
        <Paper className='sidebar' elevation={2}>

            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <Button variant='contained' color='primary' id='feed' onClick={handleLinkClick}>
                Feed
                <FormatListBulletedIcon />
            </Button>
            <Button variant='contained' color='primary' id='users' onClick={handleLinkClick}>
                Users
                <GroupIcon />
            </Button>
            <Button variant='contained' color='primary' id='subjects' onClick={handleLinkClick}>
                Subjects
                <LocalActivityOutlinedIcon />
            </Button>
            <Button variant='contained' color='primary' id='reviews' onClick={handleLinkClick}>
                Reviews
                <ThumbsUpDownOutlinedIcon/>
            </Button>
            <Button variant='contained' color='primary' id='messages' onClick={handleLinkClick}>
                Messages
                <MessageOutlinedIcon />
            </Button>
            <Button variant='contained' color='primary' id='profile' onClick={handleLinkClick}>
                Profile
                <AccountBoxOutlinedIcon />
            </Button>
        </Paper>
    )
}

export default Sidebar

