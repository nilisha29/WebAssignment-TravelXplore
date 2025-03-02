import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/public/Home";
// import Book from "./components/Book";
// import About from "./pages/About";

import SignIn from "./components/public/SignIn";
import SignUp from "./components/public/SignUp";
import Home from "./components/private/Home";
import Lukla from "./components/private/Lukla";
import Bharatpur from "./components/private/Bharatpur";
import Biratnagar from "./components/private/Biratnagar";
import Kathmandu from "./components/private/Kathmandu";
import Janakpur from "./components/private/Janakpur";
import Tumlingtar from "./components/private/Tumlingtar";
import Nepalgunj from "./components/private/Nepalgunj";
import Pokhara from "./components/private/Pokhara";
import Dhangadhi from "./components/private/Dhangadhi";
import Bhairahawa from "./components/private/Bhairahawa";
import Jomsom from "./components/private/Jomsom";
import Simikot from "./components/private/Simikot";
import About from "./components/private/About";
import Destinations from "./components/private/Destinations";
import Contact from "./components/private/Contact";
import Navbar from "./components/private/Navbar";
import Footer from "./components/private/Footer";
import BookingForm from "./components/private/BookingForm";

import Dashboard from './components/admin/Dashboard';
import ManageUsers from './components/admin/ManageUsers';
import ContactMessages from './components/admin/ContactMessages';
import ManageFlightDestination from './components/admin/ManageFlightDestination';
import ViewBookings from './components/admin/ViewBooking';
import ManageReviews from './components/admin/ManageReviews.jsx';

import ScrollToTop from './components/private/ScrollToTop';
import ProfileChange from './components/private/ProfileChange';
import Profile from './components/private/Profile';
import PrivateRoute from './components/private/PrivateRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
// import Destination from "./components/private/flightdestination";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllDestinations from './components/private/AllDestinations';
import DestinationDetails from './components/private/DestinationDetails';

// const Contact = React.lazy(() => import("./pages/Contact"));

function App() {
  return (
    <Router>
      <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
      {/* <Navbar></Navbar> */}
      <ScrollToTop />
      <ToastContainer />
        <Routes>
          
          {/* <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<SignUp />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/Contact" element={<Contact />} /> */}
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Lukla" element={<Lukla />} />
          <Route path="/Bharatpur" element={<Bharatpur />} />
          <Route path="/Biratnagar" element={<Biratnagar />} />
          <Route path="/Kathmandu" element={<Kathmandu />} />
          <Route path="/Janakpur" element={<Janakpur />} />
          <Route path="/Tumlingtar" element={<Tumlingtar />} />
          <Route path="/Nepalgunj" element={<Nepalgunj />} />
          <Route path="/Pokhara" element={<Pokhara />} />
          <Route path="/Dhangadhi" element={<Dhangadhi />} />
          <Route path="/Jomsom" element={<Jomsom />} />
          <Route path="/Simikot" element={<Simikot />} />
          <Route path="/Bhairahawa" element={<Bhairahawa />} />
          <Route path="/About" element={<About />} />
          <Route path="/Destination" element={<Destinations />} />
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/Signin" element={<SignIn />} /> 
          <Route path="/Signup" element={<SignUp />} /> 
          {/* <Route path="/Login" element={<Login />} />  */}
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/booking" element={<BookingForm/>}/>

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/contact-messages" element={<ContactMessages />} />
          <Route path="/admin/manage-flightdestination" element={<ManageFlightDestination />} />
          <Route path="/admin/view-bookings" element={<ViewBookings />} />
          <Route path="/admin/manage-reviews" element={<PrivateRoute><ManageReviews /></PrivateRoute>} />

          <Route path="/ProfileChange" element={<ProfileChange />} />
          <Route path="/Profile" element={<Profile />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/destinations" element={<AllDestinations />} />
          <Route path="/destination/:slug" element={<DestinationDetails />} />
          
        </Routes>
        {/* <Footer></Footer> */}
      </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
