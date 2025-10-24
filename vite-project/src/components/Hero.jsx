import React, { useState, useEffect, useRef } from "react";
import Post from "./Post_Adver";
import SearchBar from "./SearchBar";

export default function Hero({ isAuthenticated, setShowPost }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const searchRef = useRef(null);

  const carouselImages = [
    "https://wallpaper.forfun.com/fetch/09/09ee8d6f76fd3dd4eed77b630ff4d6bf.jpeg",
    "https://wallpapers.com/images/hd/4k-ultra-hd-mustang-white-car-c10t6ulwhempjqoh.jpg",
    "https://wallpaperswide.com/download/black_mercedes_benz_sls_amg-wallpaper-3840x2160.jpg"
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSearch = () => searchRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section className="hero">
        <div className="carousel-container">
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Car Banner ${index + 1}`}
              className={`hero-bg ${index === currentSlide ? "active" : ""}`}
            />
          ))}

          {/* Arrows */}
          <button className="carousel-arrow prev" onClick={prevSlide}>‹</button>
          <button className="carousel-arrow next" onClick={nextSlide}>›</button>

          {/* Text Overlay */}
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Unlock Your Drive: <br /> Explore, Compare</h1>
              <p>Where Every Journey Begins with the Right Car</p>
              <div className="hero-buttons">
                <button onClick={handleScrollToSearch} className="btn-primary">Search A Car</button>
                <button
                  className="btn-outline"
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert("Please login or signup to create an advertisement!");
                      return;
                    }
                    setShowPost(true);
                  }}
                >
                  Post Advertisement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={searchRef}></div>

      {/* 🔹 Responsive Styling */}
      <style>{`
        .carousel-container {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 600px;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          z-index: 1;
        }

        .hero-bg.active {
          opacity: 1;
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          font-size: 24px;
          cursor: pointer;
          z-index: 3;
          transition: all 0.3s ease;
        }

        .carousel-arrow:hover {
          background: rgba(0, 0, 0, 0.8);
        }

        .carousel-arrow.prev {
          left: 20px;
        }

        .carousel-arrow.next {
          right: 20px;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%);
          padding-left: 60px;
        }

        .hero-content {
          text-align: left;
          color: white;
          max-width: 600px;
          padding: 0 20px;
        }

        .hero-content h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .hero-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #0056b3;
          transform: translateY(-2px);
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 12px 30px;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: white;
          color: black;
          transform: translateY(-2px);
        }

        /* 🔹 Tablet (768px – 1024px) */
        @media (max-width: 1024px) {
          .hero-overlay {
            justify-content: center;
            padding-left: 0;
            background: rgba(0,0,0,0.4);
          }

          .hero-content {
            text-align: center;
            max-width: 80%;
          }

          .carousel-arrow {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
        }

        /* 🔹 Mobile (≤768px) */
        @media (max-width: 768px) {
          .carousel-container {
            height: 450px;
          }

          .hero-bg {
            height: 450px;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }

          .carousel-arrow {
            width: 35px;
            height: 35px;
            font-size: 16px;
          }

          .hero-overlay {
            justify-content: center;
            align-items: center;
            padding-left: 0;
            background: rgba(0,0,0,0.5);
          }

          .hero-content {
            text-align: center;
            max-width: 90%;
          }
        }
      `}</style>
    </>
  );
}
