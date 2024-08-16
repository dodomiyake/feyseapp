import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'


const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Box sx={{ mt: '80px', p: 2 }}>
        <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </Box>
      
    </div>
  )
}

export default App
