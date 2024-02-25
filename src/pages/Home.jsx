import { Box } from '@mui/material'
import React, { useState } from 'react'
import ShortResult from '../components/ShortResult'
import InputLink from '../components/InputLink'


const Home = () => {
    const [inputValue,setInputValue]=useState('')
  return (
    <Box 
      sx={{ 
        height: '100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background: 'linear-gradient(to right, #cb356b, #bd3f32)'
      }}>
      <Box 
        sx={{
          height:300,
          minWidth:350,
          p:5,
          m:2,
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          gap:5 ,
          background: 'linear-gradient(to right, #8e0e00, #1f1c18)'
          }}>
        <InputLink setInputValue={setInputValue}/>
        <ShortResult inputValue={inputValue}/>
      </Box>
    </Box>
  )
}

export default Home