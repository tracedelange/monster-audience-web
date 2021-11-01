import React from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';

const SubjectOptions = ({ handleOptionsClick, activeButton }) => {

    return (
        <Box className='subject-options-container'>
            <Button variant='contained' onClick={handleOptionsClick} id='recent' color={activeButton === 'recent' ? 'secondary' :  'primary'} sx={{color:'white'}}>Recent</Button>
            <Button variant='contained' onClick={handleOptionsClick} id='best' color={activeButton === 'best' ? 'secondary' :  'primary'} sx={{color:'white'}}>Popular</Button>
            <Button variant='contained' onClick={handleOptionsClick} id='worst' color={activeButton === 'worst' ? 'secondary' :  'primary'} sx={{color:'white'}}>Unpopular</Button>
            <Button variant='contained' onClick={handleOptionsClick} id='create' color='primary' sx={{color:'white'}}><AddBoxIcon id='create' onClick={handleOptionsClick} /> </Button>
        </Box>
    )
}

export default SubjectOptions
