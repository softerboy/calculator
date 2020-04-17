import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import ButtonGrid from './ButtonGrid'
import RightTabs from './RightTabs'

export default function MainLayout() {
  return (
    <Container className="p-0" fluid>
      <Row noGutters>
        {/*left col with result display text and buttons*/}
        <Col md={9}>
          <Row>
            <Col className="text-white text-right">
              <h1>User entered input would display here</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonGrid />
            </Col>
          </Row>
        </Col>

        {/*right col with history and memory tabs*/}
        <Col md={3} className="d-none d-md-block">
          <RightTabs />
        </Col>
      </Row>
    </Container>
  )
}
