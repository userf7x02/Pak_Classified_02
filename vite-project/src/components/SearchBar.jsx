import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function SearchBar() {
  const [categories, setCategories] = useState([]);
  const [cityArea, setCityArea] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3300";

  useEffect(() => {
    fetch(`${API_URL}/createCategory/Get`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));

    fetch(`${API_URL}/createArea/Get`)
      .then(res => res.json())
      .then(data => setCityArea(data))
      .catch(() => setCityArea([]));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append("name", keyword);
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedArea) params.append("area", selectedArea);
    navigate(`/SearchResults?${params.toString()}`);
  };

  return (
    <div className="search-page">
      <div className="search-band">
        <input
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.length
            ? categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.Name}</option>
              ))
            : <option value="" disabled>No categories</option>}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Select City/Area</option>
          {cityArea.length
            ? cityArea.map(area => (
                <option key={area._id} value={area._id}>{area.Name}</option>
              ))
            : <option value="" disabled>No areas</option>}
        </select>

        <button className="btn dark" onClick={handleSearch}>Search</button>
      </div>

      {/* Inline CSS must be inside JSX */}
      <style>{`
        .search-page {
          width: 100%;
          margin: 0;
          padding: 0 0 40px 0;
        }
        .search-band {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          background: #07da97ff;
          width: 100%;
          box-sizing: border-box;
        }
        .search-band input,
        .search-band select {
          padding: 10px;
          border: 2px solid #0e8a62;
          border-radius: 6px;
          min-width: 160px;
          box-shadow: 0 0 6px rgba(14,138,98,0.2);
          outline: none;
          transition: 0.3s;
          background: white;
        }
        .search-band input:focus,
        .search-band select:focus {
          border-color: #0a5e44;
          box-shadow: 0 0 10px rgba(14,138,98,0.4);
        }
        .btn.dark {
          background: #0e8a62;
          color: white;
          border: 2px solid #0e8a62;
          border-radius: 6px;
          padding: 10px 18px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 0 6px rgba(14,138,98,0.2);
        }
        .btn.dark:hover {
          background: #0a5e44;
          box-shadow: 0 0 10px rgba(14,138,98,0.4);
        }
        @media (max-width: 1024px) {
          .search-band { background: white; border-bottom: 1px solid #e0e0e0; }
        }
        @media (max-width: 768px) {
          .search-band { background: white; border-bottom: 1px solid #e0e0e0; padding: 15px; }
          .search-band input, .search-band select { min-width: 140px; padding: 12px; }
          .btn.dark { padding: 12px 20px; }
        }
        @media (max-width: 480px) {
          .search-band { padding: 12px; gap: 8px; }
          .search-band input, .search-band select { min-width: 120px; padding: 10px; font-size: 14px; }
          .btn.dark { padding: 10px 16px; font-size: 14px; }
        }
      `}</style>
    </div>
  );
}
