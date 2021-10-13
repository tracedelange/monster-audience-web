import React, {useState, useEffect} from 'react'
import SearchBar from '../search/SearchBar'
import { searchUsers } from '../../../requests'
import UserSearchResultItem from './UserSearchResultItem'

const UsersPage = () => {

    const handleUserSearchSubmit = (query) => {
        searchUsers(query)
        .then(response => {
            setSearchResults(response)
        })
    }

    const [searchResults, setSearchResults] = useState([])
    const [searchResultsArray, setSearchResultsArray] = useState([])

    useEffect(() => {

        if (searchResults.length > 0){
            let array = searchResults.map(item => <UserSearchResultItem key={item.id} data={item} />)
            setSearchResultsArray(array)
        }

    }, [searchResults])


    return (


        <div>
            <SearchBar handleSubmission={handleUserSearchSubmit} label='Search Usernames' />
            <div className='search-results-stats'>

            </div>
            <ul className='search-result-list'>
                {searchResultsArray}
            </ul>           
        </div>
    )
}

export default UsersPage
