import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { charcterAction, cardAction } from '../redux/actions'

const Limited = () => {
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
    dispatch(cardAction.getCards())
    dispatch(cardAction.getFrames())
  }, [])

  const rarityRender = (n, type) => {
    const render = []
    for (let i=0; i < n; i++) {
      render.push(<image key={ i } href={ rarity[type].icon } height='14' width='14' x={5+(13*i)} y='59' />)
    }
    return render
  }

  if(characters === null || cards === null || frames === null || rarity === null)
    return

  return (
    <div>

      <Container className='lmt-list'>

        <Row className="justify-content-md-center">
          <Col className='lmt-col' md={2}></Col>
          {[1, 2, 3, 4].map((n, idx) => (
            <Col className='limited-col' key={ idx } md={2}>{ n }차</Col>
          ))}
        </Row>

        {characters.map((chr, idx) => (
          <Row className="justify-content-md-center" key={ idx } >
            <Col className='lmt-col' md={2}>
              <div>
                <img src={ chr.sd } className='lmt-sd' />
                { chr.name }
              </div>
            </Col>

            {[1, 2, 3, 4].map((n, idx) => (
            <Col className='lmt-col' key={ idx } md={2}>
              <div>
                {[0, 1].map((n, idx) => (
                  <svg className='lmt-tmb' width="78" height="78" xmlns="http://www.w3.org/2000/svg">
                    <image href={ cards[0].thumbnails[n] } width='70' height='70' x='4' y='4' />
                    <image href={ frames[cards[0].rarity-1].frame } width='78' height='78' />
                    <image href={ attributes[cards[0].attr_id-1].icon } width='17.5' height='17.5' x='0.5' y='0.5' />
                    { rarityRender(cards[0].rarity, n) }
                </svg>
                ))}
              </div>
            </Col>
          ))}
          </Row>
        ))}
      </Container>
    </div>
  )
}

export default Limited