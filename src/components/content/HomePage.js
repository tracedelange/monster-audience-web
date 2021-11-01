import React from 'react'
import Feed from './feed/Feed'
import Sidebar from './Sidebar'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import { Paper } from '@mui/material'
import UsersPage from './users/UsersPage'
import SubjectsPage from './subjects/SubjectsPage'
import UserDetailsPage from './users/UserDetailsPage'
import SubjectDetailsPage from './subjects/SubjectDetailsPage'
import SubmitSubjectPage from './subjects/SubmitSubjectPage'
import ChatLanding from './chat/ChatLanding'

const HomePage = () => {

    const session = useSelector(state => state.session);
    const base = useSelector(state => state.session.base)

    return (
        <>
            <Sidebar session={session} />
            <Paper className='content-stage' elevation={2}>
                <Switch>
                    <Route exact path={`${base}/users`}>
                        <UsersPage />
                    </Route>
                    <Route exact path={`${base}/subjects`}>
                        <SubjectsPage />
                    </Route>
                    <Route exact path={`${base}/subject/create`}>
                        <SubmitSubjectPage />
                    </Route>
                    <Route exact path={`${base}/subjects/:id`}>
                        <SubjectDetailsPage />
                    </Route>
                    <Route exact path={`${base}/messages`}>
                        <ChatLanding />
                    </Route>
                    <Route path={`${base}/users/:id`}>
                        <UserDetailsPage />
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
