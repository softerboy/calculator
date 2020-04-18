import React from 'react'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { buttons } from '../common/constants'
import buttonGrid from '../common/button-grid'

function colorStyleFor(buttonId) {
  if (buttonId === buttons.BTN_EQUAL) {
    return 'equal-button'
  }

  if (buttonId > -1 && buttonId < 12) {
    return 'number-button'
  }

  return 'operation-button'
}

export default function ButtonGrid(props) {
  function renderCell(button) {
    const className = 'rounded-0 h-100 push-button ' + colorStyleFor(button.id)

    return (
      <Button
        block
        variant="dark"
        className={className}
        onClick={props.onClick.bind(this, button)}
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

ButtonGrid.propTypes = {
  onClick: PropTypes.func,
}

ButtonGrid.defaultProps = {
  onClick: function () {}, // noop
}
