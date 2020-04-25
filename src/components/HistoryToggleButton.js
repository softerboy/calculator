import React from 'react'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'

import { icons } from '../common/constants'
import { toggleMobileHistoryPanel } from '../store/actions/ui'

export default function HistoryToggleButton() {
  const dispatch = useDispatch()

  function onHistoryToggleButtonClick(e) {
    e.stopPropagation()
    dispatch(toggleMobileHistoryPanel())
  }

  return (
    <Button
      onClick={onHistoryToggleButtonClick}
      dangerouslySetInnerHTML={{ __html: icons.CLOCK }}
      className="rounded-0 p-3 memory-button d-md-none d-sm-block"
    />
  )
}
