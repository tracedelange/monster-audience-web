import React, {useState} from 'react'
import SearchBar from '../search/SearchBar'
import { searchUsers } from '../../../requests'

const UsersPage = () => {

    const handleUserSearchSubmit = (query) => {
        searchUsers(query)
        .then(response => {
            console.log(response)
        })
    }

    // const [searchResults, setSearchResults] = useState([])


    return (


        <div>
            <SearchBar handleSubmission={handleUserSearchSubmit} label='Search Usernames' />
            
        </div>
    )
}

export default UsersPage
