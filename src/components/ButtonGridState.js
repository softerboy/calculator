import React from 'react'
import { useDispatch } from 'react-redux'

import ButtonGrid from './ButtonGrid'

export default function ButtonGridState() {
  const dispatch = useDispatch()
  return <ButtonGrid onClick={dispatch.bind(this, { type: 'INCREMENT' })} />
}
