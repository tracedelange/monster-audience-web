import { Box } from '@mui/system'
import React, {useState} from 'react'
import LandingPageLogin from './LandingPageLogin'
import LandingContent from './LandingContent'
import LandingPageSignup from './LandingPageSignup'

const LandingPage = () => {

    const [loginVisible, setLoginVisible] = useState(true)

    const toggleSession = () => {
        setLoginVisible(!loginVisible)
    }

    return (
        <Box className='root'>
            <div className='landing-container'>
                <LandingContent />

                {loginVisible ? 
                <LandingPageLogin handleSignupClick={toggleSession} />
                :
                <LandingPageSignup handleSignupClick={toggleSession}/>
                }
            </div>
        </Box>
    )
}

export default LandingPage
