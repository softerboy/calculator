import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Display from './Display'
import { htmlSymbols } from '../common/constants'
import { expressionFrom, resultFrom } from '../core/util'
import { SET_DISPLAY_RESULT } from '../store/action-types'

export default function DisplayState() {
  const dispatch = useDispatch()

  const { result } = useSelector(function (state) {
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

      dispatch({
        type: SET_DISPLAY_RESULT,
        payload: {
          result: res,
        },
      })
    },
    [stack, dispatch],
  )

  const expression = String(expressionFrom(stack)).replace(
    /-/g,
    htmlSymbols.MINUS,
  )
  return <Display result={result} expression={expression} />
}
