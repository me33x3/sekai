import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
      Limited
      {characters.map((chr, idx) => (
        <p key={ idx }>{ chr.chr_nm }</p>
      ))}
    </div>
  )
}

export default Limited