import React, { useState, useEffect, useRef } from "react";
import Post from "./Post_Adver";
import SearchBar from "./SearchBar";

export default function Hero({ isAuthenticated, setShowPost }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const searchRef = useRef(null);

  // Different images for desktop and mobile
  const desktopImages = [
    "https://wallpaper.forfun.com/fetch/09/09ee8d6f76fd3dd4eed77b630ff4d6bf.jpeg",
    "https://wallpapers.com/images/hd/4k-ultra-hd-mustang-white-car-c10t6ulwhempjqoh.jpg",
    "https://wallpaperswide.com/download/black_mercedes_benz_sls_amg-wallpaper-3840x2160.jpg"
  ];

  const mobileImages = [
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    ];

  // Use different images based on screen size
  const [carouselImages, setCarouselImages] = useState(desktopImages);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCarouselImages(mobileImages);
      } else {
        setCarouselImages(desktopImages);
      }
    };

    // Set initial images
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [carouselImages]);

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
          height: 600px; /* Original desktop height */
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 600px; /* Original desktop height */
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
          display: flex;
          align-items: center;
          justify-content: center;
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
          line-height: 1.2;
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          line-height: 1.5;
        }

        .hero-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary:hover {
          background: #0056b3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-outline:hover {
          background: white;
          color: black;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        /* 🔹 Tablet (768px – 1024px) */
        @media (max-width: 1024px) {
          .hero-overlay {
            justify-content: center;
            padding-left: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%);
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

          .hero-content h1 {
            font-size: 2.5rem;
          }
        }

        /* 🔹 Mobile (≤768px) */
        @media (max-width: 768px) {
          .carousel-container {
            height: 450px; /* Mobile height */
          }

          .hero-bg {
            height: 450px; /* Mobile height */
          }

          .hero-overlay {
            justify-content: center;
            align-items: center;
            padding-left: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%);
          }

          .hero-content {
            text-align: center;
            max-width: 90%;
            padding: 0 15px;
          }

          .hero-content h1 {
            font-size: 2rem;
            margin-bottom: 0.8rem;
          }

          .hero-content p {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 12px;
            align-items: center;
            width: 100%;
          }

          .btn-primary,
          .btn-outline {
            width: 100%;
            max-width: 280px;
            padding: 14px 25px;
            font-size: 1rem;
            border-radius: 10px;
          }

          .carousel-arrow {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .carousel-arrow.prev {
            left: 10px;
          }

          .carousel-arrow.next {
            right: 10px;
          }
        }

        /* 🔹 Small Mobile (≤480px) */
        @media (max-width: 480px) {
          .carousel-container {
            height: 400px; /* Smaller mobile height */
          }

          .hero-bg {
            height: 400px; /* Smaller mobile height */
          }

          .hero-content h1 {
            font-size: 1.8rem;
          }

          .hero-content p {
            font-size: 0.95rem;
          }

          .btn-primary,
          .btn-outline {
            padding: 12px 20px;
            font-size: 0.95rem;
          }

          .carousel-arrow {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
        }

        /* 🔹 Large Desktop (≥1440px) */
        @media (min-width: 1440px) {
          .carousel-container {
            height: 600px; /* Maintain original desktop height */
          }

          .hero-bg {
            height: 600px; /* Maintain original desktop height */
          }

          .hero-content h1 {
            font-size: 3.5rem;
          }

          .hero-content p {
            font-size: 1.3rem;
          }
        }

        /* Touch device improvements */
        @media (hover: none) and (pointer: coarse) {
          .carousel-arrow {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.7);
          }

          .btn-primary:hover,
          .btn-outline:hover {
            transform: none;
          }

          .btn-primary:active,
          .btn-outline:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </>
  );
}