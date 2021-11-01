import React from 'react'
import { Button, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { useHistory } from 'react-router-dom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SearchIcon from '@mui/icons-material/Search';
import monster from '../../assets/MA.png'
import monsterAudience from '../../assets/MAT.png'

const Sidebar = ({ session }) => {


    const base = useSelector(state => state.session.base)
    const history = useHistory();

    const handleLinkClick = (e) => {
        history.push(`${base}/${e.target.id}`)
    }


    return (
        <Paper className='sidebar' elevation={2}>
            <Box className='sidebar-logo-container'>
                <img alt='monster audience logo' src={monster} className='sidebar-logo'></img>
                <img alt='stylized monster audio text' src={monsterAudience} className='sidebar-logo-text'></img>
            </Box>
            <Button variant='contained' color='primary' id='feed' onClick={handleLinkClick}>
                Feed
                <FormatListBulletedIcon onClick={handleLinkClick} id='feed'/>
            </Button>
            <Button variant='contained' color='primary' id='users' onClick={handleLinkClick}>
                Users
                <SearchIcon id='users' onClick={handleLinkClick} />
            </Button>
            <Button variant='contained' color='primary' id='subjects' onClick={handleLinkClick}>
                Subjects
                <LocalActivityOutlinedIcon id='subjects' onClick={handleLinkClick} />
            </Button>
            <Button variant='contained' color='primary' id='messages' onClick={handleLinkClick}>
                Messages
                <MessageOutlinedIcon id='messages' onClick={handleLinkClick} />
            </Button>
            <Button variant='contained' color='primary' id='profile' onClick={() => { history.push(`${base}/users/${session.currentUser.user.id}`) }}>
                Profile
                <AccountBoxOutlinedIcon id='profile' onClick={() => { history.push(`${base}/users/${session.currentUser.user.id}`) }} />
            </Button>
        </Paper>
    )
}

export default Sidebar

