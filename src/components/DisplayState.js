import React from 'react'
import { useSelector } from 'react-redux'

import Display from './Display'
import { format } from '../core/string-utils'
import { htmlSymbols } from '../common/constants'

export default function DisplayState() {
  const { result, error, expression } = useSelector(function (state) {
    return state.display
  })

  const expr = String(expression).replace(/-/g, htmlSymbols.MINUS)

  let displayResult = result
  if (typeof result === 'object') {
    displayResult = result.toString()
  }

  const formatted = format(String(displayResult))
  return <Display result={error || formatted} expression={expr} />
}
