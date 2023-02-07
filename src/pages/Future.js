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
  const [init, setInit] = useState(false)
  const [si, setSI] = useState(0)
  const [ei, setEI] = useState(0)
  const [futureList, setFutureList] = useState(null)

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

  useEffect(() => {
    if (future === null && !init)
      return

    setInit(true)
    
    for (let i=0; i < future.length; i++) {
      let sy = parseInt(moment(future[i].available_from).format('YYYY'))
      let sm = parseInt(moment(future[i].available_from).format('MM'))
      let ey = parseInt(moment(future[i].available_until).format('YYYY'))
      let em = parseInt(moment(future[i].available_until).format('MM'))

      if (!((sy === year && sm === month) || (ey === year && em === month))) {
        setEI(i - 1)
        break
      }
    }
  }, [future])

  useEffect(() => {
    if (!init)
      return

    let temp = []

    for (let i=si; i <= ei; i++) {
      temp.push(future[i])
    }

    setFutureList(temp)
  }, [ei])

  useEffect(() => {
    if (future === null)
      return

    let tsi = si
    let tei = ei

    const target = new Date(year, month, 1)
    const compare = new Date(parseInt(moment(future[tsi].available_until).format('YYYY')), parseInt(moment(future[tsi].available_until).format('MM')), 1)

    if (target < compare) {
      if (month === parseInt(moment(future[tsi].available_from).format('MM')))
        tei = tsi
      else
        tei = tsi - 1
      tsi -= 1

      while (tsi >= 0 && month === parseInt(moment(future[tsi].available_until).format('MM'))) {
        tsi--
      }
      tsi++
    } else {
      if (month === parseInt(moment(future[tei].available_until).format('MM')))
        tsi = tei
      else
        tsi = tei + 1
      tei += 1

      while (tei < future.length && month === parseInt(moment(future[tei].available_from).format('MM'))) {
        tei++
      }
      tei--
    }

    setSI(tsi)
    setEI(tei)
  }, [month])

  const prevMonth = () => {
    if (si === 0) {
      return
    } else if (month === 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  const nextMonth = () => {
    if (ei === future.length-1) {
      return
    } else if (month === 12) {
      setMonth(1)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  const rarityRender = (n) => {
    const render = []
    for (let i=0; i < n; i++)
      render.push(<image key={ i } href={ rarity[n === 2 ? 0 : 1].icon } height='14' width='14' x={5+(13*i)} y='59' />)

    return render
  }

  const cardRender = (cardId) => {
    const render = []
    const card = cardMap.get(cardId)

    render.push(
      <svg className='ftr-evt-img' width='78' key={ cardId } height='78' xmlns='http://www.w3.org/2000/svg'>
        <image href={ card.thumbnails[card.rarity === 2 ? 0 : 1] } width='70' height='70' x='4' y='4' />
        <image href={ frames[card.rarity-1].frame } width='78' height='78' />
        <image href={ attributes[card.attr_id-1].icon } width='17.5' height='17.5' x='0.5' y='0.5' />
        { rarityRender(card.rarity) }
      </svg>
    )

    return render
  }

  if (futureList === null || cardMap === null)
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
        {
          futureList.map((item, idx) => (
            <ListGroup horizontal className='ftr-evt' key={ idx }>
              <ListGroup.Item>
                <div className='ftr-evt-txt ftr-evt-date'>
                  { moment(item.available_from).format('MM/DD') } - { moment(item.available_until).format('MM/DD') }
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='ftr-evt-banner'>
                  <img className='ftr-evt-img' src={ item.banner } />
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='ftr-evt-txt ftr-evt-title'>
                  { item.title }
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='ftr-evt-pick-up'>
                  { item.pick_up_card_id.map((card_id) => (
                    cardRender(card_id)
                  )) }
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))
        }
        
      </div>
    </div>
  )
}

export default Future