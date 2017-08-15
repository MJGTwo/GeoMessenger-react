import React from 'react';

import s from './button.css';

export default function Button(props){

  return(
    <button className = {s.button}>
      {props.children}
    </button>
  )
}
