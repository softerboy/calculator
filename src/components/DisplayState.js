import React from 'react'
import { useSelector } from 'react-redux'

import Display from './Display'

export default function DisplayState() {
  const { expression, result } = useSelector(function (state) {
    return state.display
  })

  return <Display result={result} expression={expression} />
}
