import React from 'react';
import { Flex, Box } from 'reflexbox';
import s from './nav.css';

export default function Nav(props){
  const {height} = {...props};
  return(
    <div className = {s.nav} style = {{width : window.innerWidth, height : `${height}px`}}>
      <Flex>
        <Box className = {s.navBrand} w = {1/3} p ={2}>
          GeoMessenger
        </Box>
      </Flex>

    </div>
  )
}
