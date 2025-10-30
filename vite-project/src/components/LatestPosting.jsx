import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function LatestPosting() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${VITE_API_URL}/createAdvertisement/getAll`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Data:", data);
        // ✅ Pehli 4 posts le lo
        const first4Posts = Array.isArray(data) ? data.slice(0, 4) : [];
        setPosts(first4Posts);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.message);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Loading posts...</h3>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h3>Error loading posts</h3>
        <p>{error}</p>
        <p>Please check your backend server</p>
      </div>
    );
  }

  // ✅ No posts state
  if (!posts || posts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>No posts available</h3>
        <p>Please check if backend is running</p>
      </div>
    );
  }

  // ✅ Success state - sirf 4 posts show hongi
  return (
    <div className="grid latest-posts">
      {posts.map((p) => (
        <article key={p._id} className="latest-card">
          <img 
            src={`${VITE_API_URL}/uploads/${p.Image}`} 
            alt={p.Name} 
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          <div className="latest-body">
            <h3>{p.Name || "No Title"}</h3>
            <p>
              {p.Description && p.Description.length > 100 
                ? p.Description.substring(0, 100) + "..." 
                : p.Description || "No description available"}
            </p>
            <button className="btn">
              <Link to={`/CarDetails/${p._id}`} style={{ color: "white", textDecoration: "none" }}>
                View More
              </Link>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}