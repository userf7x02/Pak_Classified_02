import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container} className="footer-container">
        {/* Company */}
        <div style={styles.section} className="footer-section">
          <h3 style={styles.heading}>Company</h3>
          <p style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
            elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section} className="footer-section">
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li>
              <Link
                to="/AboutUs"
                style={{ ...styles.link, textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Contact"
                style={{ ...styles.link, textDecoration: "none", color: "inherit" }}
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                style={{ ...styles.link, textDecoration: "none", color: "inherit" }}
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                style={{ ...styles.link, textDecoration: "none", color: "inherit" }}
                href="#"
              >
                Terms & Condition
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div style={styles.section} className="footer-section">
          <h3 style={styles.heading}>Contact</h3>
          <p style={styles.text}>Ferozepur Road, Gulberg III, Lahore</p>
          <p style={styles.text}>
            📞{" "}
            <a href="tel:+923001387387" style={{ color: "#ddd", textDecoration: "none" }}>
              0300 1 387 387
            </a>
          </p>
          <p style={styles.text}>
            ✉{" "}
            <a href="mailto:cmx@gmail.com" style={{ color: "#ddd", textDecoration: "none" }}>
              cmx@gmail.com
            </a>
          </p>
          <div style={styles.socials}>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
              <i className="fab fa-twitter" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
              <i className="fab fa-facebook" />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
              <i className="fab fa-youtube" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div style={styles.section} className="footer-section">
          <h3 style={styles.heading}>Newsletter</h3>
          <p style={styles.text}>
            Subscribe to our newsletter for the latest updates and news.
          </p>
          <div style={styles.newsletter}>
            <input
              type="email"
              placeholder="Your email"
              style={styles.input}
              required
            />
            <button
              style={styles.button}
              onClick={(e) => {
                const input = e.target.previousSibling;
                if (!input.value) {
                  alert("Please enter your email");
                }
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      <div style={styles.bottom} className="footer-bottom">
        <p style={{ margin: 0 }}>
          © PakClassified. All Right Reserved. Designed By <b>Hamza Programmer</b>
        </p>
        <div>
          <a style={styles.link} href="#">
            Home
          </a>{" "}
          |{" "}
          <a style={styles.link} href="#">
            Cookies
          </a>{" "}
          |{" "}
          <a style={styles.link} href="#">
            Help
          </a>{" "}
          |{" "}
          <a style={styles.link} href="#">
            FAQs
          </a>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 900px) {
            .footer-container {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
          }

          @media (max-width: 600px) {
            .footer-container {
              grid-template-columns: 1fr;
              text-align: center;
            }
            .footer-section {
              margin-bottom: 15px;
            }
            .footer-section ul {
              padding: 0;
            }
            .footer-section li {
              margin: 5px 0;
            }
            .footer-bottom {
              flex-direction: column;
              text-align: center;
              gap: 5px;
            }
          }
        `}
      </style>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#2f3b3a",
    color: "#fff",
    padding: "40px 20px 20px",
    fontFamily: "Arial, sans-serif",
    marginTop: "30px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
    marginBottom: "20px",
  },
  section: {
    lineHeight: "1.8",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "14px",
    color: "#ddd",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#bbb",
    textDecoration: "none",
    fontSize: "14px",
  },
  socials: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    fontSize: "18px",
    justifyContent: "flex-start",
  },
  newsletter: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "4px 0 0 4px",
    outline: "none",
  },
  button: {
    padding: "8px 15px",
    border: "none",
    background: "green",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "0 4px 4px 0",
  },
  bottom: {
    borderTop: "1px solid #444",
    paddingTop: "10px",
    fontSize: "13px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
  },
};
