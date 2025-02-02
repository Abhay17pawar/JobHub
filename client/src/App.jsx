import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { AuroraHero } from './components/Design'
import JobDashboard from './components/Dashboard';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuroraHero/>}/>
        <Route path='/Jobs-Dashboard' element={<JobDashboard />}/>
      </Routes>
    </>
  )
}

export default App