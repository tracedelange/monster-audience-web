import React, { useState, useEffect } from 'react'
import Feed from './feed/Feed'
import Sidebar from './Sidebar'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Profile from './Profile'
import { Paper } from '@mui/material'
import {getUserFeed} from '../../requests'
import SearchPage from './search/SearchPage'

const HomePage = () => {

    const session = useSelector(state => state.session);

    const base = `/home/${session.currentUser.user.username}`

    const dispatch = useDispatch()

    useEffect(()=>{
        getUserFeed()
        .then(data => {
            console.log(data)
            dispatch({ type: "SET_FEED", payload: data})
        })
    },[])


    return (
        <>
            <Sidebar base={base} />
            <Paper className='content-stage' elevation={2}>
                <Switch>
                    <Route exact path={`${base}/search`}>
                        <SearchPage />
                    </Route>
                    <Route exact path={`${base}/subjects`}>
                        <Feed />
                    </Route>
                    <Route exact path={`${base}/reviews`}>
                        <Feed />
                    </Route>
                    <Route exact path={`${base}/messages`}>
                        <Feed />
                    </Route>
                    <Route exact path={`${base}/profile`}>
                        <Profile session={session} />
                    </Route>
                    <Route path={`${base}/feed`}>
                        <Feed />
                    </Route>
                </Switch>
            </Paper>
        </>
    )
}

export default HomePage
