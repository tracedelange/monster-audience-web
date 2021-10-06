import React, { useEffect, useState } from 'react'
import { Box, typography } from '@mui/system'
import { Typography } from '@mui/material'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LandingPageLogin = ({ handleSignupClick }) => {

    const [submitReady, setSubmitReady] = useState(false)
    const [loginObject, setLoginObject] = useState({
        email: '',
        password: '',
    })

    const handleFormChange = (e) => {

        setLoginObject({
            ...loginObject,
            [e.target.id]: e.target.value
        })

    }

    useEffect(() => {

        if (!Object.values(loginObject).some((item) => item === '')) {
            setSubmitReady(true)
        } else {
            setSubmitReady(false)
        }



    }, [loginObject])

    return (
        <Box className='landing-session'>

            <Paper className='session-sheet' elevation={4} >
                <Typography align='center' variant='h2' sx={{ paddingTop: '5vh' }}>
                    Login
                </Typography>
                <form id='session-form' onChange={handleFormChange}>
                    <TextField className='session-text' id='email' type='text' label='Email' variant="outlined" />
                    <TextField className='session-text' id='password' type='password' label='Password' variant="outlined" />
                    <Button variant="outlined" disabled={!submitReady}>
                        Submit
                    </Button>
                    <Typography className='session-inverse-text' onClick={handleSignupClick}>
                        No account? Signup.
                    </Typography>
                </form>
            </Paper>

        </Box>
    )
}

export default LandingPageLogin
