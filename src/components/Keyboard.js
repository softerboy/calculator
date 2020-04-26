import React from 'react'
import Mousetrap from 'mousetrap'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { buttons, buttonsWillDisabledOnError } from '../common/constants'
import buttonGrid from '../common/keys'

function colorStyleFor(buttonId) {
  if (buttonId === buttons.BTN_EQUAL) {
    return 'equal-button'
  }

  if (buttonId > -1 && buttonId < 12) {
    return 'number-button'
  }

  return 'operation-button'
}

export default function Keyboard(props) {
  function renderCell(button) {
    const className = [
      'rounded-0',
      'h-100',
      'push-button',
      colorStyleFor(button.id),
    ]

    const disabled =
      props.disableKeypad && buttonsWillDisabledOnError.includes(button.id)
    if (disabled) className.push('text-secondary')

    return (
      <Button
        block
        variant="dark"
        disabled={disabled}
        className={className.join(' ')}
        onClick={props.onClick.bind(this, button.id)}
      >
        <span dangerouslySetInnerHTML={{ __html: button.symbol }} />
      </Button>
    )
  }

  function renderRow(row) {
    const colStyle = {
      margin: '0.06rem',
    }

    return row.map(function (cell, index) {
      return (
        <Col style={colStyle} key={index}>
          {renderCell(cell)}
        </Col>
      )
    })
  }

  return buttonGrid.map(function (row, index) {
    return (
      <Row className="flex-grow-1" noGutters key={index}>
        {renderRow(row)}
      </Row>
    )
  })
}

Keyboard.propTypes = {
  disableKeypad: PropTypes.bool,
  onClick: PropTypes.func,
}

Keyboard.defaultProps = {
  disableKeypad: false,
  onClick: function () {}, // noop
}

Keyboard.registerKeyBindings = function (handler) {
  for (let i = 0; i < buttonGrid.length; i++) {
    for (let j = 0; j < buttonGrid[i].length; j++) {
      const button = buttonGrid[i][j]
      Mousetrap.bind(
        button.shortcut,
        function () {
          handler(button.id)
        },
        'keyup',
      )
    }
  }
}

Keyboard.unregisterKeyBindings = function () {
  for (let i = 0; i < buttonGrid.length; i++) {
    for (let j = 0; j < buttonGrid[i].length; j++) {
      const key = buttonGrid[i][j]
      Mousetrap.unbind(key.shortcut, 'keyup')
    }
  }
}
