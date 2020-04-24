import React from 'react'
import PropTypes from 'prop-types'

import ListGroupItem from 'react-bootstrap/ListGroupItem'

export default function HistoryItem(props) {
  const { expression, result } = props
  return (
    <ListGroupItem action className="text-right">
      <div>
        <div
          className="text-secondary"
          dangerouslySetInnerHTML={{ __html: expression }}
        />
        <div className="text-white" style={{ fontSize: '1.5rem' }}>
          {result}
        </div>
      </div>
    </ListGroupItem>
  )
}

HistoryItem.propTypes = {
  expression: PropTypes.string,
  result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

HistoryItem.defaultProps = {
  expression: '',
  result: '',
}
