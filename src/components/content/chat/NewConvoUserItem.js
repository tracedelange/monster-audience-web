import React from 'react'
import { Divider } from '@mui/material'

const NewConvoUserItem = ({data, handleClick}) => {
    return (
        <li className='new-convo-user-item' onClick={()=>{handleClick(data)}}>
            {data.username}
            {/* <Divider /> */}
        </li>
    )
}

export default NewConvoUserItem
