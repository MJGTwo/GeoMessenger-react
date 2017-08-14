import React from 'react';
import { Flex, Box } from 'reflexbox';
import s from './textInput.css';

export default function TextInput(props){
  const {height,value,onInputChange} = {...props};



  return (
    <div className = {s.textInput} style = {{height : `${height}px`}}>
      <Flex>
        <Box w= {7/8} >
          <input className = {s.tiInput} value={value} onChange={evt => onInputChange(evt)}>
          </input>
        </Box>
        <Box w = {1/8}>
          <div className = {s.tiButton}>
            Submit
          </div>
        </Box>
      </Flex>


    </div>
  )
}
