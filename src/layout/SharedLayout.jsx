import React from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const SharedLayout = () => {
  return (
    <>
       <Box position={"relative"} justifyContent={"space-between" } 
       sx={{background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",pt:2, pl:3}} gap={6} display={"flex"} flexDirection={"row-reverse"} >
              <Sidebar />
            
            <Box sx={{flexGrow:1 ,bgcolor:"#ffffff", borderRadius:"16px",padding:3}}   >
                <TopBar title={"مغسلة السيارات الذكية"} />
                <Outlet />
            </Box>

       </Box>
    </>
  )
}
