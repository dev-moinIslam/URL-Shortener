import { Button, Stack, TextField, Typography ,Box} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import  toast  from "react-hot-toast";
import { styled, alpha } from "@mui/material/styles";
import { SiCurl } from "react-icons/si";
import InputBase from "@mui/material/InputBase";


////////////////////////////Input Link Style//////////////////////////////
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

////////////////////////////Input Link Style End/////////////////////////////

/* -------------------------------------------------------------------------- */
/*                    here {inputValue} refers the Long Url                   */
/* -------------------------------------------------------------------------- */
const ShortResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  
  const handleCopyTex = () => {
    toast.success("Shorten Link is Copied");
  };
  /* -------------------------------------------------------------------------- */
  /*   Data fetch and convert Long URL to Shorten URL and store Local Storage   */
  /* -------------------------------------------------------------------------- */

  

  const fetchData = async () => {
    try {
      setLoading(true);
      // migrated to https://shrtlnk.dev/developer/ for shortLink api 
      const response = await axios.post(
            'https://shrtlnk.dev/api/v2/link',{url: inputValue},
            {
              headers: {
                "api-key":"meO8D8bCEsHOgnTn1xI42WdQXNeBYtUOn46c33zrJhH0R",
                Accept: 'application/json',
                "Content-Type": 'application/json'
              },
            }
          );

          const { shrtlnk } = response.data;
          setShortenLink(shrtlnk);
    

////////////////////////////////////////////////////////////////////////////////////

      // https://t.ly/links:::use this site api
      // const response = await axios.post(
      //   'https://t.ly/api/v1/link/shorten',
      //   {
      //     long_url: inputValue,
      //     domain: 'https://t.ly/',
      //     expire_at_datetime: '2035-01-17 15:00:00',
      //     public_stats: true,
      //   },
      //   {
      //     headers: {
      //       Authorization: 'Bearer 5LOEC4XD4JUvQrVAkuYoHTqWEEOrTvFuOjS8RHsQUHE7aCs28p6WINFlQMg3',
      //       'Content-Type': 'application/json',
      //       Accept: 'application/json',
      //     },
      //   }
      // );
      // const { short_url } = response.data;
      // setShortenLink(short_url);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
      // add urlData to localStorage
      let urlDatas=await JSON.parse(localStorage.getItem("urlDatas")  || "[]" )

      let urlData={
          id:new Date().getTime().toString(),
          longUrl:`${inputValue}`,
          sortUrl:`${shrtlnk}`
      }
      urlDatas.push(urlData)
      localStorage.setItem("urlDatas",JSON.stringify(urlDatas))



      // When we update or delete short link to from 
      // edit page the Short Link would not be delete or change in List page Funtionality:START

      let urlDataSets= JSON.parse(localStorage.getItem("urlDataSets")  || "[]" )

      let urlDataset={
          id:new Date().getTime().toString(),
          longUrl:`${inputValue}`,
          sortUrl:`${shrtlnk}`
      }
      urlDataSets.push(urlDataset)
      localStorage.setItem("urlDataSets",JSON.stringify(Object.freeze(urlDataSets)))
      
      // When we update or delete short link to from 
      // edit page the Short Link would not be delete or change in List page Funtionality:END
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  

    useEffect(() => {
      if (inputValue.length) {
        fetchData();
      }
    }, [inputValue]);

  if (loading) {
    return (
        <Typography 
          sx={{ 
            fontSize: "2rem",
            background: '-webkit-linear-gradient(#833ab4, #fd1d1d, #fcb045)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          }}>
          Loading...
        </Typography>
    );
  }

  if (error) {
    return (
        <Typography 
          sx={{ 
            fontSize: "2rem",
            background: '-webkit-linear-gradient(#833ab4, #fd1d1d, #fcb045)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          }}>
           Something went wrong!
        </Typography>
  );
  }

  return (
    <>
      {shortenLink && (
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{mr:5}}
          
        >
          {/* ------------------------- Shorten Url field Start ------------------------ */}
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
                    inputProps={{ "aria-label": "search",style: { fontFamily:'Noto Serif' } ,readOnly: true,}}
                    defaultValue={`${shortenLink}`}
                  />
                </LongUrlInputBox>
              </Box>
          {/* -------------------------- Shorten Url field End ------------------------- */}

          {/* ----------- Copy to clipboard funtionality add to button Start ----------- */}
          <CopyToClipboard onCopy={() => setCopied(true)} text={shortenLink}>
            <Button
              variant="contained"
              onClick={handleCopyTex}
              size="small"
              sx={{ bgcolor: "orangered",fontFamily:'Noto Serif',
                "&:hover":{
                  bgcolor: "#8E0E00"  
                }
              }}
            >
              Copy
            </Button>
          </CopyToClipboard>
          {/* ------------ Copy to clipboard funtionality add to button End ------------ */}
        </Stack>
      )}
    </>
  );
};

export default ShortResult;
