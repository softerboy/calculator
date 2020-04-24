import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'

import History from './History'
import readable from '../core/tokenizer/readable'
import { buttons, icons } from '../common/constants'
import { historyClear, historyPush } from '../store/actions/history'
import { expressionFrom, resultFrom } from '../core/accumulator'

export default function HistoryState() {
  const dispatch = useDispatch()

  const history = useSelector(function (state) {
    return state.history
  })

  const stack = useSelector(function (state) {
    return state.accumulator
  })

  useEffect(
    function () {
      const { length } = stack
      if (!length) return

      const last = stack[length - 1]
      if (last.operator === buttons.BTN_EQUAL) {
        const result = resultFrom(stack)
        const expression = expressionFrom(stack, readable)

        dispatch(historyPush({ expression, result }))
      }
    },
    [stack],
  )

  function onHistoryClearButtonClick() {
    return dispatch(historyClear())
  }

  return (
    <>
      <History history={history.list} />

      <Button
        className="trash-button"
        onClick={onHistoryClearButtonClick}
        dangerouslySetInnerHTML={{ __html: icons.CLOCK }}
      />
    </>
  )
}
