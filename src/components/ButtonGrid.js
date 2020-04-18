import React from 'react'
import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import buttonGrid from '../common/button-grid'

export default function ButtonGrid(props) {
  function renderCell(button) {
    return (
      <Button
        block
        variant="dark"
        className="rounded-0 h-100 push-button"
        onClick={props.onClick.bind(this, button)}
      >
        <span dangerouslySetInnerHTML={{ __html: button.symbol }} />
      </Button>
    )
  }

  function renderRow(row) {
    const colStyle = {
      margin: '0.05rem',
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
