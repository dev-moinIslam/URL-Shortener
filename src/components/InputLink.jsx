import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { styled, alpha } from "@mui/material/styles";
import { SiCurl } from "react-icons/si";
import InputBase from "@mui/material/InputBase";


///////////////Input Box style Start/////////////
const LongUrlInputBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    height:50,
    display:'flex',
    alignItems:'center',
    fontFamily: "Noto Serif", 

  },
  color: "white",
  fontStyle:'italic',
  placeholdertextcolor:"blue"
}));

const ShrtLinkIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
///////////////Input Box style End/////////////


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
              <Box  
                sx={{
                  display: { xs: "flex" },
                  flexGrow: 1,
                }}
              >
                 <LongUrlInputBox>
                  <ShrtLinkIconWrapper>
                    <SiCurl />
                  </ShrtLinkIconWrapper>
                  <StyledInputBase
                    placeholder="Paste your Long URL"
                    inputProps={{ "aria-label": "search",style: { fontFamily:'Noto Serif' } }}
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                  />
                </LongUrlInputBox>
              </Box>
               
            <Button onClick={handleClick} variant="contained" 
              sx={{bgcolor: "orangered",fontFamily:'Noto Serif',
              "&:hover":{
                bgcolor: "#8E0E00"  
              }}}>Shorten</Button>           
         </Stack>
    </>
  )
}

export default InputLink