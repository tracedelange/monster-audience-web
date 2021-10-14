import React, { useState, useEffect } from 'react'
import SearchBar from '../search/SearchBar'
import { searchUsers } from '../../../requests'
import UserSearchResultItem from './UserSearchResultItem'
import NoResultsFound from '../search/NoResultsFound'
import TimeAgo from 'javascript-time-ago'


const timeAgo = new TimeAgo('en-US')

const UsersPage = ({base}) => {



    const handleUserSearchSubmit = (query) => {
        searchUsers(query)
            .then(response => {
                setSearchResults(response)
                setFirstQuery(true)

            })
    }

    const [firstQuery, setFirstQuery] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchResultsArray, setSearchResultsArray] = useState([])

    useEffect(() => {
        let array = searchResults.map(item => <UserSearchResultItem base={base} timeAgo={timeAgo} key={item.id} data={item} />)
        setSearchResultsArray(array)

    }, [searchResults])


    return (


        <div>
            <SearchBar handleSubmission={handleUserSearchSubmit} label='Search Usernames' />
            <div className='search-results-stats'>

            </div>
            <ul className='search-result-list'>
                {searchResultsArray.length > 0 ?
                    searchResultsArray
                    :
                    firstQuery ?
                        <NoResultsFound />
                        :
                        null
                }
            </ul>
        </div>
    )
}

export default UsersPage
