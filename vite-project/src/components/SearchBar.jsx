import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // your existing CSS file

export default function SearchBar() {
  const [categories, setCategories] = useState([]);
  const [CityArea, setCityArea] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const navigate = useNavigate(); // ✅ for redirecting to results page

  // ✅ Navigate to search results page
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.append("name", keyword);
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedArea) params.append("area", selectedArea);

    navigate(`/SearchResults?${params.toString()}`); // ✅ Redirect with params
  };

  // ✅ Fetch category & area data
  const getcategory = async () => {
  try {
    const res = await fetch("https://pakclassified.onrender.com/createCategory/Get", {
      credentials: "include"
    });
    const data = await res.json();  // 👈 pehle data parse karo
    console.log(data);              // 👈 ab console me dekho
    setCategories(data);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};


  const getCityArea = async () => {
    try {
      const res = await fetch("https://pakclassified.onrender.com/createArea/Get", {
      credentials: "include"
    });
      const data = await res.json();
      setCityArea(data);
    } catch (error) {
      console.error("Error fetching City Areas:", error.message);
    }
  };

  useEffect(() => {
    getcategory();
    getCityArea();
  }, []);

  return (
    <div className="search-page">
      {/* 🔍 Search Bar */}
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
          {categories.length > 0 ? (
            categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.Name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No category exist
            </option>
          )}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Select City/Area</option>
          {CityArea.length > 0 ? (
            CityArea.map((area) => (
              <option value={area._id} key={area._id}>
                {area.Name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No Area here
            </option>
          )}
        </select>

        <button className="btn dark" onClick={handleSearch}>
          Search <i className="fa-brands fa-searchengin"></i>
        </button>
      </div>

      {/* ✅ Inline CSS */}
      <style>
        {`
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
          background: #07da97ff; /* Green for desktop */
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

        /* 🔹 Tablet (768px – 1024px) - White Background */
        @media (max-width: 1024px) {
          .search-band {
            background: white; /* White background for tablet */
            border-bottom: 1px solid #e0e0e0;
          }
        }

        /* 🔹 Mobile (≤768px) - White Background */
        @media (max-width: 768px) {
          .search-band {
            background: white; /* White background for mobile */
            border-bottom: 1px solid #e0e0e0;
            padding: 15px;
          }

          .search-band input,
          .search-band select {
            min-width: 140px;
            padding: 12px;
          }

          .btn.dark {
            padding: 12px 20px;
          }
        }

        /* 🔹 Small Mobile (≤480px) */
        @media (max-width: 480px) {
          .search-band {
            padding: 12px;
            gap: 8px;
          }

          .search-band input,
          .search-band select {
            min-width: 120px;
            padding: 10px;
            font-size: 14px;
          }

          .btn.dark {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
        `}
      </style>
    </div>
  );
}