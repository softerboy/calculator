import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Display from './Display'
import RightTabs from './RightTabs'
import ButtonGrid from './ButtonGrid'
import MemoryToolbar from './MemoryToolbar'

export default function MainLayout() {
  return (
    <Row className="flex-grow-1" noGutters>
      {/*left col with result display text and buttons*/}
      <Col md={9} className="d-flex flex-column">
        <Row>
          <Col className="text-white text-right">
            <Display expression="100 - 12 =" result="88" />
            <MemoryToolbar />
          </Col>
        </Row>
        <Row className="flex-grow-1">
          <Col className="d-flex flex-column flex-grow-1">
            <ButtonGrid />
          </Col>
        </Row>
      </Col>

      {/*right col with history and memory tabs*/}
      <Col md={3} className="d-none d-md-block">
        <RightTabs />
      </Col>
    </Row>
  )
}
