import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { charcterAction } from '../redux/actions'

const Limited = () => {
  const dispatch = useDispatch()
  const {
    characters
  } = useSelector((state) => state.character)

  useEffect(() => {
    dispatch(charcterAction.getCharacters())
  }, [])


  if(characters === null)
    return

  return (
    <div>

      <Container className='limited-list'>

        <Row className="justify-content-md-center">
          <Col className='limited-col' md={2}></Col>
          {[1, 2, 3, 4].map((n, idx) => (
            <Col className='limited-col' key={ idx } md={1}>{ n }차</Col>
          ))}
        </Row>

        {characters.map((chr, idx) => (
          <Row className="justify-content-md-center" key={ idx } >
            <Col className='limited-col' md={2}>
              <img src={ chr.sd } className='limited-sd' height='100' />
              { chr.name }
            </Col>

            {[1, 2, 3, 4].map((n, idx) => (
            <Col className='limited-col' key={ idx } md={1}>

            </Col>
          ))}
          </Row>
        ))}
      </Container>

      
    </div>
  )
}

export default Limited