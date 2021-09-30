import {Switch, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Guard from './Guard'

const Router = () => {
    return(
        <Switch>
            <Route path="/" exact>
                <Login />
            </Route>
            <Route path="/Register">
                <Register />
            </Route>
            <Guard path="/Profile" component={Profile} />
            <Guard path="/Home" component={Home} />
        </Switch>
        
    )
}

export default Router