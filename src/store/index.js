import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'

import * as reducers from './reducers'

const middleware = applyMiddleware(thunk)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(middleware),
)

export default store
