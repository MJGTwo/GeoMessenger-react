import React from 'react';
import { Flex, Box } from 'reflexbox';

import Button from '../Button';

import s from './textInput.css';


const Message = (props) => {
  const {height,value,onInputChange, onSubmit, disabled} = {...props};

  const enterKeyHandle = (evt) => {
    const key = evt.key;
    if (key === 'Enter'){
      onSubmit()
    }
  }


  return (
    <div className = {s.message} style = {{padding: `${height/4}px`}}>
      <input
        className = {s.messageInput}
        value={value}
        disabled = {disabled}
        onChange={evt => onInputChange(evt)}
        onKeyUp = {evt => enterKeyHandle(evt)}>
      </input>
      <Button
        disabled = {disabled}
        onClick = { () => onSubmit()}>
        Submit
      </Button>
    </div>
  )
}





export default function InputBar(props){
  const {height} = {...props};

  return (
    <div className = {s.textInput} style = {{height : `${height}px`}}>
      <Flex>
        <Box w= {1/7} />
        <Box w= {5/7} >
              <Message {...props}/>
        </Box>
        <Box w= {1/7} />
      </Flex>



    </div>
  )
}
