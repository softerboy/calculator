import React from 'react'
import { useSelector } from 'react-redux'

import Display from './Display'
import { expressionFrom } from '../core/util'
import { htmlSymbols } from '../common/constants'

export default function DisplayState() {
  const { result } = useSelector(function (state) {
    return state.display
  })

  const stack = useSelector(function (state) {
    return state.accumulator
  })

  const expression = String(expressionFrom(stack)).replace(
    /-/g,
    htmlSymbols.MINUS,
  )
  return <Display result={result} expression={expression} />
}
