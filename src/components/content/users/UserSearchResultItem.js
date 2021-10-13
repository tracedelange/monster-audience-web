import React from 'react'

const UserSearchResultItem = ({data}) => {
    return (
        <li className='search-result-item'>
            <h1>{data.username}</h1>
        </li>
    )
}

export default UserSearchResultItem
