import React from 'react'
import PropTypes from 'prop-types'

import ListGroup from 'react-bootstrap/ListGroup'

import HistoryItem from './HistoryItem'

export default function History(props) {
  const { history, emptyWarn } = props

  if (!history || !Array.isArray(history) || !history.length) {
    return <div className="text-left">{emptyWarn}</div>
  }

  function renderHistory(history) {
    return history.map(function ({ expression, result }, index) {
      return <HistoryItem key={index} expression={expression} result={result} />
    })
  }

  return (
    <ListGroup className="history-list">{renderHistory(history)}</ListGroup>
  )
}

History.propTypes = {
  emptyWarn: PropTypes.node,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      expression: PropTypes.string,
      result: PropTypes.number,
    }),
  ),
}

History.defaultProps = {
  history: [],
  // eslint-disable-next-line quotes
  emptyWarn: "There's no history yet",
}
