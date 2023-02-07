import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap'
import { cardAction, futureAction } from '../redux/actions';
import moment from 'moment'
import 'moment/locale/ko';

const Future = () => {
  const mom = moment()
  const today = [parseInt(mom.format('YYYY')), parseInt(mom.format('MM'))]

  const [year, setYear] = useState(today[0])
  const [month, setMonth] = useState(today[1])
  const [cardMap, setCardMap] = useState(new Map())

  const dispatch = useDispatch()

  const {
    cards,
    frames,
    attributes,
    rarity
  } = useSelector((state) => state.card)

  const {
    future 
  } = useSelector((state) => state.future)

  useEffect(() => {
    dispatch(cardAction.getCards())
    dispatch(cardAction.getFrames())
    dispatch(futureAction.getFuture())
  }, [])

  useEffect(() => {
    if (cards === null)
      return

    let map = new Map()
    for (let i = 0; i < cards.length; i++) {
      map.set(cards[i].card_id, cards[i])
    }
    setCardMap(map)
  }, [cards])

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

  const rarityRender = (n) => {
    const render = []
    for (let i=0; i < n; i++)
      render.push(<image key={ i } href={ rarity[1].icon } height='14' width='14' x={5+(13*i)} y='59' />)
      
    return render
  }

  const cardRender = (cardId) => {
    const render = []
    const card = cardMap.get(cardId)

    render.push(
      <svg className='ftr-evt-img' width='78' height='78' xmlns='http://www.w3.org/2000/svg'>
        <image href={ card.thumbnails[1] } width='70' height='70' x='4' y='4' />
        <image href={ frames[card.rarity-1].frame } width='78' height='78' />
        <image href={ attributes[card.attr_id-1].icon } width='17.5' height='17.5' x='0.5' y='0.5' />
        { rarityRender(card.rarity) }
      </svg>
    )

    return render
  }

  if (future === null || cardMap === null)
    return

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

      <div>
        <ListGroup horizontal className='ftr-evt'>
          <ListGroup.Item>
            <div className='ftr-evt-txt ftr-evt-date'>
              { moment(future[0].available_from).format('MM/DD') } - { moment(future[0].available_until).format('MM/DD') }
            </div>
          </ListGroup.Item>
          <ListGroup.Item >
            <img className='ftr-evt-img' src={ future[0].banner } />
          </ListGroup.Item>
          <ListGroup.Item>
            <div className='ftr-evt-txt ftr-evt-title'>
              { future[0].title }
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className='ftr-evt-pick-up'>
              { future[0].pick_up_card_id.map((i, idx) => (
                cardRender(future[0].pick_up_card_id[idx])
              )) }
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  )
}

export default Future