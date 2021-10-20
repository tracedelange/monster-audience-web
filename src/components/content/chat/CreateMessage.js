import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'

const CreateMessage = () => {



    const handleFormSubmit = (e) => {
        e.preventDefault()

    }

    const currentUser = useSelector(state => state.session.currentUser.user)

    const [newMessage, setNewMessage] = useState({
        recipient_id: null,
        sender_id: currentUser.id,
        content: ''
    })

    const handleFormChange = (e) => {
        setNewMessage({
            ...newMessage,
            [e.target.id]: e.target.value
        })
    }




    return (
        <div className='chatbox-container'>
        <form onSubmit={handleFormSubmit} onChange={handleFormChange} className='chatbox'>

            <TextField value={newMessage.recipient_id} type='number' label='Recipient ID' id='recipient_id'></TextField>
            <TextField value={newMessage.content} type='text' rows={4} multiline label='Message' id='content'></TextField>
            <Button variant='contained' type='submit'>Send Message</Button>


        </form>

    </div>
    )
}

export default CreateMessage
