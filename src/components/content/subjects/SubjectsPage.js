import React, { useEffect, useState } from 'react'
import SearchBar from '../search/SearchBar'
import NoResultsFound from '../search/NoResultsFound'
import TimeAgo from 'javascript-time-ago'
import SubjectSearchResultItem from './SubjectSearchResultItem'
import { searchSubjects } from '../../../requests'
import SubjectOptions from './SubjectOptions'

const timeAgo = new TimeAgo('en-US')

const SubjectsPage = ({ base }) => {


    const [searchResultsArray, setSearchResultsArray] = useState([])
    const [firstQuery, setFirstQuery] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    const [subjectFeedArray] = useState([])

    useEffect(() => {
        let array = searchResults.map(item => <SubjectSearchResultItem base={base} timeAgo={timeAgo} key={item.id} data={item} />)
        setSearchResultsArray(array)
    }, [searchResults])


    const handleSubjectSearchSubmit = (query) => {
        searchSubjects(query)
            .then(response => {
                console.log(response)
                setSearchResults(response)
                setFirstQuery(true)

            })
    }

    useEffect(()=>{

        

    },[])

    return (
        <div>
            <SearchBar
                handleSubmission={handleSubjectSearchSubmit}
                label={'Search Subjects'}
                lowerCaseQuery={false}
            />
            <SubjectOptions />
            {searchResultsArray.length > 0 ?
                <ul className='search-result-list' id='subject-search-result-list'>
                    {searchResultsArray}
                </ul>
                :
                firstQuery ?
                    <NoResultsFound />
                    :
                    null
                    // {subjectFeedArray}
            }
        </div>
    )
}


export default SubjectsPage
