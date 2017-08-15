import React from 'react';
import { Flex, Box } from 'reflexbox';

import Button from '../Button';

import s from './textInput.css';


const Message = (props) => {
  const {height,value,onInputChange, onSubmit} = {...props};


  return (
    <div className = {s.message} style = {{padding: `${height/4}px`}}>
      <input
        className = {s.messageInput}
        value={value}
        onChange={evt => onInputChange(evt)}
        onKeyUp = {evt => {evt.key === 'Enter' ? onSubmit() : null}}>
      </input>
      <Button  onClick = { () => onSubmit()}>
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
