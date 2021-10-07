import React from 'react'
import Feed from './Feed'
import Sidebar from './Sidebar'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import { Paper } from '@mui/material'

const HomePage = () => {

    const session = useSelector(state => state.session);

    const base = `/home/${session.currentUser.user.username}`

    return (
        <>
            <Sidebar base={base} />
            <Paper className='content-stage' elevation={2}>
                <Switch>
                    <Route exact path={`${base}/feed`}>
                        <Feed />
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
                </Switch>
            </Paper>
        </>
    )
}

export default HomePage
