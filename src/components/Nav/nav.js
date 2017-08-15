import React from 'react';
import { Flex, Box } from 'reflexbox';

import Button from '../Button';

import s from './nav.css';

export default function Nav(props){
  const {height, account} = {...props};

  const renderAccount = () => {
    if (account.loggedIn){
      return (
        <div>
          {`Welcome, ${account.name}!`}
        </div>
      )
    }
    else {
      return (
        <Button>
          Login
        </Button>
      )
    }
  }

  return(
    <div className = {s.nav} style = {{width : window.innerWidth, height : `${height}px`}}>
      <Flex>
        <Box className = {s.navBrand} w = {1/3} p ={2}>
          GeoMessenger
        </Box>
        <Box w = {1/2} p = {2}/>
        <Box w = {1/6} p = {2}>
          {renderAccount()}
        </Box>
      </Flex>

    </div>
  )
}
