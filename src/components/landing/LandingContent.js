import React from 'react'
import { Box } from '@mui/system'
import { Paper, Typography } from '@mui/material'
import monster from '../../assets/MA.png'

const LandingContent = () => {
    return (
        <Box className='landing-content'>
            <Box className='landing-content-mascot'>
                <img src={monster} className='landing-mascot' alt='logo-mascot' />
            </Box>
            <Box className='landing-content-box'>
                <Typography className='landing-content-text' variant={'h2'} >Appraise The World.</Typography>
                <Typography className='landing-content-text' variant={'h2'} >Share your thoughts.</Typography>
                <Typography className='landing-content-text' variant={'h2'} >Connect with friends.</Typography>
                <Typography className='landing-content-text' variant={'h2'} >Monster Audience.</Typography>
            </Box>
        </Box>
    )
}

export default LandingContent
