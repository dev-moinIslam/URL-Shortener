import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'



const InputLink = ({setInputValue}) => {
    const [value,setValue]=useState('')

    const handleClick=()=>{
        setInputValue(value) //It reffers the Long Url
        setValue("")
    }
  return (
    <>
    {/* -------------------------------------------------------------------------- */}
    {/*                        Input Long Url Functionality                        */}
    {/* -------------------------------------------------------------------------- */}
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            <TextField
            id="filled-multiline-flexible"
            label="Actual Link"
            maxRows={4}
            variant="filled"
            sx={{bgcolor:'white'}}
            value={value}
            onChange={e=>setValue(e.target.value)}
            />
            <Button onClick={handleClick} variant="contained" sx={{bgcolor:'purple'}}>Shorten</Button>           
         </Stack>
    </>
  )
}

export default InputLink