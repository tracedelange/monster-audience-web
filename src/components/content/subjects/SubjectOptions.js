import React, {useState, useEffect} from 'react'
import { Box } from '@mui/system'
import { Button } from '@mui/material'

const SubjectOptions = () => {

    const [activeButton, setActiveButton] = useState('recent')

    const handleRatingClick = (e) => {
        setActiveButton(e.target.id)
    }

    return (
        <Box className='subject-options-container'>
            <Button variant='contained' onClick={handleRatingClick} id='recent' color={activeButton === 'recent' ? 'secondary' :  'primary'} sx={{color:'white'}}>Recent</Button>
            <Button variant='contained' onClick={handleRatingClick} id='best' color={activeButton === 'best' ? 'secondary' :  'primary'} sx={{color:'white'}}>Popular</Button>
            <Button variant='contained' onClick={handleRatingClick} id='middle' color={activeButton === 'middle' ? 'secondary' :  'primary'} sx={{color:'white'}}>Controversial</Button>
            <Button variant='contained' onClick={handleRatingClick} id='worst' color={activeButton === 'worst' ? 'secondary' :  'primary'} sx={{color:'white'}}>Disliked</Button>
        </Box>
    )
}

export default SubjectOptions
