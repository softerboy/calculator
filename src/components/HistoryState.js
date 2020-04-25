import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'

import History from './History'
import { icons } from '../common/constants'
import { historyClear } from '../store/actions/history'

export default function HistoryState() {
  const dispatch = useDispatch()

  const history = useSelector(function (state) {
    return state.history
  })

  function onHistoryClearButtonClick() {
    return dispatch(historyClear())
  }

  return (
    <>
      <History history={history.list} />

      <Button
        className="trash-button"
        onClick={onHistoryClearButtonClick}
        dangerouslySetInnerHTML={{ __html: icons.TRASH }}
      />
    </>
  )
}
