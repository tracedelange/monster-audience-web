import React from 'react'
import { Button } from '@mui/material' 
import { useDispatch } from 'react-redux'

const Navbar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'})
        localStorage.removeItem('jwt')
    }


    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}



export default Navbar
