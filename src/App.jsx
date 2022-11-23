import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HostSignup from "./components/Host-Signup";
import UserSignup from "./pages/User-Signup";
// import RefugeeProfile from './components/Refugee-Profile'
// import HostProfile from './components/Host-Profile'
// import ListingsSearch from './components/Listings-Search'
// import PublishListing from './components/Publish-Listing'
// import ListingDetails from './components/Listing-Details'
// import Messages from './components/Messages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host-signup" element={<HostSignup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        {/* <Route path="/refugee-profile" element={<RefugeeProfile />} />
        <Route path="/host-profile" element={<HostProfile />} />
        <Route path="/listings-search" element={<ListingsSearch />} />
        <Route path="/publish-listing" element={<PublishListing />} />
        <Route path="/listing-details" element={<ListingDetails />} />
        <Route path="/messages" element={<Messages />} /> */}
      </Routes>
    </div>
  );
}

export default App;
