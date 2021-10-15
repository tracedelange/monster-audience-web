import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'

const SearchBar = ({label, handleSubmission, lowerCaseQuery=true}) => {

    const [query, setQuery] = useState('')


    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (lowerCaseQuery){
            handleSubmission((query).toLowerCase())
        } else {
            handleSubmission(query)
        }
    }


    return (
        <Box className='content-container'>
            <form onSubmit={handleFormSubmit}>
                <Box className='search-container'>
                    <TextField
                        label={label}
                        variant="outlined"
                        // fullWidth
                        onChange={handleChange}
                        value={query}
                        className='search-input'
                        InputLabelProps={{ sx: { fontSize: '2.5vmin' } }}
                        InputProps={{ sx: { fontSize: '2.5vmin' } }} />
                    <Button
                        className='search-submission'
                        type='submit'
                        disabled={query.length > 0 ? false : true}
                        variant='contained'
                        sx={{ color: "white", fontSize: '2.5vmin' }}
                    >Submit</Button>
                </Box>
            </form>
        </Box>
    )
}

export default SearchBar
