import { useState } from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
// import Host-Signup from './components/Host-Signup'
// import Refugee-Signup from './components/Refugee-Signup'
// import Refugee-Profile from './components/Refugee-Profile'
// import Host-Profile from './components/Host-Profile'
// import Listings-Search from './components/Listings-Search'
// import Publish-Listing from './components/Publish-Listing'
// import Listing-Details from './components/Listing-Details'
// import Messages from './components/Messages'



function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/host-signup" element={<Host-Signup />} />
        <Route path="/refugee-signup" element={<Refugee-Signup />} />
        <Route path="/refugee-profile" element={<Refugee-Profile />} />
        <Route path="/host-profile" element={<Host-Profile />} />
        <Route path="/listings-search" element={<Listings-Search />} />
        <Route path="/publish-listing" element={<Publish-Listing />} />
        <Route path="/listing-details" element={<Listing-Details />} />
        <Route path="/messages" element={<Messages />} /> */}
        </Routes>


    </div>
  )
}

export default App
