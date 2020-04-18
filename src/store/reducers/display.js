import { SET_DISPLAY_RESULT } from '../action-types'

const initialState = { expression: '', result: 0 }

export default function (state = initialState, action) {
  const { type, payload } = action

  if (type === SET_DISPLAY_RESULT) {
    return { ...state, ...payload }
  }

  return state
}
