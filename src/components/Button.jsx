import React from 'react'
import '../css/button.css'

function Button(props) {

  return (
    <div onClick={props.onClick} className='button'>{props.buttonText}</div>
  )
}

export default Button