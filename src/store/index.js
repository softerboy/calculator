import { combineReducers, createStore } from 'redux'

import * as reducers from './reducers'

const applyReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(combineReducers(reducers), applyReduxDevTools)

export default store
