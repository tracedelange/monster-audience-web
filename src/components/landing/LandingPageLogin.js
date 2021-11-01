import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { submitLogin } from '../../authFunctions';

const LandingPageLogin = ({ handleSignupClick, updateUserData }) => {

    const [submitReady, setSubmitReady] = useState(false)
    const [errors, setErrors] = useState([])
    const [loginObject, setLoginObject] = useState({
        username: '',
        password: '',
    })

    const handleFormChange = (e) => {
        setErrors([])
        if (e.target.id === 'username') {
            setLoginObject({
                ...loginObject,
                'username' : e.target.value.toLowerCase()
            })
        } else {
            setLoginObject({
                ...loginObject,
                [e.target.id]: e.target.value
            })
        }

    }

    const handleLoginSubmit = (e) => {

        e.preventDefault()
        submitLogin(loginObject)
        .then((data) => {
            if (data.errors){
                setErrors(data)
            } else {
                updateUserData(data)
            }
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
                <form id='session-form' onChange={handleFormChange} onSubmit={handleLoginSubmit}>
                    <TextField className='session-text' id='username' error={errors.errors ? true : false} type='text' label='Username' variant="outlined" />
                    <TextField className='session-text' id='password' error={errors.errors ? true : false} type='password' label='Password' variant="outlined" />
                    <Button type='submit' variant="outlined" disabled={!submitReady}>
                        Submit
                    </Button>
                    <Typography sx={{color: 'red'}} className='session-inverse-text' onClick={handleSignupClick}>
                        {errors ? errors.errors : null}
                    </Typography>
                    <Typography className='session-inverse-text' onClick={handleSignupClick}>
                        No account? Signup.
                    </Typography>
                </form>
            </Paper>

        </Box>
    )
}

export default LandingPageLogin
