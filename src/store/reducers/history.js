import {
  HISTORY_APPLY,
  HISTORY_CLEAR,
  HISTORY_ERROR,
  HISTORY_PUSH,
} from '../action-types'

const initialState = {
  list: [],
  error: '',
}

export default function (state = initialState, action) {
  const { type, payload } = action

  if (type === HISTORY_APPLY) {
    return { ...state, list: payload, error: '' }
  }

  if (type === HISTORY_PUSH) {
    return { ...state, list: [...state.list, payload], error: '' }
  }

  if (type === HISTORY_CLEAR) {
    return initialState
  }

  if (type === HISTORY_ERROR) {
    return { ...state, error: payload }
  }

  return state
}
