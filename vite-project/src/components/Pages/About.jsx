import Hero from "../Hero";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <img
          src="https://www.motortrend.com/uploads/2022/11/2023-COTY-Group-Shots-01.jpg"
          alt="Contact"
          className="hero-img"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            paddingLeft: "110px",
          }}
          className="hero-overlay"
        >
          <div className="hero-text-box">
            <h1>About Us ➜</h1>
            <p>there is all the knowlege about us</p>
          </div>
        </div>
      </section>

      <div className="about-container" style={styles.container}>
        {/* Left side images */}
        <div className="about-image-grid" style={styles.imageGrid}>
          <img
            src="https://i.nextmedia.com.au/Utils/ImageResizer.ashx?n=https%3A%2F%2Fi.nextmedia.com.au%2FFeatures%2Fcrop_2019-Chevrolet-Camaro-ZL1-1LE-018.jpg&q=70&h=630&w=1120&c=1&s=1"
            alt="car1"
            style={styles.image}
          />
          <img
            src="https://carwow-uk-wp-0.imgix.net/Yangwang-U9-rear-quarter-static.jpg?auto=format&cs=tinysrgb&fit=crop&h=&ixlib=rb-1.1.0&q=60&w=1600"
            alt="car2"
            style={styles.image}
          />
          <img
            src="https://carsales.pxcrush.net/carsales/cars/dealer/669df55s9mcpej6vn42l3c167.jpg?pxc_method=fitfill&pxc_bgtype=self&pxc_size=720,480"
            alt="car3"
            style={styles.image}
          />
          <img
            src="https://article.images.consumerreports.org/image/upload/w_652,f_auto,q_auto,ar_16:9,c_lfill/v1731947043/prod/content/dam/CRO-Images-2024/Cars/CR-Cars-InlineHero-10-Most-Satisfying-Cars-and-SUVs-1124"
            alt="car4"
            style={styles.image}
          />
        </div>

        {/* Right side text */}
        <div className="about-text-section" style={styles.textSection}>
          <h2 style={styles.heading}>About Us</h2>
          <h3 style={styles.subHeading}>
            PakClassified is a comprehensive online platform
          </h3>
          <p style={styles.paragraph}>
            Welcome to PakClassified, your premier destination for all things
            automotive in Pakistan. Our platform is designed to offer a seamless
            experience for users looking to browse, buy, sell, and compare cars.
            Whether you are a car enthusiast or a first-time buyer, we are
            committed to making your car shopping journey smooth and hassle-free.
          </p>
        </div>
      </div>

      {/* 🔹 Mobile-only responsive styles */}
      <style>
        {`
        @media (max-width: 768px) {
          .about-container {
            flex-direction: column !important;
            align-items: center !important;
            padding: 20px !important;
            background: linear-gradient(180deg, #f9fafc, #eef2f6);
          }

          .about-image-grid {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            gap: 14px !important;
            padding: 12px 0 !important;
            width: 100% !important;
            justify-content: flex-start;
            scroll-snap-type: x mandatory;
          }

          .about-image-grid img {
            width: 85% !important;
            height: auto !important;
            aspect-ratio: 16 / 10 !important;
            object-fit: cover !important;
            border-radius: 12px !important;
            flex-shrink: 0 !important;
            scroll-snap-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .about-image-grid img:active {
            transform: scale(0.97);
            box-shadow: 0 0 10px rgba(0,0,0,0.25);
          }

          .about-text-section {
            text-align: center !important;
            margin-top: 22px !important;
            padding: 0 15px !important;
          }

          .about-text-section h2 {
            font-size: 24px !important;
            color: #1c1c1c !important;
          }

          .about-text-section h3 {
            font-size: 18px !important;
            color: #333 !important;
          }

          .about-text-section p {
            font-size: 15px !important;
            line-height: 1.6 !important;
            color: #555 !important;
          }
        }
      `}
      </style>
    </>
  );
};

// Desktop + tablet styles (unchanged)
const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginRight: "40px",
  },
  image: {
    width: "220px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  textSection: {
    maxWidth: "500px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#222",
  },
  subHeading: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#333",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
  },
};

export default AboutUs;
