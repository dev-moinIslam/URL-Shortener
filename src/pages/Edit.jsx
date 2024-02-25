import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast  from 'react-hot-toast'



const Edit = () => {
    const [rows,setRows]=useState(null)
    const [open,setOpen]=useState(false);
    const [inputValue,setInputValue]=useState('')
    const [isEditItem,setIsEditItem]=useState(null)
    const [updatedShortenLink,setUpdatedShortenLink]=useState("")
    const [dltOpen,setDltOpen]=useState(false);
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    const [isDltItem,setIsDltItem]=useState(null)


    /* -------------------------------------------------------------------------- */
    /*                            Update Functionality Start                      */
    /* -------------------------------------------------------------------------- */
    const editUrl=(id)=>{
        let newEditUrl=rows.find((elem)=>{
            return id===elem.id
        }) 
        setInputValue(newEditUrl.longUrl)
        setOpen(true);
        setIsEditItem(id)
    }
    const closePopup=()=>{
        setOpen(false);
    }

    const handleSubmit=()=>{
        let newUpdatedUrl = rows.map((elem) => {
            if (isEditItem === elem.id) {
              let updatedElem = { ...elem, longUrl: inputValue,sortUrl:updatedShortenLink,disable:false };
              return updatedElem;
            }
            return elem;
          });

          localStorage.setItem('urlDatas', JSON.stringify(newUpdatedUrl));
          setRows(newUpdatedUrl);
          setOpen(false);
          toast.success('Successfully updated URL')
    }

         /* -------------------------------------------------------------------------- */
         /*         Fetch data and set new short URL to table and localStorage         */
         /* -------------------------------------------------------------------------- */
        const fetchData=async ()=>{
            try{
                setLoading(true)

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
                  setUpdatedShortenLink(shrtlnk);


////////////////////////////////////////////////////////////////////////////////////

                // const response = await axios.post(
                //     'https://t.ly/api/v1/link/shorten',
                //     {
                //       long_url: inputValue,
                //       domain: 'https://t.ly/',
                //       expire_at_datetime: '2035-01-17 15:00:00',
                //       public_stats: true,
                //     },
                //     {
                //       headers: {
                //         Authorization: 'Bearer 5LOEC4XD4JUvQrVAkuYoHTqWEEOrTvFuOjS8RHsQUHE7aCs28p6WINFlQMg3',
                //         'Content-Type': 'application/json',
                //         Accept: 'application/json',
                //       },
                //     }
                //   );
                  
                
////////////////////////////////////////////////////////////////////////////////////
                
            }catch(err){
                setError(err)
            }finally{
                setLoading(false)
            }
        }
    
        useEffect(()=>{
            if(inputValue.length){
                fetchData()
            }
        },[inputValue])

        /* -------------------------------------------------------------------------- */
        /*                         Update Functionality End                           */
        /* -------------------------------------------------------------------------- */
    

     /* -------------------------------------------------------------------------- */
     /*                   Delete Shorten Url Functionality Start                   */
     /* -------------------------------------------------------------------------- */
    const dltShortUrl=()=>{
        let updatedAfterDltURL=rows.map((elem)=>{
            if (isDltItem === elem.id) {
                let updatedAfterDltElem = { ...elem, sortUrl:'',disable:true};                
                return updatedAfterDltElem;
              }
              
              return elem;
        })
        setDltOpen(false);
        setRows(updatedAfterDltURL);
        localStorage.setItem('urlDatas', JSON.stringify(updatedAfterDltURL));
        setDltOpen(false);
        toast.success("Shorten URL is deleted Successfully")

        
    }

    const openDltPopup=(id)=>{
        setDltOpen(true);
        setIsDltItem(id)
    }
    const closeDltPopup=()=>{
        setDltOpen(false);
    }

    /* -------------------------------------------------------------------------- */
    /*                    Delete Shorten Url Functionality End                    */
    /* -------------------------------------------------------------------------- */

    
    /* ------------------------ Table heading column data ----------------------- */
    const columns=[
        {id:'id',name:'Serial'},
        {id:'longurl',name:'Long URL'},
        {id:'shorturl',name:'Shorten URL'}
    ]

    /* -------------- Access localStorage data and store it in rows ------------- */
    useEffect(()=>{
        const UrlDataList=JSON.parse(localStorage.getItem("urlDatas"))
           if(UrlDataList){
                setRows(UrlDataList)
            
           } 

    },[])


  return (
    <>
        <Box sx={{height:"calc(100vh + 60px)",display:'flex',justifyContent:'center',alignItems:"center",background: 'linear-gradient(to right, #8e0e00, #1f1c18)'}}>
            {
                (inputValue=='') ? (
                    <>
                       <Typography
                            sx={{ 
                                fontSize: "2rem",
                                background: '-webkit-linear-gradient(#833ab4, #fd1d1d, #fcb045)',
                            '-webkit-background-clip': 'text',
                            '-webkit-text-fill-color': 'transparent',
                            }}
                        >
                            There is no available data
                        </Typography>
                    </>
                ) : (
                    <>
                        <Paper sx={{width:{xs:'95%',sm:'90%',md:'80%'}}} >
                            <TableContainer sx={{maxHeight:'450px',fontFamily: 'Noto Serif',background: 'linear-gradient(to right, #cb356b, #bd3f32)'}}>
                                <Table stickyHeader>
                                {/* ---------------------------- Start table head ---------------------------- */}
                                    <TableHead>
                                        <TableRow>
                                            {
                                                columns && columns.map((column)=>(
                                                    <TableCell sx={{bgcolor:'gray',color:'white',fontFamily: 'Noto Serif',fontWeight:'500',letterSpacing:'2px',fontSize:'15px'}} key={column.id}>{column.name}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    {/* ----------------------------- End table head ----------------------------- */}

                                { /* ---------------------------- Start Table body ---------------------------- */}
                                    <TableBody>
                                        {
                                            rows && rows.map((row,i)=>{
                                                return(
                                                    <TableRow key={row.id}>
                                                        <TableCell sx={{color:'wheat'}}>{i+1}</TableCell>
                                                        {/* -------------------------------------------------------------------------- */}
                                                        {/*                    Long URL table Column cell start Here                   */}
                                                        {/* -------------------------------------------------------------------------- */}
                                                        <TableCell key={row.id} sx={{color:'whitesmoke'}}>
                                                            <Stack direction="row" spacing={2} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'15px'}}>
                                                                {row.longUrl}
                                                                <Box component={'div'}>
                                                                    <Paper sx={{bgcolor:'whitesmoke'}} component={Button} onClick={()=>editUrl(row.id)} ><EditIcon sx={{fontSize:'20px',color:'green',cursor:'pointer'}}/></Paper>
                                                                    <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
                                                                    <DialogTitle>UPDATE LONG URL  <IconButton onClick={closePopup} style={{float:'right'}}><CloseIcon color="primary"/></IconButton>  </DialogTitle>
                                                                        <DialogContent>
                                                                            <Stack spacing={2} margin={2}>
                                                                            <TextField variant="outlined" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></TextField>
                                                                            <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                                                                            </Stack>
                                                                        </DialogContent>
                                                                    </Dialog> 
                                                                </Box>
                                                            </Stack>
                                                        </TableCell>
                                                        {/* -------------------------------------------------------------------------- */}
                                                        {/*                     Long URL table Column cell End Here                    */}
                                                        {/* -------------------------------------------------------------------------- */}

                                                        {/* -------------------------------------------------------------------------- */}
                                                        {/*                  Shorten URL table Column cell start Here                  */}
                                                        {/* -------------------------------------------------------------------------- */}
                                                        <TableCell key={row.id-1} sx={{color:'whitesmoke'}}>
                                                            <Stack direction="row" spacing={2} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'15px',cursor:'pointer'}}>
                                                                {row.sortUrl}
                                                                <Box component={'div'}>
                                                                    {
                                                                        row.disable ? 
                                                                        <Paper component={Button} sx={{bgcolor:'whitesmoke'}} ><DeleteOutlineIcon sx={{fontSize:'20px',color:'gray'}}/></Paper>
                                                                        :
                                                                        <Paper component={Button} key={row.id}  onClick={()=>openDltPopup(row.id)} ><DeleteOutlineIcon sx={{fontSize:'20px',color:'orangered'}}/></Paper>

                                                                    }
                                                                    <Dialog
                                                                        open={dltOpen}
                                                                        onClose={closeDltPopup}
                                                                        aria-labelledby="alert-dialog-title"
                                                                        aria-describedby="alert-dialog-description"
                                                                    >
                                                                        <DialogContent>
                                                                        <DialogContentText id="alert-dialog-description">
                                                                        Do You want to delete Shorten Url?
                                                                        </DialogContentText>
                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                        <Button onClick={closeDltPopup}>NO</Button>
                                                                        <Button onClick={dltShortUrl} autoFocus>
                                                                            YES
                                                                        </Button>
                                                                        </DialogActions>
                                                                    </Dialog> 
                                                                </Box>
                                                                
                                                            </Stack>
                                                        </TableCell>
                                                        {/* -------------------------------------------------------------------------- */}
                                                        {/*                     Long URL table Column cell End Here                    */}
                                                        {/* -------------------------------------------------------------------------- */}
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                                {/* ----------------------------- {End Table Body ----------------------------- */}
                            </TableContainer>
                        </Paper>
                    </>
                )
            }

            <Paper sx={{width:{xs:'95%',sm:'90%',md:'80%'}}} >
                <TableContainer sx={{maxHeight:'450px',fontFamily: 'Noto Serif',background: 'linear-gradient(to right, #cb356b, #bd3f32)'}}>
                    <Table stickyHeader>
                    {/* ---------------------------- Start table head ---------------------------- */}
                        <TableHead>
                            <TableRow>
                                {
                                    columns && columns.map((column)=>(
                                        <TableCell sx={{bgcolor:'gray',color:'white',fontFamily: 'Noto Serif',fontWeight:'500',letterSpacing:'2px',fontSize:'15px'}} key={column.id}>{column.name}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        {/* ----------------------------- End table head ----------------------------- */}

                       { /* ---------------------------- Start Table body ---------------------------- */}
                        <TableBody>
                            {
                                rows && rows.map((row,i)=>{
                                    return(
                                        <TableRow key={row.id}>
                                            <TableCell sx={{color:'wheat'}}>{i+1}</TableCell>
                                            {/* -------------------------------------------------------------------------- */}
                                            {/*                    Long URL table Column cell start Here                   */}
                                            {/* -------------------------------------------------------------------------- */}
                                            <TableCell key={row.id} sx={{color:'whitesmoke'}}>
                                                <Stack direction="row" spacing={2} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'15px'}}>
                                                    {row.longUrl}
                                                    <Box component={'div'}>
                                                        <Paper sx={{bgcolor:'whitesmoke'}} component={Button} onClick={()=>editUrl(row.id)} ><EditIcon sx={{fontSize:'20px',color:'green',cursor:'pointer'}}/></Paper>
                                                        <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
                                                        <DialogTitle>UPDATE LONG URL  <IconButton onClick={closePopup} style={{float:'right'}}><CloseIcon color="primary"/></IconButton>  </DialogTitle>
                                                            <DialogContent>
                                                                <Stack spacing={2} margin={2}>
                                                                <TextField variant="outlined" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></TextField>
                                                                <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                                                                </Stack>
                                                            </DialogContent>
                                                        </Dialog> 
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                            {/* -------------------------------------------------------------------------- */}
                                            {/*                     Long URL table Column cell End Here                    */}
                                            {/* -------------------------------------------------------------------------- */}

                                            {/* -------------------------------------------------------------------------- */}
                                            {/*                  Shorten URL table Column cell start Here                  */}
                                            {/* -------------------------------------------------------------------------- */}
                                            <TableCell key={row.id-1} sx={{color:'whitesmoke'}}>
                                                <Stack direction="row" spacing={2} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'15px',cursor:'pointer'}}>
                                                    {row.sortUrl}
                                                    <Box component={'div'}>
                                                        {
                                                            row.disable ? 
                                                            <Paper component={Button} sx={{bgcolor:'whitesmoke'}} ><DeleteOutlineIcon sx={{fontSize:'20px',color:'gray'}}/></Paper>
                                                            :
                                                            <Paper component={Button} key={row.id}  onClick={()=>openDltPopup(row.id)} ><DeleteOutlineIcon sx={{fontSize:'20px',color:'orangered'}}/></Paper>

                                                        }
                                                        <Dialog
                                                            open={dltOpen}
                                                            onClose={closeDltPopup}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                               Do You want to delete Shorten Url?
                                                            </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                            <Button onClick={closeDltPopup}>NO</Button>
                                                            <Button onClick={dltShortUrl} autoFocus>
                                                                YES
                                                            </Button>
                                                            </DialogActions>
                                                        </Dialog> 
                                                    </Box>
                                                    
                                                </Stack>
                                            </TableCell>
                                            {/* -------------------------------------------------------------------------- */}
                                            {/*                     Long URL table Column cell End Here                    */}
                                            {/* -------------------------------------------------------------------------- */}
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    {/* ----------------------------- {End Table Body ----------------------------- */}
                </TableContainer>
            </Paper>
        </Box>
    </>
  )
}

export default Edit

