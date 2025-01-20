import { useState } from 'react'

import './App.css'
import Navbarheader from './components/Navbarheader'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Starting from './pages/Starting'
import Getsuggestion from './pages/Getsuggestion'

function App() {
  return (
    <div className="container-fluid" style={{overflowX:'hidden'}}>
      <Navbarheader/>
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/Starting' element={<Starting/>}></Route>
      <Route path='/Getsuggestion' element={<Getsuggestion/>}></Route>
      </Routes>
    </div>
  )
}

export default App
