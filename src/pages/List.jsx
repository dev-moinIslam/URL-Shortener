import { Box, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                       All shorted url are functionally showed here                      */
/* -------------------------------------------------------------------------- */
const List = () => {
    const [rows,setRows]=useState([])
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
    // Filter rows data to set it in the table
    // const filteredData = rows.filter(item => item.sortUrl && item.sortUrl.trim() !== '');

    // When we delete sort link the shortlink from will be deleted from List page Functionality:END


  return (
    <>
        <Box sx={{display:'flex',justifyContent:'center',marginTop:'10px',}}>
            <Paper sx={{width:'80%'}} >
                <TableContainer sx={{maxHeight:'450px'}}>
                    <Table stickyHeader>
                        <TableHead>
                         {/* ----------------------- (Label add to the Table head start) ---------------------- */}
                            <TableRow>
                                {
                                    columns && columns.map((column)=>(
                                        <TableCell sx={{bgcolor:'gray',color:'white',fontWeight:'Bold',letterSpacing:'2px',fontSize:'15px'}} key={column.id}>{column.name}</TableCell>
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
                                            <TableCell >{i+1}</TableCell>
                                             {/* --------------------------------------------------------------------------  */}
                                                               {/* (All shorten Url are Listed here start  )                */}
                                            {/* --------------------------------------------------------------------------   */}
                                                <TableCell >
                                                    <Stack direction="row" spacing={2} >
                                                    <Link href={`${row.longUrl}`} target="_blank" rel="noopener">
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
        </Box>
    </>
  )
}

export default List

