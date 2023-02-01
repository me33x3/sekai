import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { charcterAction, cardAction } from '../redux/actions'
import axios from 'axios'

const Limited = () => {
  const [cardMap, setCardMap] = useState(new Map())
  const [maxCount, setMaxCount] = useState(0)

  const dispatch = useDispatch()

  const {
    characters
  } = useSelector((state) => state.character)

  const {
    cards,
    frames,
    attributes,
    rarity
  } = useSelector((state) => state.card)

  useEffect(() => {
    dispatch(charcterAction.getCharacters())
    dispatch(cardAction.getCardsByType('limited,colorful,collabo'))
    dispatch(cardAction.getFrames())
  }, [])

  useEffect(() => {
    if (cards === null)
      return

    let map = new Map()
    let count = 0

    for (let i = 0; i < cards.length; i++) {
      let chr_id = cards[i].chr_id

      if (map.has(chr_id)) {
        let temp = map.get(chr_id)
        temp.push(cards[i])
        map.set(chr_id, temp)
        count = count < temp.length ? temp.length : count
      } else {
        map.set(chr_id, [cards[i]])
      }
    }

    setCardMap(map)
    setMaxCount(count)
  }, [cards])

  const rarityRender = (n, type) => {
    const render = []

    for (let i=0; i < n; i++) {
      render.push(<image key={ i } href={ rarity[type].icon } height='14' width='14' x={5+(13*i)} y='59' />)
    }

    return render
  }

  const cardRender = (chrid) => {
    const render = []
    const cardList = cardMap.get(chrid)

    for (let i = 0; i < maxCount; i++) {
      if (cardList.length - 1 < i) {
        render.push(<Col className='lmt-col' key={ i } md={ 2 }></Col>)
      } else {
        render.push(
          <Col className='lmt-col' key={ i } md={ 2 }>
            <div>
              {[0, 1].map((n, idx) => (
                <svg className='lmt-tmb' key={ idx } width='78' height='78' xmlns='http://www.w3.org/2000/svg'>
                  <image href={ cardList[i].thumbnails[n] } width='70' height='70' x='4' y='4' />
                  <image href={ frames[cardList[i].rarity-1].frame } width='78' height='78' />
                  <image href={ attributes[cardList[i].attr_id-1].icon } width='17.5' height='17.5' x='0.5' y='0.5' />
                  { rarityRender(cardList[i].rarity, n) }
                </svg>
              ))}
            </div>
          </Col>
        )
      }
    }

    return render
  }

  if(characters === null || cards === null || frames === null || rarity === null)
    return

  return (
    <div>

      <Container className='lmt-list'>

        <Row className="justify-content-md-center">
          <Col className='lmt-col' md={ 2 }></Col>
          {[1, 2, 3, 4].map((n, idx) => (
            <Col className='lmt-col' key={ idx } md={ 2 }>{ n }차</Col>
          ))}
        </Row>

        {characters.map((chr, idx) => (
          <Row className="justify-content-md-center" key={ idx } >
            <Col className='lmt-col' md={ 2 }>
              <div>
                <img src={ chr.sd } className='lmt-sd' />
                { chr.name }
              </div>
            </Col>

            { cardRender(chr.chr_id) }
          </Row>
        ))}
      </Container>
    </div>
  )
}

export default Limited