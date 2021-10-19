import React, {useState, useEffect} from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'

const SubjectOptions = ({searchResults, handleOptionsClick, activeButton }) => {


    // const handleRatingClick = (e) => {
    //     setActiveButton(e.target.id)
    //     handleOptionsClick(e.target.id)
    // }

    // useEffect(()=>{
    //     if (searchResults.length > 0) {
    //         setActiveButton('')
    //     }
    // },[searchResults])

    return (
        <Box className='subject-options-container'>
            <Button variant='contained' onClick={handleOptionsClick} id='recent' color={activeButton === 'recent' ? 'secondary' :  'primary'} sx={{color:'white'}}>Recent</Button>
            <Button variant='contained' onClick={handleOptionsClick} id='best' color={activeButton === 'best' ? 'secondary' :  'primary'} sx={{color:'white'}}>Popular</Button>
            <Button variant='contained' onClick={handleOptionsClick} id='worst' color={activeButton === 'worst' ? 'secondary' :  'primary'} sx={{color:'white'}}>Unpopular</Button>
        </Box>
    )
}

export default SubjectOptions
