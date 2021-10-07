import { Box } from '@mui/system'
import React, {useState} from 'react'
import LandingPageLogin from './LandingPageLogin'
import LandingContent from './LandingContent'
import LandingPageSignup from './LandingPageSignup'
import { useDispatch } from 'react-redux'

const LandingPage = () => {


    

    const [loginVisible, setLoginVisible] = useState(true)
    const dispatch = useDispatch()


    const toggleSession = () => {
        setLoginVisible(!loginVisible)
    }

    const handleLogin = (userData) => {
        //useDispatch to update state to logged in, plus add jwt token to local storage.
        dispatch({ type: "LOGIN", payload: userData})
        localStorage.setItem('jwt', userData.jwt);
    }

    return (
        <Box className='root'>
            <div className='landing-container'>
                <LandingContent />
                {loginVisible ? 
                <LandingPageLogin updateUserData={handleLogin} handleSignupClick={toggleSession} />
                :
                <LandingPageSignup updateUserData={handleLogin} handleSignupClick={toggleSession}/>
                }
            </div>
        </Box>
    )
}

export default LandingPage
