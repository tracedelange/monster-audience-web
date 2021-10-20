import React, { useEffect, useState } from 'react'
import SearchBar from '../search/SearchBar'
import NoResultsFound from '../search/NoResultsFound'
import SubjectSearchResultItem from './SubjectSearchResultItem'
import { searchSubjects } from '../../../requests'
import SubjectOptions from './SubjectOptions'
import { getWorstSubjects, getBestSubjects, getRecentSubjects } from '../../../requests'
import { useDispatch, useSelector } from 'react-redux'
import { setSubjects, addNextSubjectsPage} from '../../../actions/subjects'
import { useHistory } from 'react-router'
import TimeAgo from 'javascript-time-ago'

const timeAgo = new TimeAgo('en-US')

const SubjectsPage = ({ base }) => {

    const history = useHistory()
    const [searchResultsArray, setSearchResultsArray] = useState([])
    const [firstQuery, setFirstQuery] = useState(false)
    // const [searchResults, setSearchResults] = useState([])

    const dispatch = useDispatch()

    const subjectState = useSelector(state => state.subjects);
    const subjectFeed = useSelector(state => state.subjects.subjectFeed);
    const feedType = useSelector(state => state.subjects.feedType);
    const page = useSelector(state => state.subjects.subjectPage);


    const handleScroll = (e) => {
        // console.log(e.target.scrollHeight - e.target.scrollTop)
        // console.log(e.target.clientHeight)

        if (e.target.scrollHeight - e.target.scrollTop === (e.target.clientHeight)) {
            console.log('Fetching next page...')
            let nextPage = page + 1
            switch (feedType) {
                case 'best':
                    getBestSubjects(nextPage)
                        .then(data => {
                            dispatch(addNextSubjectsPage(data))
                        })
                    break;
                case 'worst':
                    getWorstSubjects(nextPage)
                        .then(data => {
                            dispatch(addNextSubjectsPage(data))
                        })
                    break;
                case 'recent':
                    getRecentSubjects(nextPage)
                        .then(data => {
                            dispatch(addNextSubjectsPage(data))
                        })
                    break;
                default:
                    break;
            }
        }
    }


    const handleOptionsClick = (e) => {

        // console.log(feedType)
        // console.log(e.target.id)

        if (feedType !== e.target.id) {

            switch (e.target.id) {
                case 'best':
                    getBestSubjects()
                        .then(data => {
                            dispatch(setSubjects(data, 'best'))
                        })
                    break;
                case 'worst':
                    getWorstSubjects()
                        .then(data => {
                            dispatch(setSubjects(data, 'worst'))
                        })
                    break;
                case 'recent':
                    getRecentSubjects()
                        .then(data => {
                            dispatch(setSubjects(data, 'recent'))
                        })
                    break;
                case 'create':
                    history.push(`${base}/subject/create`)
                    break;
                default:
                    break;
            }
        }
    }


    const handleSubjectSearchSubmit = (query) => {
        searchSubjects(query)
            .then(response => {
                dispatch(setSubjects(response, 'search'))
                setFirstQuery(true)
            })
    }

    useEffect(() => { //on initial load, get recent subjects
        getRecentSubjects()
            .then(data => {
                if (data) {
                    dispatch(setSubjects(data, 'recent'))
                }
            })
    }, [])


    useEffect(() => { //Anytime feed state is updated, new results will be rendered.
        let array = subjectFeed.map(item => <SubjectSearchResultItem base={base} timeAgo={timeAgo} key={item.id} data={item} history={history} />)
        setSearchResultsArray(array)
    }, [subjectFeed])

    return (
        <div>
            <SearchBar
                handleSubmission={handleSubjectSearchSubmit}
                buttonSecondary={feedType == 'search' ? true : false}
                label={'Search Subjects'}
                lowerCaseQuery={false}
            />
            <SubjectOptions handleOptionsClick={handleOptionsClick} activeButton={feedType} />
            {searchResultsArray.length > 0 ?
                <ul className='search-result-list' id='subject-search-result-list' onScroll={handleScroll}>
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
