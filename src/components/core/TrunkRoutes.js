import React, { useEffect } from 'react'
import LandingPage from '../landing/LandingPage'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import HomePage from '../content/HomePage.js'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '../../authFunctions'


const TrunkRoutes = () => {

    const session = useSelector(state => state.session);
    const dispatch = useDispatch()

    //Check to see if a user is already logged in via local storage.
    useEffect(()=>{
        // localStorage.setItem('jwt', data.jwt);
        const ExistingToken = localStorage.getItem('jwt')
        if (ExistingToken){
            getUserInfo(ExistingToken)
            .then((data)=>{
                if (data.user){
                    dispatch({ type: "LOGIN", payload: data})
                }
            })
        }
    },[dispatch])


    return (
        <Router>
            <Switch>
                <Route exact path='/landing'>
                    {session.loggedIn ? <Redirect to={`/home/${session.currentUser.user.username}/feed`} />  : <LandingPage /> }
                </Route>
                <Route exact path='/home/:username/*'>
                    {session.loggedIn ? <HomePage /> : <Redirect to='/landing' /> }
                </Route>
                <Route path='/'>
                    {session.loggedIn ? <Redirect to={`/home/${session.currentUser.user.username}/feed`} /> : <Redirect to='/landing' /> }
                </Route>
            </Switch>
        </Router>

    )
}

export default TrunkRoutes
