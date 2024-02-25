import { Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";


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
    return <Typography sx={{ fontSize: "2rem" }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography sx={{ fontSize: "2rem" }}>Something Wrong!</Typography>;
  }

  /* ------------------------ TextField Style property ------------------------ */
  let style = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", // Change the border color here
      },
      "&:hover fieldset": {
        borderColor: "skyblue", // Change the border color on hover here
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // Change the border color when focused here
      },
    },
    "& .MuiInputBase-input": {
      color: "white", // Change this to the desired text color
    },
  };

  return (
    <>
      {shortenLink && (
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {/* ------------------------- Shorten Url field Start ------------------------ */}
          <TextField
            sx={style}
            id="outlined-read-only-input"
            defaultValue={`${shortenLink}`}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* -------------------------- Shorten Url field End ------------------------- */}

          {/* ----------- Copy to clipboard funtionality add to button Start ----------- */}
          <CopyToClipboard onCopy={() => setCopied(true)} text={shortenLink}>
            <Button
              variant="contained"
              onClick={handleCopyTex}
              size="small"
              sx={{ bgcolor: "purple" }}
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
