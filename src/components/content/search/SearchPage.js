import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Checkbox } from '@mui/material'
import { FormGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'

const SearchPage = () => {

    const [searchTarget, setSearchTarget] = useState()

    const handleFormSubmit = (e) => {

        e.preventDefault()
        console.log(e)

    }

    const handleCheckClick = (e) => {
        console.log(e)
    }


    return (
        <Box className='content-container'>
            <form onSubmit={handleFormSubmit}>
                <Box className='search-container'>
                    <TextField
                        label="Search Monster Audience"
                        variant="outlined"
                        // fullWidth
                        className='search-input'
                        InputLabelProps={{ sx: { fontSize: '2.5vmin' } }}
                        InputProps={{ sx: { fontSize: '2.5vmin' } }} />
                    <Button
                        className='search-submission'
                        type='submit'
                        variant='contained'
                        sx={{ color: "white", fontSize: '2.5vmin' }}
                    >Submit</Button>
                    <div className='break' />
                    <FormGroup sx={{alignSelf: 'left'}} >
                        <div className='checkbox-container'>
                            <FormControlLabel control={<Checkbox onClick={handleCheckClick} />} label="Users" />
                            <FormControlLabel control={<Checkbox onClick={handleCheckClick} />} label="Subjects" />
                        </div>
                    </FormGroup>
                    {/* filter options */}
                </Box>
            </form>
        </Box>
    )
}

export default SearchPage
