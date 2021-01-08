import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Landing = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>
        <strong>SurveyMonkey</strong>
      </h1>
      An application for collecting feedback from large number of users by
      email.
      <Container>
        <Row className='fixed-bottom'>
          <Col className='text-center py-4'>
            Copyright &copy; SurveyMonkey - Presented by Group 6, CS 5610 Fall
            2020 Sem
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Landing
