import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { postSubject } from '../../../requests'
import { useHistory } from 'react-router-dom'

const SubmitSubjectPage = ({ base }) => {

    const [errors, setErrors] = useState([])
    const [submitReady, setSubmitReady] = useState(false)
    const [newSubject, setNewSubject] = useState({
        name: '',
        description: '',
        public: true
    })

    const history = useHistory()

    const handleFormChange = (e) => {
        setNewSubject({
            ...newSubject,
            [e.target.id]: e.target.value
        })
    }

    const handlePrivateButtonClick = () => {
        setNewSubject({
            ...newSubject,
            public: !newSubject.public
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        let finalSubject = {
            ...newSubject,
            description: (newSubject.description).trim(),
            name: (newSubject.name).trim()
        }
        postSubject(finalSubject)
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    history.push(`${base}/subjects/${data.id}`)
                }
            })
    }


    useEffect(() => {

        if (newSubject.name === '' || newSubject.description === '') {
            setSubmitReady(false)
        } else {
            setSubmitReady(true)
        }


    }, [newSubject])




    return (
        <Box className='create-subject-form-container'>
            <Box className='create-subject-title'>
                <Typography variant='h4'>Create a Subject</Typography>
                {newSubject.public == false ? <LockIcon sx={{ fontSize: 30 }} /> : null}
            </Box>
            <form onSubmit={handleFormSubmit} onChange={handleFormChange} className='create-subject-form'>
                <TextField id='name' label='Title' value={newSubject.name} fullWidth ></TextField>
                <TextField id='description' multiline rows={4} value={newSubject.description} fullWidth label='Description' ></TextField>

                <Button sx={{ color: newSubject.public == true ? "white" : "black" }} color={newSubject.public == true ? "primary" : "secondary"} onClick={handlePrivateButtonClick} variant='contained'>{newSubject.public == true ? "Public" : "Private"}</Button>

                <Typography variant='h5'  >Optional:</Typography>
                <TextField id='city' value={newSubject.city} label='City'></TextField>
                <TextField id='state' value={newSubject.state} label='State'></TextField>

                {errors.name ?
                    <Typography variant='h5' className='create-subject-error' color='error'>ERROR{errors.name[0]}</Typography>
                    :
                    null
                }

                <Button sx={{ color: 'white' }} color='primary' disabled={!submitReady} variant='contained' fullWidth type='submit'>Submit Subject</Button>
            </form>
        </Box>
    )
}

export default SubmitSubjectPage
