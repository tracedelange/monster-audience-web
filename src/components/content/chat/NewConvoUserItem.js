import React from 'react'

const NewConvoUserItem = ({data, handleClick}) => {
    return (
        <li className='new-convo-user-item' onClick={()=>{handleClick(data)}}>
            {data.username}
        </li>
    )
}

export default NewConvoUserItem
