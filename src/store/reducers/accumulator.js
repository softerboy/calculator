import {
  ACCUMULATOR_CLEAR,
  ACCUMULATOR_POP,
  ACCUMULATOR_PUSH,
  ACCUMULATOR_REPLACE_LAST,
} from '../action-types'

export default function accumulator(state = [], action) {
  const { type } = action

  if (type === ACCUMULATOR_PUSH) {
    return [...state, action.payload]
  }

  if (type === ACCUMULATOR_REPLACE_LAST) {
    return state.slice(0, -1).concat([action.payload])
  }

  if (type === ACCUMULATOR_CLEAR) {
    return []
  }

  if (type === ACCUMULATOR_POP) {
    return state.slice(0, -1)
  }

  return state
}
