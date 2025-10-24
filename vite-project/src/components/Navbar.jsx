import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Post from "./Post_Adver";
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const getcategory = async () => {
    try {
      const res = await fetch("https://pakclassified.onrender.com/createCategory/Get", {
        credentials: "include"
      });
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleLoginSuccess = (userData) => {
    const fixedUser = {
      ...userData,
      image: userData?.image?.startsWith("http")
        ? userData.image
        : `https://pakclassified.onrender.com/uploads/${userData.image?.replace("uploads/", "")}`,
    };
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowSignup(false);
    setUser(fixedUser);
    localStorage.setItem("user", JSON.stringify(fixedUser));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsCategoriesOpen(false);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If click is on hamburger button, don't close the menu
      if (hamburgerRef.current && hamburgerRef.current.contains(event.target)) {
        return;
      }
      
      // If click is outside mobile menu and not on hamburger, close menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getcategory();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  return (
    <>
      <header className="nav-wrapper">
        <div className="container nav">
          <div className="brand">PakClassified</div>

          {/* Mobile Menu Button */}
          <button 
            ref={hamburgerRef}
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}

          {/* Nav Links - Desktop */}
          <nav className="nav-links">
            <Link to="/">
              <i className="fa-solid fa-house"></i> Home
            </Link>
            <Link to="/AboutUs">
              <i className="fa-brands fa-twitch"></i> About
            </Link>

            <div className="dropdown-container">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-bars-staggered"></i> Categories
              </a>
              <ul className="dropdown-menu">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${cat._id}`}
                      >
                        {cat.Name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><span className="dropdown-item">No Categories</span></li>
                )}
              </ul>
            </div>

            <Link to="/Contact">
              <i className="fa-solid fa-phone"></i> Contact
            </Link>
          </nav>

          {/* Buttons - Desktop */}
          <div className="nav-actions">
            {!isAuthenticated ? (
              <>
                <button className="btn small" onClick={() => setShowLogin(true)}>Login</button>
                <button className="btn small" onClick={() => setShowSignup(true)}>Signup</button>
              </>
            ) : (
              <div className="dropdown">
                <img
                  src={user?.image || "https://www.attitudestatus.org/wp-content/uploads/2020/12/20-scaled.jpg"}
                  className="rounded-circle dropdown-toggle"
                  width="40"
                  height="40"
                  alt="User"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul className="dropdown-menu custom-dropdown">
                  <li><Link to="/ProfilePage" className="dropdown-item">Profile</Link></li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to logout?")) handleLogout();
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div className="nav-actions">
              {isAuthenticated ? (
                <button
                  className="btn accent"
                  onClick={() => {
                    if (!isAuthenticated)
                      return alert("Please login or signup to create an advertisement!");
                    setShowPost(true);
                  }}
                >
                  Post Advertisement ➜
                </button>
              ) : null}
            </div>
          </div>

          {/* Mobile Menu - Hidden on Desktop */}
          <nav 
            ref={mobileMenuRef}
            className={`mobile-nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}
          >
            <div className="mobile-nav-links-container">
              <Link to="/" onClick={toggleMobileMenu}>
                <i className="fa-solid fa-house"></i> Home
              </Link>
              <Link to="/AboutUs" onClick={toggleMobileMenu}>
                <i className="fa-brands fa-twitch"></i> About
              </Link>

              {/* Mobile Categories - Aligned left with icon */}
              <div className="mobile-category-container">
                <button 
                  className="mobile-category-toggle"
                  onClick={toggleCategories}
                  aria-expanded={isCategoriesOpen}
                >
                  <i className="fa-solid fa-bars-staggered"></i> Categories
                  <i className={`fa-solid ${isCategoriesOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </button>
                <div className={`mobile-category-menu ${isCategoriesOpen ? "open" : ""}`}>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat._id}`}
                        onClick={toggleMobileMenu}
                      >
                        {cat.Name}
                      </Link>
                    ))
                  ) : (
                    <span>No Categories</span>
                  )}
                </div>
              </div>

              <Link to="/Contact" onClick={toggleMobileMenu}>
                <i className="fa-solid fa-phone"></i> Contact
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mobile-auth-section">
              {!isAuthenticated ? (
                <div className="mobile-auth-buttons">
                  <button 
                    className="btn small" 
                    onClick={() => {
                      setShowLogin(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="btn small" 
                    onClick={() => {
                      setShowSignup(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <>
                  <div className="mobile-user-info">
                    <img
                      src={user?.image || "https://www.attitudestatus.org/wp-content/uploads/2020/12/20-scaled.jpg"}
                      className="rounded-circle"
                      width="40"
                      height="40"
                      alt="User"
                    />
                    <div className="user-details">
                      <span className="user-name">{user?.name || "User"}</span>
                    </div>
                  </div>
                  <Link 
                    to="/ProfilePage" 
                    className="mobile-nav-link"
                    onClick={toggleMobileMenu}
                  >
                    <i className="fa-solid fa-user"></i> Profile
                  </Link>
                  <button
                    className="mobile-nav-link logout-btn"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) {
                        handleLogout();
                      }
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                  </button>
                  <button
                    className="btn accent full-width"
                    onClick={() => {
                      setShowPost(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Post Advertisement ➜
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <Signup show={showSignup} handleClose={() => setShowSignup(false)} onSuccess={handleLoginSuccess} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
      <Post show={showPost} handleClose={() => setShowPost(false)} />

      <style jsx>{`
        .dropdown-menu .dropdown-item:active,
        .dropdown-menu .dropdown-item:focus {
          background-color: #0e8a62 !important;
          color: white !important;
        }
        
        .nav-wrapper {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 999;
        }
        
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
        }
        
        .brand {
          font-size: 1.6rem;
          font-weight: bold;
          color: #0e8a62;
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .nav-links a {
          color: #444;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s;
        }
        
        .nav-links a:hover {
          color: #0e8a62;
        }

        .dropdown-container { 
          position: relative; 
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          display: none;
        }
        
        .dropdown-toggle[aria-expanded="true"] + .dropdown-menu {
          display: block;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
          font-weight: 500;
        }
        
        .btn.small {
          background: #f3f3f3;
          color: #333;
        }
        
        .btn.small:hover {
          background: #e0e0e0;
        }
        
        .btn.accent {
          background: #0e8a62;
          color: white;
        }
        
        .btn.accent:hover {
          background: #0a5e44;
        }
        
        .btn.full-width {
          width: 100%;
        }

        /* Mobile Menu Button - HIGHER Z-INDEX */
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          border: none;
          background: transparent;
          cursor: pointer;
          gap: 4px;
          padding: 0.5rem;
          z-index: 1002; /* Higher than mobile menu */
          position: relative;
        }
        
        .mobile-menu-toggle span {
          width: 25px;
          height: 3px;
          background: #333;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        
        /* Hamburger to X transformation */
        .mobile-menu-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
        
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000; /* Higher than mobile menu */
        }

        /* Mobile Menu Styles - Hidden on Desktop */
        .mobile-nav-links {
          display: none;
        }
        
        .mobile-category-container {
          display: none;
        }
        
        .mobile-auth-section {
          display: none;
        }

        /* ---------- MOBILE RESPONSIVE ---------- */
        @media (max-width: 768px) {
          .mobile-menu-toggle { 
            display: flex; 
          }
          
          .nav { 
            flex-wrap: wrap; 
            padding: 0.75rem;
          }
          
          /* Hide desktop navigation on mobile */
          .nav-links,
          .nav-actions {
            display: none;
          }
          
          /* Mobile Navigation */
          .mobile-nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 320px;
            height: 100vh;
            background: white;
            flex-direction: column;
            padding: 0;
            transition: right 0.3s ease;
            z-index: 1001; /* Lower than hamburger button */
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
          }
          
          .mobile-nav-links.mobile-open {
            right: 0;
            display: flex;
          }
          
          .mobile-nav-links-container {
            width: 100%;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0;
            margin-top: 1rem;
          }
          
          .mobile-nav-links-container a {
            padding: 0.75rem 0;
            border-bottom: 1px solid #f5f5f5;
            width: 100%;
            color: #444;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .mobile-category-container {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          
          .mobile-category-toggle {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background: none;
            border: none;
            padding: 0.75rem 0;
            color: #444;
            font-weight: 500;
            cursor: pointer;
            width: 100%;
            text-align: left;
            border-bottom: 1px solid #f5f5f5;
            gap: 0.5rem;
          }
          
          .mobile-category-menu {
            display: none;
            flex-direction: column;
            padding-left: 0;
            gap: 0;
            margin-bottom: 0;
          }
          
          .mobile-category-menu.open {
            display: flex;
          }
          
          .mobile-category-menu a {
            color: #666;
            text-decoration: none;
            padding: 0.6rem 0 0.6rem 1.5rem;
            border-bottom: 1px solid #f9f9f9;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
          }
          
          .mobile-auth-section {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem;
            border-top: 1px solid #eee;
            margin-top: 1rem;
          }
          
          .mobile-auth-buttons {
            display: flex;
            gap: 0.5rem;
          }
          
          .mobile-auth-buttons .btn {
            flex: 1;
          }
          
          .mobile-user-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
          }
          
          .user-details {
            display: flex;
            flex-direction: column;
          }
          
          .user-name {
            font-weight: 600;
            color: #333;
          }
          
          .mobile-nav-link {
            padding: 0.75rem 0;
            color: #444;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 1px solid #f5f5f5;
            background: none;
            border: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
            font-size: 1rem;
          }
          
          .logout-btn {
            color: #e74c3c;
          }
        }

        /* ✅ Tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
          .nav { padding: 1rem; }
          .nav-links { gap: 1rem; }
          .btn { font-size: 0.9rem; padding: 0.4rem 0.8rem; }
          .brand { font-size: 1.4rem; }
          .nav-actions { gap: 0.75rem; }
        }
      `}</style>
    </>
  );
}