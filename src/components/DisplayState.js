import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Display from './Display'
import formatter from '../core/display-formatter'
import { htmlSymbols } from '../common/constants'
import { expressionFrom, resultFrom } from '../core/util'
import { SET_DISPLAY_RESULT } from '../store/action-types'

export default function DisplayState() {
  const dispatch = useDispatch()

  const { result, error } = useSelector(function (state) {
    return state.display
  })

  const stack = useSelector(function (state) {
    return state.accumulator
  })

  // whenever accumulator stack changes,
  // calculate new result from stack and display it,
  // otherwise display current user entered number
  // Note: second case managed by KeyboardState component
  useEffect(
    function () {
      const res = resultFrom(stack)

      let payload = { result: res }
      if (!isFinite(res)) {
        payload = { error: 'Cannot divide by zero', result: 0 }
      }

      if (isNaN(res)) {
        payload = { error: 'Invalid argument', result: 0 }
      }

      dispatch({
        type: SET_DISPLAY_RESULT,
        payload: payload,
      })
    },
    [stack, dispatch],
  )

  const expression = String(expressionFrom(stack, formatter)).replace(
    /-/g,
    htmlSymbols.MINUS,
  )
  return <Display result={error || result} expression={expression} />
}
