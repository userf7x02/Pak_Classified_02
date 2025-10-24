import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Post from "./Post_Adver";
import { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getcategory = async () => {
    try {
      const res = await fetch("https://pakclassified.onrender.com/createCategory/Get", {
      credentials: "include" // ✅ cookies/session ke liye
    })
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
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span><span></span><span></span>
          </button>

          {/* Nav Links */}
          <nav className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa-solid fa-house"></i> Home
            </Link>
            <Link to="/AboutUs" onClick={() => setIsMobileMenuOpen(false)}>
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
                        onClick={() => setIsMobileMenuOpen(false)}
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

            <Link to="/Contact" onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa-solid fa-phone"></i> Contact
            </Link>
          </nav>

          {/* Buttons */}
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
        </div>
      </header>

      <Signup show={showSignup} handleClose={() => setShowSignup(false)} onSuccess={handleLoginSuccess} />
      <Login show={showLogin} handleClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />
      <Post show={showPost} handleClose={() => setShowPost(false)} />

      <style jsx>{`
       .dropdown-menu .dropdown-item:active,
  .dropdown-menu .dropdown-item:focus {
    background-color: #0e8a62 !important; /* apni pasand ka color */
    color: white !important; /* text color */
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

        .dropdown-container { position: relative; }
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

        /* Mobile Menu Button */
        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          border: none;
          background: transparent;
          cursor: pointer;
          gap: 4px;
        }
        .mobile-menu-toggle span {
          width: 25px;
          height: 3px;
          background: #333;
          border-radius: 2px;
        }

        /* ---------- RESPONSIVE ---------- */

        /* ✅ Mobile */
        @media (max-width: 768px) {
          .mobile-menu-toggle { display: flex; }
          .nav { flex-wrap: wrap; padding: 0.75rem; }
          .nav-links {
            width: 100%;
            flex-direction: column;
            background: white;
            padding: 1rem;
            gap: 1rem;
            border-top: 1px solid #eee;
            display: none;
          }
          .nav-links.mobile-open { display: flex; }
          .nav-actions {
            width: 100%;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
          }
          .btn { width: 100%; }
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
