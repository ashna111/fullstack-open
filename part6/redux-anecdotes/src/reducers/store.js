import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notifReducer from './notificationReducer'
// import filterReducer from './filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notifReducer,
    // filter: filterReducer
})

let store = createStore(
    reducer,
    composeWithDevTools()
)

export default store