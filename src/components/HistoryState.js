import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'

import History from './History'
import { icons, MSG_HISTORY_LOADING } from '../common/constants'
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
    loadHistory()
  }, [])

  function loadHistory() {
    dispatch(fetchHistory())
  }

  if (fetching) {
    return <div className="text-left p-3">{MSG_HISTORY_LOADING}</div>
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-danger text-left">{error}</p>
        <Button
          block
          onClick={loadHistory}
          className="text-center rounded-0 operation-button border-0"
        >
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
