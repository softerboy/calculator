import { createStore, combineReducers } from 'redux'

import * as reducers from './reducers'

const store = createStore(combineReducers(reducers))

store.subscribe(function () {
  // eslint-disable-next-line no-console
  return console.log(store.getState())
})

export default store
