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
import BookingConfirmation from "./pages/Booking-Confirmation";
import ListingsSearch from "./pages/Listings-Search";
import EditListing from "./pages/Edit-Listing";
import ListingDetails from "./pages/Listing-Details";
import PrivateRouteHost from "./components/PrivateRouteHost";
import PrivateRouteUser from "./components/PrivateRouteUser";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host-signup" element={<HostSignup />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/host-login" element={<HostLogin />} />
        <Route
          path="/host-profile"
          element={
            <PrivateRouteHost>
              <HostProfile />
            </PrivateRouteHost>
          }
        />
        <Route
          path="/user-profile"
          element={
            <PrivateRouteUser>
              <UserProfile />
            </PrivateRouteUser>
          }
        />
        <Route path="/edit-host-profile" element={<EditHostProfile />} />
        <Route path="/listings-search" element={<ListingsSearch />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        {/* <Route path="/listings-search" element={<ListingsSearch />} /> */}
        <Route path="/edit-listing/:id" element={<EditListing />} />
        <Route path="/listing-details" element={<ListingDetails />} />
        {/* <Route path="/messages" element={<Messages />} /> */}
      </Routes>
    </div>
  );
}
export default App;
