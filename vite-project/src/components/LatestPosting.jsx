import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LatestPosting() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://pakclassified.onrender.com/createAdvertisement", {
      credentials: "include" // ✅ cookies/session ke liye
    })// backend route
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid latest-posts">
      {posts.map((p) => (
        <article key={p._id} className="latest-card">
          <img src={`https://pakclassified.onrender.com/uploads/${p.Image}`} alt={p.Name} />
          <div className="latest-body">
            <h3>{p.Name}</h3>
            <p>{p.Description.length > 100 ? p.Description.substring(0, 100) + "..." : p.Description}</p>
            <button className="btn">  <Link to={`/CarDetails/${p._id}`} style={{ color: "white", textDecoration: "none" }}>
              View More
            </Link></button>
          </div>
        </article>
      ))}
    </div>
  );
}
