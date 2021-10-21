import React, { useState, useEffect } from 'react'
import Feed from './feed/Feed'
import Sidebar from './Sidebar'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Profile from './Profile'
import { Paper } from '@mui/material'
import {getUserFeed} from '../../requests'
import UsersPage from './users/UsersPage'
import SubjectsPage from './subjects/SubjectsPage'
import UserDetailsPage from './users/UserDetailsPage'
import SubjectDetailsPage from './subjects/SubjectDetailsPage'
import SubmitSubjectPage from './subjects/SubmitSubjectPage'

const HomePage = () => {

    const session = useSelector(state => state.session);

    const base = `/home/${session.currentUser.user.username}`

    const dispatch = useDispatch()

    // useEffect(()=>{
    //     getUserFeed()
    //     .then(data => {
    //         dispatch({ type: "SET_FEED", payload: data})
    //     })
    // },[])


    return (
        <>
            <Sidebar base={base} session={session} />
            <Paper className='content-stage' elevation={2}>
                <Switch>
                    <Route exact path={`${base}/users`}>
                        <UsersPage base={base} />
                    </Route>
                    <Route exact path={`${base}/subjects`}>
                        <SubjectsPage base={base} />
                    </Route>
                    <Route exact path={`${base}/subject/create`}>
                        <SubmitSubjectPage base={base} />
                    </Route>
                    <Route exact path={`${base}/subjects/:id`}>
                        <SubjectDetailsPage base={base} />
                    </Route>
                    <Route exact path={`${base}/messages`}>
                        <Feed />
                    </Route>
                    <Route path={`${base}/users/:id`}>
                        <UserDetailsPage base={base} />
                    </Route>
                    <Route exact path={`${base}/profile`}>
                        <Profile session={session} base={base} />
                    </Route>
                    <Route path={`${base}/feed`}>
                        <Feed base={base} />
                    </Route>
                </Switch>
            </Paper>
        </>
    )
}

export default HomePage
