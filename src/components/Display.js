import React from 'react'
import PropTypes from 'prop-types'

export default function Display(props) {
  const { expression, result } = props
  return (
    <div className="d-block text-right p-4" style={{ minHeight: 200 }}>
      <span className="text-secondary" style={{ fontSize: '0.9em' }}>
        {expression}
      </span>
      <h1 style={{ fontSize: '5em' }}>{result}</h1>
    </div>
  )
}

Display.propTypes = {
  expression: PropTypes.string,
  result: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Display.defaultProps = {
  expression: '',
  result: '',
}
