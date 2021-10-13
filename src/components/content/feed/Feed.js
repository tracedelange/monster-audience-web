import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import FeedItem from './FeedItem';

const Feed = () => {

    const [feedArray, setFeedArray] = useState()
    const {feed} = useSelector(state => state.feed);
    const session = useSelector(state => state.session);

    console.log(feed)

    useEffect(()=> {
        if (feed.length > 0){
            const feedArray = feed.map((item) => <FeedItem user={session.currentUser.user} key={item.id} feedIndex={feed.indexOf(item)} data={item} />)
            setFeedArray(feedArray)
        }
    }, [feed])

    return (
        <div className='feed-container'>
            <ul className='feed-content'>
                {feedArray}
            </ul>
        </div>
    )
}

export default Feed
