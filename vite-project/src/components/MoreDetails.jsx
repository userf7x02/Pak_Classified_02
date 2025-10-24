import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function CarDetails() {
  const [CityArea, setCityArea] = useState([]);
  // const [Category, setCategory] = useState([]);
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  // const getcategory = async () => {
  //   try {
  //     const res = await fetch("https://pakclassified.onrender.com/createCategory/Get");
  //     const data = await res.json();
  //     setCategory(data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error.message);
  //   }
  // };

  const getCityArea = async () => {
    try {
      const res = await fetch("https://pakclassified.onrender.com/createArea/Get", {
      credentials: "include" // ✅ cookies/session ke liye
    })
      const data = await res.json();
      console.log("CityArea list:", data); // 👈 add this
      setCityArea(data);
    } catch (error) {
      console.error("Error fetching City Areas:", error.message);
    }
  };

  useEffect(() => {
    fetch(`https://pakclassified.onrender.com/createAdvertisement/${id}`, {
      credentials: "include" // ✅ cookies/session ke liye
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Advertisement:", data); // 👈 add this
        setAd(data);
      })
      .catch((err) => console.error(err));

    getCityArea();
  }, [id]);



  if (!ad) return <h2>Loading...</h2>;

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
            <h1>Car Details</h1>
            <p>We are here to assist you anytime</p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div style={styles.wrap}>
        {/* Top Info */}
        <div style={styles.topRow}>
          <div
            style={{
              ...styles.thumb,
              backgroundImage: `url(https://pakclassified.onrender.com/uploads/${ad.Image || "placeholder.jpg"})`,
            }}
          ></div>
          <div style={styles.titleBlock}>
            <h2 style={styles.carName}>{ad.Name}</h2>
            <div style={styles.meta}>
              <span>
                📍 {
                  CityArea.find(
                    (area) =>
                      String(area._id) ===
                      String(ad.CityArea?._id)
                  )?.Name
                }
              </span>

              <span style={{ color: "#007f00", fontWeight: 600 }}>|</span>
              <span style={styles.price}>₨ {ad.Price}</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={styles.cols}>
          {/* Left Side */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>Car Description</h3>
            <p style={styles.desc}>{ad.Description || "No description available."}</p>

            {ad.Features && (
              <>
                <h3 style={styles.sectionTitle}>Features</h3>
                <ul style={styles.features}>
                  {ad.Features.split(",").map((f, i) => (
                    <li key={i} style={styles.featureItem}>
                      <span style={styles.tick}>✔</span> {f.trim()}
                    </li>
                  ))}
                </ul>
                {/* <p>
                  📍 {
                    CityArea.find(
                      (area) =>
                        String(area._id) ===
                        String(ad.CityArea?._id || ad.CityArea)
                    )?.Name || CityArea.find(
                      (area) =>
                        String(area._id) ===
                        String(ad.CityArea?._id || ad.CityArea)
                    )?.name
                  }


                </p> */}

              </>
            )}
          </div>

          {/* Right Side — Advertisement Summary */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h4 style={{ color: "#fff", marginBottom: "8px" }}>
                Advertisement Summary
              </h4>
            </div>
            <div style={styles.sidebarContent}>
              <dl>
                <dt style={styles.dt}>Posted By</dt>
                <dd style={styles.dd}>{ad.userId?.username || "Unknown"}</dd>

                <dt style={styles.dt}>Email</dt>
                <dd style={styles.dd}>{ad.userId?.email || "N/A"}</dd>

                <dt style={styles.dt}>Contact</dt>
                <dd style={styles.ddMuted}>
                  {ad.userId?.contact || "Not provided"}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-overlay {
            padding-left: 60px !important;
          }
        }

        @media (max-width: 768px) {
          .hero-overlay {
            padding-left: 30px !important;
            text-align: left;
          }
          .hero-text-box h1 {
            font-size: 24px;
          }
          .hero-text-box p {
            font-size: 14px;
          }
        }

        @media (max-width: 700px) {
          div[style*="display: flex"][style*="gap: 20px"] {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }

          div[style*="grid-template-columns: 1.5fr 0.9fr"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }

          .hero-overlay {
            padding-left: 20px !important;
          }

          h2 {
            font-size: 22px !important;
          }

          p, li, span {
            font-size: 14px !important;
          }

          div[style*="padding: 30px"] {
            padding: 20px !important;
          }

          div[style*="max-width: 1400px"] {
            padding: 0 20px !important;
          }

          div[style*="width: 150px"][style*="height: 100px"] {
            width: 100% !important;
            height: 200px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  wrap: {
    width: "100%",
    maxWidth: "1400px",
    margin: "40px auto",
    padding: "0 40px",
    fontFamily: "Poppins, sans-serif",
    background: "#f9f9f9",
    color: "#222",
  },
  topRow: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    marginBottom: "30px",
  },
  thumb: {
    width: "150px",
    height: "100px",
    background: "#eee",
    borderRadius: "8px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  titleBlock: { flex: 1 },
  carName: { margin: 0, fontSize: "26px", color: "#111", fontWeight: "700" },
  meta: {
    color: "#666",
    fontSize: "15px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },
  price: { color: "#007f00", fontWeight: 700, fontSize: "18px" },
  cols: {
    display: "grid",
    gridTemplateColumns: "1.5fr 0.9fr",
    gap: "40px",
    alignItems: "start",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  sectionTitle: { fontSize: "22px", marginBottom: "12px", color: "#111" },
  desc: { color: "#555", lineHeight: 1.7, fontSize: "15px" },
  features: { listStyle: "none", padding: 0, margin: 0 },
  featureItem: { display: "flex", alignItems: "flex-start", gap: "10px" },
  tick: { color: "#007f00", fontWeight: 700 },
  sidebar: {
    background: "linear-gradient(135deg, #24ff7cff, #060606ff)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  sidebarHeader: {
    borderBottom: "2px solid rgba(255,255,255,0.3)",
    paddingBottom: "10px",
    marginBottom: "16px",
  },
  sidebarContent: {
    lineHeight: 1.8,
  },
  dt: { color: "#e0e0e0", marginTop: "10px", fontWeight: 500 },
  dd: { margin: "4px 0 12px 0", fontWeight: 600, color: "#fff" },
  ddMuted: { margin: "4px 0 12px 0", color: "#ddd" },
};
