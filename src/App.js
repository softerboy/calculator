import React from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'

function App() {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Alert variant="success">
            The react bootstrap successfully setup
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default App
