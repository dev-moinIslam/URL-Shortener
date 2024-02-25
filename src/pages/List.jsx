import { Box, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                       All shorted url are functionally showed here                      */
/* -------------------------------------------------------------------------- */
const List = () => {
    const [rows,setRows]=useState(null)
    const columns=[
        {id:'id',name:'Serial No.'},
        {id:'shorturl',name:'Shorten URL'}
    ]
// When we delete sort link the shortlink from will not be deleted from List page Functionality:START
    useEffect(()=>{
        const UrlDatas=JSON.parse(localStorage.getItem("urlDataSets"))
           if(UrlDatas){
            setRows(UrlDatas)
           } 

    },[])
// When we delete sort link the shortlink from will not be deleted from List page Functionality:End

    

// When we delete sort link the shortlink from will be deleted from List page Functionality:START
    // useEffect(()=>{
    //     const UrlDatas=JSON.parse(localStorage.getItem("urlDatas"))
    //        if(UrlDatas){
    //         setRows(UrlDatas)
    //        } 

    // },[])
    // // Filter rows data to set it in the table
    // const filteredData = rows.filter(item => item.sortUrl && item.sortUrl.trim() !== '');

    // When we delete sort link the shortlink from will be deleted from List page Functionality:END


  return (
    <>
        <Box sx={{height:"calc(100vh + 60px)",display:'flex',justifyContent:'center',alignItems:"center",background: 'linear-gradient(to right, #8e0e00, #1f1c18)'}}>
            {
                (rows==null) ? (
                    <>
                        <Typography
                            sx={{ 
                                fontSize: "2rem",
                                background: '-webkit-linear-gradient(#833ab4, #fd1d1d, #fcb045)',
                                '-webkit-background-clip': 'text',
                                '-webkit-text-fill-color': 'transparent',
                            }}
                        >
                            There is no available history
                        </Typography>
                    </>
                ):(
                    <>
                        <Paper sx={{width:{xs:'95%',sm:'90%',md:'80%',lg:'50%'}}} >
                            <TableContainer sx={{maxHeight:"450px",background: 'linear-gradient(to right, #cb3561, #bd3f36)'}}>
                                <Table stickyHeader>
                                    <TableHead>
                                    {/* ----------------------- (Label add to the Table head start) ---------------------- */}
                                        <TableRow>
                                            {
                                                columns && columns.map((column)=>(
                                                    <TableCell sx={{bgcolor:'gray',color:'white',fontWeight:'500',letterSpacing:'2px',fontSize:'15px',fontFamily: 'Noto Serif'}} key={column.id}>{column.name}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    {/* --------------------- (Label add to the Table head End )-------------------- */}
                                    </TableHead>
                                    <TableBody>
                                        {
                                            rows && rows.map((row,i)=>{
                                                // console.log(row)
                                                return( 
                                                    <TableRow key={row.id}>
                                                        <TableCell sx={{color:'whitesmoke'}} >{i+1}</TableCell>
                                                        {/* --------------------------------------------------------------------------  */}
                                                                        {/* (All shorten Url are Listed here start  )                */}
                                                        {/* --------------------------------------------------------------------------   */}
                                                            <TableCell >
                                                                <Stack direction="row" spacing={2} >
                                                                <Link href={`${row.longUrl}`} target="_blank" rel="noopener"  sx={{color:'whitesmoke'}}>
                                                                    {row.sortUrl}
                                                                </Link> 
                                                                </Stack>
                                                            </TableCell>
                                                            {/* -------------------------------------------------------------------------- */}
                                                                {/*         (All shorten Url are Listed here start )                  */}
                                                            {/* -------------------------------------------------------------------------- */}
                                                    </TableRow>
                                                
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
            }
            
        </Box>
    </>
  )
}

export default List

