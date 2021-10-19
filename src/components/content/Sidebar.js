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
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material'
import monster from '../../assets/MA.png'

const Sidebar = ({ base }) => {



    const dispatch = useDispatch()

    const history = useHistory();

    const handleLinkClick = (e) => {
        history.push(`${base}/${e.target.id}`)
    }


    return (
        <Paper className='sidebar' elevation={2}>

            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <Box className='sidebar-logo-container'>
                <img src={monster} className='sidebar-logo'></img>
                <Typography variant='h5'>Monster Audience</Typography>
            </Box>
            <Button variant='contained' color='primary' id='feed' onClick={handleLinkClick}>
                Feed
                <FormatListBulletedIcon />
            </Button>
            <Button variant='contained' color='primary' id='users' onClick={handleLinkClick}>
                Users
                <SearchIcon />
            </Button>
            <Button variant='contained' color='primary' id='subjects' onClick={handleLinkClick}>
                Subjects
                <LocalActivityOutlinedIcon />
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

