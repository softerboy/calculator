import { createStore, combineReducers } from 'redux'

import * as reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(function () {
  // eslint-disable-next-line no-console
  return console.log(store.getState())
})

export default store
