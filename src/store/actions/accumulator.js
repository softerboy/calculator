import {
  ACCUMULATOR_CLEAR,
  ACCUMULATOR_POP,
  ACCUMULATOR_PUSH,
  ACCUMULATOR_REPLACE_LAST,
} from '../action-types'

export function stackPush(operator, operand) {
  return function (dispatch, getState) {
    dispatch({
      payload: { operator, operand },
      type: ACCUMULATOR_PUSH,
    })

    return getState().accumulator
  }
}

export function stackClear() {
  return function (dispatch, getState) {
    dispatch({ type: ACCUMULATOR_CLEAR })
    return getState().accumulator
  }
}

export function stackReplaceLast(operator, operand) {
  return function (dispatch, getState) {
    dispatch({
      payload: { operator, operand },
      type: ACCUMULATOR_REPLACE_LAST,
    })

    return getState().accumulator
  }
}

export function stackPop() {
  return function (dispatch, getState) {
    dispatch({ type: ACCUMULATOR_POP })
    return getState().accumulator
  }
}
