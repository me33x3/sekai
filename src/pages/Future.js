import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/ko';

const Future = () => {
  const mom = moment()
  const today = [parseInt(mom.format('YYYY')), parseInt(mom.format('MM'))]

  const [year, setYear] = useState(today[0])
  const [month, setMonth] = useState(today[1])

  const prevMonth = () => {
    if (year === today[0] && month === today[1]) {
      return
    } else if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div>
      <Container className='ftr-date-area'>
        <Row className="justify-content-md-center">
          <Col className='ftr-date-col' md='auto'>
            <Button variant="light" size='sm' onClick={() => prevMonth()}>&lt;</Button>
          </Col>
          <Col className='ftr-date-col' md={ 2 }>
            <div>
              <p className='ftr-txt-month'>{ String(month).padStart(2, '0') }</p>
              <p className='ftr-txt-year'>{ year }</p>
            </div>
          </Col>
          <Col className='ftr-date-col' md='auto'>
            <Button variant="light" size='sm' onClick={() => nextMonth()}>&gt;</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Future