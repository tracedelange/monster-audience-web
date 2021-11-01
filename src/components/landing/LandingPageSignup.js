import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { submitSignup } from '../../authFunctions'


const LandingPageSignup = ({ handleSignupClick, updateUserData }) => {

    const [submitReady, setSubmitReady] = useState(false)
    const [errors, setErrors] = useState()


    const [signupObject, setSignupObject] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleFormChange = (e) => {
        setErrors()
        setSignupObject({
            ...signupObject,
            [e.target.id]: e.target.value
        })

    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        setSignupObject({
            ...signupObject,
            'username' : signupObject.username.toLowerCase()
        })
        submitSignup(signupObject)
            .then((data) => {
                if (data.errors){
                    setErrors(data)
                } else {
                    updateUserData(data)
                }
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
                    Register
                </Typography>
                <form id='session-form' onChange={handleFormChange} onSubmit={handleSignupSubmit}>
                    <TextField className='session-text' error={errors} id='username' type='text' label='Username' variant="outlined" />
                    <TextField className='session-text' error={errors} id='email' type='text' label='Email' variant="outlined" />
                    <TextField className='session-text' error={errors} id='password' type='password' label='Password' variant="outlined" />
                    <TextField className='session-text' error={errors} id='password_confirmation' type='password' label='Confirm Password' variant="outlined" />
                    <Button type='submit' variant="outlined" disabled={!submitReady}>
                        Submit
                    </Button>
                    <Typography sx={{color: 'red'}} className='session-inverse-text'>
                        {errors ? 'There was an error.' : null}
                    </Typography>
                    <Typography className='session-inverse-text' onClick={handleSignupClick}>
                        Already have an account? Login.
                    </Typography>
                </form>
            </Paper>

        </Box>
    )
}

export default LandingPageSignup
