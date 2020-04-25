import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'

import History from './History'
import { icons } from '../common/constants'
import { fetchHistory, historyClear } from '../store/actions/history'

export default function HistoryState() {
  const dispatch = useDispatch()

  const { list, error, fetching } = useSelector(function (state) {
    return state.history
  })

  function onHistoryClearButtonClick() {
    return dispatch(historyClear())
  }

  useEffect(function () {
    dispatch(fetchHistory())
  }, [])

  function loadHistory() {
    dispatch(fetchHistory())
  }

  if (fetching) {
    return <div className="text-left p-3">Loading history...</div>
  }

  if (error) {
    return (
      <div className="p-4">
        <Button block onClick={loadHistory}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <>
      <History history={list} />

      <Button
        className="trash-button"
        onClick={onHistoryClearButtonClick}
        dangerouslySetInnerHTML={{ __html: icons.TRASH }}
      />
    </>
  )
}
