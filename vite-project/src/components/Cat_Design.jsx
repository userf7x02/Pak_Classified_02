import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CatDesign.css";

export default function CatDesign() {
  const { id } = useParams();
  const [Category, setCategory] = useState(null);
  const [Card, setCard] = useState([]);

  async function Getdata() {
    try {
      let res = await fetch(`https://pakclassified.onrender.com/createAdvertisement/category/${id}`, {
      credentials: "include" // ✅ cookies/session ke liye
    })
      let data = await res.json();
      setCard(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function GetCategory() {
    try {
      let res = await fetch(`https://pakclassified.onrender.com/createCategory/${id}`, {
      credentials: "include" // ✅ cookies/session ke liye
    })
      let data = await res.json();
      setCategory(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    Getdata();
    GetCategory();
  }, [id]);

  return (
    <>
      <section className="contact-hero">
        <img
          src="https://www.motortrend.com/uploads/2022/11/2023-COTY-Group-Shots-01.jpg"
          alt="Contact"
          className="hero-img"
        />
        <div
          style={{ display: "flex", justifyContent: "start", paddingLeft: "110px" }}
          className="hero-overlay"
        >
          <div className="hero-text-box ">
            <h1>Cars in this category</h1>
          </div>
        </div>
      </section>

      <div className="hc-page-root">
        <style>{`
          .hc-page-root {
            font-family: Inter, Roboto, Arial;
            background: #fff;
            padding: 28px 0;
            min-height: 100vh;
          }

          .hc-title {
            font-size: 28px;
            color: #1fb28a;
            text-align: center;
            margin: 8px 0 28px;
            font-weight: 700;
            border-bottom: 2px solid #cce5cc;
            padding-bottom: 8px;
          }

          .card {
            display: flex;
            align-items: flex-start;
            background: #fff;
            border: 1px solid #ccc;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 16px;
            width: 100%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.08);
          }

          .card img {
            width: 220px;
            height: 140px;
            object-fit: cover;
            border-radius: 6px;
            margin-right: 20px;
            flex-shrink: 0;
          }

          .card-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            text-align: left;
          }

          .car-title {
            color: #007b33;
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 6px;
          }

          .card-body p {
            margin: 2px 0;
            line-height: 1.4;
            color: #444;
            font-size: 15px;
            display: -webkit-box;
            -webkit-line-clamp: 2; 
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .car-price {
            color: black;
            font-weight: bold;
            font-size: 16px;
            margin: 5px 0;
          }

          .car-dates {
            color: #777;
            font-size: 14px;
            margin-bottom: 8px;
          }

          .more-btn {
            background: #1fb28a;
            color: white;
            border: none;
            padding: 7px 14px;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
            transition: background 0.2s ease;
            align-self: flex-start;
            margin-left: 1000px;
          }

          .more-btn:hover {
            background: #218838;
          }

          /* 🔹 Tablet View (No desktop changes) */
          @media (max-width: 1024px) {
            .hero-overlay {
              padding-left: 60px !important;
            }

            .card img {
              width: 180px !important;
              height: 120px !important;
            }

            .car-title {
              font-size: 18px !important;
            }

            /* 🟢 Thoda sa left margin kam kiya */
            .more-btn {
              margin-left: 510px !important;
            }
          }

          /* 🔹 Mobile Responsive */
          @media (max-width: 768px) {
            .hero-overlay {
              padding-left: 30px !important;
            }

            .card {
              flex-direction: column !important;
              align-items: flex-start !important;
            }

            .card img {
              width: 100% !important;
              height: 200px !important;
              margin: 0 0 12px 0 !important;
            }

            .card > div {
              flex-direction: column !important;
              width: 100% !important;
            }

            .card-body {
              width: 100% !important;
              align-items: flex-start !important;
              text-align: left !important;
            }

            .more-btn {
              width: 100% !important;
              margin-left: 0 !important;
              text-align: center !important;
              align-self: center !important;
            }

            .hc-title {
              font-size: 22px !important;
            }

            .car-title {
              font-size: 18px !important;
            }

            .card-body p {
              font-size: 14px !important;
            }
          }
        `}</style>

        <h1 className="hc-title">
          {Category ? Category.Name : "Cars in this Category"}
        </h1>

        {Card.length === 0 ? (
          <p className="text-center" style={{ marginTop: "15%" }}>
            No cars found for this category
          </p>
        ) : (
          Card.map((car) => (
            <article key={car._id} className="card">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={`https://pakclassified.onrender.com/uploads/${car.Image}`}
                  alt={car.Name}
                />
                <div className="card-body">
                  <h2 className="car-title">{car.Name}</h2>
                  <p className="car-desc">
                    {car.Description || "No description available"}
                  </p>
                  <p className="car-price">Price: {car.Price}</p>
                  <p className="car-features">
                    {car.Features || "No features listed"}
                  </p>
                  <p className="car-dates">
                    {car.StartsOn} → {car.EndsOn}
                  </p>
                  <Link to={`/CarDetails/${car._id}`} style={{ textDecoration: "none" }}>
                    <button className="more-btn">View More</button>
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
