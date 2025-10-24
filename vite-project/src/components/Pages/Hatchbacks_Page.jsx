// import React, { useEffect, useState } from "react";

// export default function HatchBacks() {
//   const [Card, setCard] = useState([]);

//   async function Getdata() {
//     try {
//       let res = await fetch(
//         "https://pakclassified.onrender.com/api/v1/createAdvertisement/category/68da6923f1870df2f03dee7a"
//       );
//       let data = await res.json();
//       setCard(data);
//     } catch (err) {
//       console.log("Error fetching data:", err.message);
//     }
//   }

//   useEffect(() => {
//     Getdata();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//   <h1>Hatchback Cars</h1>
//   {Card.length === 0 ? (
//     <p>No cars found for this category</p>
//   ) : (
//     Card.map((item) => (
//       <div
//         key={item._id}
//         style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
//       >
//         <h2>{item.Name}</h2>
//         <img
//           src={`https://pakclassified.onrender.com/uploads/${item.Image}`}
//           alt={item.Name}
//           width="200"
//         />
//         <p>{item.Description}</p>
//         <p><strong>Price:</strong> {item.Price}</p>
//       </div>
//     ))
//   )}
// </div>
   
//   );
// }
