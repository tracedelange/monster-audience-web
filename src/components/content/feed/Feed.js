import React, { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import FeedItem from './FeedItem';
import { useDispatch } from 'react-redux';
import { getUserFeed } from '../../../requests'
import { addNextPage } from '../../../actions/feed';


const Feed = ({ base }) => {

    const [feedArray, setFeedArray] = useState()
    const { feed } = useSelector(state => state.feed);
    const page = useSelector(state => state.feed.page);
    const session = useSelector(state => state.session);

    const dispatch = useDispatch()

    useEffect(() => {
        if (feed.length > 0) {
            const feedArray = feed.map((item) => <FeedItem user={session.currentUser.user} base={base} key={item.id} feedIndex={feed.indexOf(item)} data={item} />)
            setFeedArray(feedArray)
        }
    }, [feed])

    const handleScroll = (e) => {

        if (e.target.scrollHeight - e.target.scrollTop === (e.target.clientHeight)) {
            console.log('Fetching next page...')
            let nextPage = page + 1
            getUserFeed(nextPage)
                .then(data => {
                    if (data){
                        dispatch(addNextPage(data, nextPage))
                    }
                })
        }
    }


    return (
        <div className='feed-container'>
            <ul className='feed-content' onScroll={handleScroll}>
                {feedArray ?
                    feedArray
                    :
                    <ul className='empty-feed'>
                        <Typography>Your feed is empty!</Typography>
                        <Typography>Suggestions: </Typography>
                        <Typography>Follow some users</Typography>
                        <Typography>Review an existing subject</Typography>
                        <Typography>Create a Subject to review</Typography>
                    </ul>
                }
            </ul>
        </div>
    )
}

export default Feed
