import { createStore, combineReducers, applyMiddleware } from 'redux'
import usersReducer from './reducers/users'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    users: usersReducer,
})
const middleware = applyMiddleware(thunk,logger)
const store = createStore(reducers, middleware)

export default store