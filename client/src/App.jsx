import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home/Home";
import About from "../src/pages/About/About";
import SignIn from "../src/pages/SignIn/SignIn";
import SignUp from "../src/pages/SignUp/SignUp";
import Profile from "../src/pages/Profile/Profile";
import NewListing from "../src/pages/NewListing/NewListing";
import Listing from "../src/pages/Listing/Listing";
import SingleListing from "./pages/SingleListing/SingleListing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-listing" element={<NewListing />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:id" element={<SingleListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
