import React from 'react'
import PropTypes from 'prop-types'

export default function Display(props) {
  const { expression, result } = props
  return (
    <div className="d-block text-right p-4">
      <span
        className="text-secondary d-block"
        style={{ fontSize: '0.9em', minHeight: 30 }}
        dangerouslySetInnerHTML={{ __html: expression }}
      />
      <h1 style={{ fontSize: '6vw', lineHeight: '6vw' }}>{result}</h1>
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
