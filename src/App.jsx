import { useContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HostSignup from "./pages/Host-Signup";
import UserSignup from "./pages/User-Signup";
import HostLogin from "./pages/Host-Login";
import EditHostProfile from "./components/Edit-Host-Profile";
import UserProfile from "./pages/User-Profile";
import HostProfile from "./pages/Host-Profile";
import EditUserProfile from "./components/Edit-User-Profile";
import BookingConfirmation from "./pages/Booking-Comfirmation";
// import HostProfile from './components/Host-Profile'
import ListingsSearch from "./pages/Listings-Search";
import PublishListing from "./components/Publish-Listing"
import EditListing from "./components/Edit-Listing";
// import ListingDetails from './components/Listing-Details'
// import Messages from './components/Messages'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host-signup" element={<HostSignup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/host-login" element={<HostLogin />} />
        <Route path="/host-profile" element={<HostProfile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/edit-host-profile" element={<EditHostProfile />} />
        <Route path="/edit-user-profile" element={<EditUserProfile />} />
        <Route path="/listings-search" element={<ListingsSearch />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        {/* <Route path="/listings-search" element={<ListingsSearch />} /> */}
        <Route path="/publish-listing" element={<PublishListing />} />
        <Route path="/edit-listing" element={<EditListing />} />
        {/* <Route path="/listing-details" element={<ListingDetails />} /> */}
        {/* <Route path="/messages" element={<Messages />} /> */}
      </Routes>
    </div>
  );
}

export default App;
