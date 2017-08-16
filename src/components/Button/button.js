import React from 'react';

import s from './button.css';

export default function Button(props){
  let name = props.disabled ? s.Dbutton : s.button;
  return(
    <button className = {name} {...props}>
      {props.children}
    </button>
  )
}
