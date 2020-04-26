import {
  HISTORY_CLEAR,
  HISTORY_FETCH_COMPLETED,
  HISTORY_FETCH_ERROR,
  HISTORY_FETCH_PENDING,
  HISTORY_POST_CALCULATION_COMPLETED,
  HISTORY_POST_CALCULATION_PENDING,
  HISTORY_PUSH,
} from '../action-types'

const initialState = {
  list: [],
  error: '',
  fetching: false,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  if (type === HISTORY_FETCH_PENDING) {
    return { ...state, error: '', fetching: true }
  }

  if (type === HISTORY_FETCH_COMPLETED) {
    return { list: payload, error: '', fetching: false }
  }

  if (type === HISTORY_FETCH_ERROR) {
    return { ...state, error: payload, fetching: false }
  }

  if (type === HISTORY_PUSH) {
    return { ...state, list: [payload, ...state.list], error: '' }
  }

  if (type === HISTORY_CLEAR) {
    return initialState
  }

  if (type === HISTORY_POST_CALCULATION_PENDING) {
    // TODO: set your loading state here
    // something like display loading progress on the ui.
    return state
  }

  if (type === HISTORY_POST_CALCULATION_COMPLETED) {
    // TODO: set your post calculation success state here
    // something like display success notification message
    return state
  }

  if (type === HISTORY_FETCH_ERROR) {
    // TODO: set your error post calculation state here
    // something like display error notification message
    return state
  }

  return state
}
