import { Box, Container } from '@mui/material'
import React, { useState } from 'react'
import ShortResult from '../components/ShortResult'
import InputLink from '../components/InputLink'


const Home = () => {
    const [inputValue,setInputValue]=useState('')
  return (
    <Container maxWidth="sm">
    <Box  sx={{ height: 'calc(100vh - 100px)',display:'flex',flexDirection:'column',rowGap:'20px',alignItems:'center',justifyContent:'center' }}>
         <InputLink setInputValue={setInputValue}/>
         <ShortResult inputValue={inputValue}/>
    </Box>
    </Container>
  )
}

export default Home