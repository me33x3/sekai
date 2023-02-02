import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ko';

const Future = () => {
  const mom = moment()
  const year = mom.format('YYYY')
  const month = mom.format('MM')

  return (
    <div>
      <Container className='ftr-date-area'>
        <Row className="justify-content-md-center">
          <Col className='ftr-date-col' md='auto'>
            <Button variant="light" size='sm'>&lt;</Button>
          </Col>
          <Col className='ftr-date-col' md={ 2 }>
            <div>
              <p className='ftr-txt-month'>{ month }</p>
              <p className='ftr-txt-year'>{ year }</p>
            </div>
          </Col>
          <Col className='ftr-date-col' md='auto'>
            <Button variant="light" size='sm'>&gt;</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Future