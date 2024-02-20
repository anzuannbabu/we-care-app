import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import Posts from './components/Posts'
import { Route, Routes } from 'react-router-dom'

import UserRegistration from './pages/UserRegistration'
import UserLogin from './pages/UserLogin'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import UserHome from './pages/UserHome'
import CouchHome from './pages/CouchHome'
import RequireAuth from './components/RequireAuth'
import CouchLogin from './pages/CouchLogin'
import CouchRegistration from './pages/CouchRegistration'
import UserProfile from './pages/UserProfile'
// import { AuthProvider } from './context/AuthProvider'
// import RequireAuth from './components/RequireAuth'

function App() {


  return (
    <>
      {/* <div className="container mt-5">
     <div className="row">
        <div className="col-md-4">
          <Counter />
        </div>
        <div className="col-md-8">
          <Posts />
        </div>
      </div>
     </div> */}

      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/couch-registration" element={<CouchRegistration />} />
        <Route path="/couch-login" element={<CouchLogin />} />

        <Route element={<RequireAuth />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/couch-home" element={<CouchHome />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
