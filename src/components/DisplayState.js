import React from 'react'
import { useSelector } from 'react-redux'

import Display from './Display'

export default function DisplayState() {
  const count = useSelector(function (state) {
    return state
  })

  return <Display result={count} />
}
