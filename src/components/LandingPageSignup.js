import React, { useState, useEffect } from 'react'
import { Box, typography } from '@mui/system'
import { Typography } from '@mui/material'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LandingPageSignup = ({ handleSignupClick }) => {

    const [submitReady, setSubmitReady] = useState(false)
    const [signupObject, setSignupObject] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    const handleFormChange = (e) => {

        setSignupObject({
            ...signupObject,
            [e.target.id]: e.target.value
        })

    }

    useEffect(() => {

        if (!Object.values(signupObject).some((item) => item === '')) {
            setSubmitReady(true)
        } else {
            setSubmitReady(false)
        }



    }, [signupObject])

    return (
        <Box className='landing-session'>

            <Paper className='session-sheet' elevation={4} >
                <Typography align='center' variant='h2' sx={{ paddingTop: '5vh' }}>
                    Signup
                </Typography>
                <form id='session-form' onChange={handleFormChange}>
                    <TextField className='session-text' id='username' type='text' label='Username' variant="outlined" />
                    <TextField className='session-text' id='email' type='text' label='Email' variant="outlined" />
                    <TextField className='session-text' id='password' type='password' label='Password' variant="outlined" />
                    <TextField className='session-text' id='passwordConfirmation' type='password' label='Confirm Password' variant="outlined" />
                    <Button variant="outlined" disabled={!submitReady}>
                        Submit
                    </Button>
                    <Typography className='session-inverse-text' onClick={handleSignupClick}>
                        Already have an account? Login.
                    </Typography>
                </form>
            </Paper>

        </Box>
    )
}

export default LandingPageSignup
