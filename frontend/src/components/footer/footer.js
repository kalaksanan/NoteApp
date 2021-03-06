import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const footer = () => {
  return (
    <div
      style={{
        width: '100 %',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        bottom: '0',
      }}
    >
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ronny 2021</Col>
        </Row>
      </Container>
    </div>
  )
}

export default footer
