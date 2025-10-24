import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [carCounts, setCarCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ async function ke andar pura logic
    async function fetchData() {
      try {
        // Step 1: Get all categories
        const res = await fetch("https://pakclassified.onrender.com/createCategory/Get", {
      credentials: "include" // ✅ cookies/session ke liye
    })
        const data = await res.json();
        setCategories(data);

        // Step 2: Get car count for each category safely
        const counts = {};
        for (let i = 0; i < data.length; i++) {
          const c = data[i];
          try {
            const res2 = await fetch(
              `https://pakclassified.onrender.com/createAdvertisement/category/${c._id}`,
               { credentials: "include" }
            );
            const cars = await res2.json();
            counts[c._id] = cars.length;
          } catch {
            counts[c._id] = 0;
          }
        }

        // Step 3: Save all counts
        setCarCounts(counts);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid categories">
      {categories.length > 0 ? (
        categories.map((c) => (
          <div
            key={c._id}
            className="card category-card"
            onClick={() => navigate(`/category/${c._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={c.Image} alt={c.Name} />
            <div className="card-body">
              <h4>{c.Name}</h4>
              <small>
                {carCounts[c._id] !== undefined ? carCounts[c._id] : 0} 
              </small>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-4">No categories found</p>
      )}
    </div>
  );
}
