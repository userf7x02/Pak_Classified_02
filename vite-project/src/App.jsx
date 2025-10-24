import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import LatestPosting from "./components/LatestPosting";
import Footer from "./components/Footer";
import AboutUs from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./components/Post_Adver";
import CatDesign from "./components/Cat_Design";
import ProfilePage from "./components/ProfilePage";
import CarDetails from "./components/MoreDetails";
import SearchResults from "./components/Search_Result";


// Home component to organize home page content
function Home({ isAuthenticated, showPost, setShowPost }) {
  return (

    <>
      <Hero
        isAuthenticated={isAuthenticated}
        showPost={showPost}
        setShowPost={setShowPost} />
      <SearchBar />
      <main className="container">
        <h2 className="section-title">Explore By Categories</h2>
        <Categories />
        <h2 className="section-title">Latest Posting</h2>
        <LatestPosting />
      </main>
    </>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    // agar user pehle se login hai (localStorage me user hai)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <div className="site">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} showPost={showPost}
            setShowPost={setShowPost} />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/category/:id" element={<CatDesign />} />
          <Route
            path="/ProfilePage"
            element={
              <ProfilePage
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
            <Route path="/SearchResults" element={<SearchResults />} />
          <Route path="/CarDetails/:id" element={<CarDetails />} />
          



        </Routes>
        <Post show={showPost} handleClose={() => setShowPost(false)} />
        <Footer />
        <ToastContainer position="top-left" autoClose={2000} />
      </BrowserRouter>
    </div>
  );
}