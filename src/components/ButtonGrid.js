import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import symbolGrid from '../common/symbols'

export default function ButtonGrid() {
  function renderCell(cell) {
    return (
      <Button block variant="dark" className="rounded-0 h-100 push-button">
        <span dangerouslySetInnerHTML={{ __html: cell }} />
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

  return symbolGrid.map(function (row, index) {
    return (
      <Row className="flex-grow-1" noGutters key={index}>
        {renderRow(row)}
      </Row>
    )
  })
}
