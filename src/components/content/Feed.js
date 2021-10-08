import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import FeedItem from './FeedItem';

const Feed = () => {

    const [feedArray, setFeedArray] = useState()
    const {feed} = useSelector(state => state.feed);

    useEffect(()=> {
        if (feed.length > 0){
            const feedArray = feed[0].map((item) => <FeedItem key={item.id} data={item} />)
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
