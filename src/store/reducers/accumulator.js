import {
  ACCUMULATOR_CLEAR,
  ACCUMULATOR_POP,
  ACCUMULATOR_PUSH,
} from '../action-types'

// on begin we have an empty accumulator stack
const initialState = []

export default function accumulator(state = initialState, action) {
  const { type } = action

  if (type === ACCUMULATOR_PUSH) {
    return [...state, action.payload]
  }

  if (type === ACCUMULATOR_POP) {
    return state.slice(0, -1) // remove last element
  }

  if (type === ACCUMULATOR_CLEAR) {
    return []
  }

  return state
}
