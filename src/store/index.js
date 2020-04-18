import { createStore } from 'redux'

function counter(state = 0, action) {
  if (action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  }

  return state
}

const store = createStore(counter)

store.subscribe(function () {
  // eslint-disable-next-line no-console
  return console.log(store.getState())
})

export default store
