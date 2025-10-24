import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form"
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CarDetails from './MoreDetails';
import { Link } from "react-router-dom";


export default function ProfilePage({ isAuthenticated, setIsAuthenticated }) {

  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  // const [show, setShow] = useState(false); // modal dikhanay ke liye
  // const handleClose = () => setShow(false); // modal band karne ke liye
  const [currentAd, setCurrentAd] = useState(null);
  const [showAdModal, setShowAdModal] = useState(false); // Advertisement modal
  const handleCloseAdModal = () => setShowAdModal(false);
  const [categories, setCategories] = useState([]);
  const [CityArea, setCityArea] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);


  const handleDeleteAd = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await fetch(`https://pakclassified.onrender.com/createAdvertisement/delete/${adId}`, { method: "DELETE", credentials: "include" });
      setAds((prev) => prev.filter((ad) => ad._id !== adId));
      alert("Ad Deleted Successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleAdEdit = (ad) => {
    if (categories.length === 0 || CityArea.length === 0) {
      alert("Categories or CityArea not load now");
      return;
    }

    setCurrentAd(ad);
    reset({
      Name: ad.Name,
      Description: ad.Description,
      Price: ad.Price,
      Features: ad.Features,
      StartsOn: ad.StartsOn?.slice(0, 10) || "",
      EndsOn: ad.EndsOn?.slice(0, 10) || "",
      CityArea: ad.CityArea?._id || "",
      Category: ad.Category?._id || ""
    });
    setShowAdModal(true);
  };






  const EditAdDone = async (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.Name);
      formData.append("Price", data.Price);
      formData.append("Description", data.Description);
      formData.append("Features", data.Features);
      formData.append("StartsOn", data.StartsOn);
      formData.append("EndsOn", data.EndsOn);
      formData.append("Category", data.Category);
      formData.append("CityArea", data.CityArea);
      if (data.Image && data.Image[0]) {
        formData.append("Image", data.Image[0]);
      }

      const res = await fetch(
        `https://pakclassified.onrender.com/createAdvertisement/update/${currentAd._id}`,
        {
          method: "PUT",
          body: formData,
           credentials: "include"
        }
      );

      const updatedAd = await res.json();
      setAds((prev) =>
        prev.map((ad) => (ad._id === updatedAd._id ? updatedAd : ad))
      );
      alert("Ad updated successfully!");
      handleCloseAdModal();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };





  const handleShowInfo = () => {
    if (!user) return;
    resetInfo({
      Name: user.username || "",
      Email: user.email || "",
      Contact: user.contact || "",
      image: null
    });
    setShowInfo(true);
  };




  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },

  } = useForm({ mode: "onChange" })

  const {
  register: registerInfo,
  handleSubmit: handleSubmitInfo,
  reset: resetInfo,
  formState: { errors: errorsInfo },
} = useForm({ mode: "onChange" });

  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      window.location.href = "/"; // ✅ logout ke baad home redirect
    } catch (error) {
      console.error("Logout error:", error);
      console.log("Props check:", isAuthenticated, setIsAuthenticated);

    }
  };


  const EditDone = async (data) => {
    console.log("Form data submitted:", data);
    try {
      const formData = new FormData();
      formData.append("username", data.Name);
      formData.append("email", data.Email);
      formData.append("contact", data.Contact);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);


      const res = await fetch(`https://pakclassified.onrender.com/createuser/update/${user._id}`, {
        method: "PUT",
        body: formData,
         credentials: "include"
      });


      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser({
        ...updatedUser,
        image: updatedUser.image.startsWith("/uploads")
          ? `https://pakclassified.onrender.com${updatedUser.image}`
          : updatedUser.image
          
      });

      alert("Profile updated successfully!");
      handleCloseInfo(); // modal close
      window.location.reload();
    } catch (err) {
      console.error("Update error:", err);
      alert("Profile update failed");
    }
  };

  useEffect(() => {
    fetch("https://pakclassified.onrender.com/createCategory/Get", {
      credentials: "include" // ✅ cookies/session ke liye
    })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));

    fetch("https://pakclassified.onrender.com/createArea/Get", {
      credentials: "include" // ✅ cookies/session ke liye
    })
      .then(res => res.json())
      .then(data => setCityArea(data))
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    console.log(localStorage.getItem("user"));
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const fixedUser = {
        ...userData,
       image: userData.image
  ? userData.image.startsWith("http")
    ? userData.image
    : `https://pakclassified.onrender.com/uploads/${userData.image.replace(/^\/uploads\//, "")}`
  : "https://www.attitudestatus.org/wp-content/uploads/2020/12/20-scaled.jpg",

      };
      setUser(fixedUser);

    }
  }, []);
  useEffect(() => {
  if (user?._id) {
    fetch(`https://pakclassified.onrender.com/createAdvertisement/user/${user._id}`, {
      credentials: "include"
    })
      .then(res => res.json()) // 👈 ye missing tha
      .then(data => {
        console.log("✅ User ads fetched:", data);
        setAds(data);
      })
      .catch(err => console.error("Error fetching user ads:", err));
  }
}, [user]);


  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading user data...</h2>;
  }


  return (
    <>

      <Modal show={showAdModal} onHide={handleCloseAdModal}>
        <Modal.Header
          style={{ color: "white" }}
          className="bg-success"
          closeButton closeVariant="white"
        >
          <Modal.Title>Edit Advertisement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(EditAdDone)} encType="multipart/form-data">
            <Row className="mb-3">
              <Form.Group
                style={{ width: "100%" }}
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  {...register("Name", { required: "Name is required" })}
                />{errors.Name && <p style={{ color: "red" }}>{errors.Name.message}</p>}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                style={{ width: "100%" }}
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  {...register("Price", { required: "Price is required" })}
                />{errors.Price && <p style={{ color: "red" }}>{errors.Price.message}</p>}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group
              style={{ width: "100%" }}
              as={Col}
              md="4"
              controlId="validationCustom05"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Add Description"
                {...register("Description", { required: "Description is required" })}
              />
              {errors.Description && <p style={{ color: "red" }}>{errors.Description.message}</p>}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              style={{ width: "100%" }}
              as={Col}
              md="4"
              controlId="validationCustom05"
            >
              <Form.Label>Features</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Add Features"
                {...register("Features", { required: "Features is required" })}
              />
              {errors.Features && <p style={{ color: "red" }}>{errors.Features.message}</p>}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>


            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label style={{ width: "50%" }}>
                  Starts On <i className="fa-solid fa-calendar-week"></i>
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  {...register("StartsOn", { required: "Starting Date is required" })}
                />
                {errors.StartsOn && <p style={{ color: "red" }}>{errors.StartsOn.message}</p>}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label style={{ width: "50%" }}>
                  Ends On <i className="fa-solid fa-calendar-week"></i>
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  {...register("EndsOn", { required: "Ending Date is required" })}
                />
                {errors.EndsOn && <p style={{ color: "red" }}>{errors.EndsOn.message}</p>}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="validationCustom07">
                  <Form.Label>Category</Form.Label>
                  <Form.Select {...register("Category", { required: "Category is required" })}>
                    <option value="">Select</option>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {category.Name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No category exist</option>
                    )}
                  </Form.Select>
                  {errors.Category && <p style={{ color: "red" }}>{errors.Category.message}</p>}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="validationCustom08">
                  <Form.Label>City Area</Form.Label>
                  <Form.Select {...register("CityArea", { required: "City Area is required" })}>
                    <option value="">Select</option>
                    {CityArea && CityArea.length > 0 ? (
                      CityArea.map((area) => (
                        <option value={area._id} key={area._id}>
                          {area.Name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No Area here</option>
                    )}
                  </Form.Select>
                  {errors.CityArea && <p style={{ color: "red" }}>{errors.CityArea.message}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file"  {...register("Image")} />

              {errors.Image && <p style={{ color: "red" }}>{errors.Image.message}</p>}
            </Form.Group>


            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdModal}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>












      <Modal show={showInfo} onHide={handleCloseInfo}>
        <Form onSubmit={handleSubmitInfo(EditDone)} encType="multipart/form-data">
          {console.log("🟩 Form rendered")}
          <Modal.Header
            closeButton
            style={{ color: "white" }}
            className="bg-success"
            closeVariant="white"
          >
            <Modal.Title>Edit Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...registerInfo("Name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters" },
                })}
                defaultValue={user?.username}
              />
              {errorsInfo.Name && <p style={{ color: "red" }}>{errorsInfo.Name.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email Address"
                {...registerInfo("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter valid email",
                  },
                })}
                defaultValue={user?.email}
              />
              {errorsInfo.Email && <p style={{ color: "red" }}>{errorsInfo.Email.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact number"
                {...registerInfo("Contact", {
                  required: "Contact number is required",
                  pattern: { value: /^[0-9]{10,11}$/, message: "Enter valid number" },
                })}
                defaultValue={user?.contact}
              />
              {errorsInfo.Contact && <p style={{ color: "red" }}>{errorsInfo.Contact.message}</p>}
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" {...registerInfo("image")} />
              {errorsInfo.image && <p style={{ color: "red" }}>{errorsInfo.image.message}</p>}
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInfo}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>








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
          <div className="hero-text-box">
            <h1>User Dashboard</h1>
          </div>
        </div>
      </section>


      <div className="profile-container">
        <style>{`
        .view-btn[title] {
  pointer-events: none; /* white tooltip ko disable karega */
}
        .profile-container {
  display: flex;
  justify-content: center;
  padding: 0; /* remove extra space */
  background-color: #fff; /* pure white background */
  font-family: Arial, sans-serif;
  min-height: 100vh; /* full height page */
}

.profile-wrapper {
  display: flex;
  background-color: white;
  padding: 40px;
  border-radius: 0; /* remove round corners */
  box-shadow: none; /* remove shadow for flat look */
  width: 100%; /* full width */
  max-width: 100%; /* allow full expansion */
}

.left-side {
  width: 19%;       /* 25% se kam kar diya */
  text-align: center;
  border-right: 1px solid #ddd;
  padding-right: 20px;
  margin-left: -10px;   /* 👈 thoda aur left */
}

.left-side img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}
.left-side h2 {
  color: #007f00;
  font-size: 22px;
  margin-bottom: 8px;
}
.left-side p {
  color: #333;
  font-size: 14px;
  margin: 2px 0;
  line-height: 1.4;
  text-align: left;  /* 👈 added */
  padding-left: 45px; /* 👈 thoda left se start hone ke liye space */
}

.left-side .label {
  font-weight: bold;
  width: auto;
  margin-right: 5px;
  display: inline-block;
}



.left-side button {
  border: none;
  padding: 8px 14px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin: 8px 5px;
  font-size: 14px;
}
.edit-btn {
  background-color: #1fb28a;
}
.logout-btn {
  background-color: #007bff;
}

/* ✅ Hover sirf Edit Info aur Logout par */
.edit-btn:hover {
  background-color: #17a078;
}
.logout-btn:hover {
  background-color: #0066cc;
}

.right-side {
  width: 90%;
  padding-left: 35px;
}
.right-side h3 {
  text-align: center;
  color: #007f00;
  font-size: 22px;
  margin-bottom: 25px;
}
.ad-card {
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.ad-card img {
  width: 250px;        /* thoda chhota aur consistent */
  height: 100%;        /* card ki height ke hisaab se fit ho jaye */
  object-fit: cover;   /* image crop ho ke fit ho jaye */
  flex-shrink: 0;      /* resize na ho */
  border-right: 1px solid #ddd; /* separation */
}

.ad-info {
  padding: 10px 15px;
  flex-grow: 1;
}
.ad-info h4 {
  font-size: 21px;
  color: #333;
  margin-bottom: 5px;
}
.ad-info p {
  font-size: 16px;
  color: #555;
  margin-bottom: 6px;
  text-align: justify;
}
.price {
  font-weight: bold;
  color: #000;
}
.city {
  font-size: 13px;
  color: #333;
}
.btn-group {
  margin-top: 8px;
}
.btn-group button {
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  margin-right: 6px;
  cursor: pointer;
}
/* ❌ In buttons pe koi hover effect nahi hoga */
.del-btn {
  background-color: #dc3545;
}
.edit2-btn {
  background-color: #28a745;
}
.view-btn {
  background-color: #007bff;
}

.del-btn:hover {
  background-color: #dc3545;
}
.edit2-btn:hover {
  background-color: #28a745;
}
.view-btn:hover {
  background-color: #007bff;
}

@media(max-width: 768px) {
  .profile-wrapper {
    flex-direction: column;
  }
  .left-side {
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .right-side {
    width: 100%;
    padding-left: 0;
  }
  .ad-card {
    flex-direction: column;
    align-items: center;
  }
  .ad-card img {
    width: 100%;
    height: 200px;
  }
  .ad-info {
    padding: 10px;

    
  }
}

      `}</style>

        <div className="profile-wrapper">
          {/* Left Profile */}
          <div className="left-side">
            <img src={user.image} alt="Profile" />
            <h2><b>{user.username}</b></h2>
            <p><span className="label">Email:</span> {user.email}</p>
            <p><span className="label">Contact:</span> {user.contact}</p>
            <div>
              <button className="edit-btn" onClick={handleShowInfo}>Edit Info <i class="fa-solid fa-pen-to-square"></i></button>
              <button className="logout-btn" onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  handleLogout();
                }
              }}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
          </div>

          {/* Right Side Ads */}
          <div className="right-side">
            <h3>Posted Advertisements</h3>
            {ads.length === 0 && <p className="text-center mt-5">No ads posted yet.</p>}
            {ads.map((ad) => (
              <div key={ad._id} className="ad-card">
                <img
                  src={ad.Image?.startsWith("http")
                    ? ad.Image
                    : `https://pakclassified.onrender.com/uploads/${ad.Image}`}
                  alt={ad.Name}
                  crossOrigin="use-credentials"
                />

                <div className="ad-info">
                  <h4>{ad.Name}</h4>
                  <p>{ad.Description}</p>
                  <p className="price">Price: Rs {ad.Price}</p>
                  <p className="city">City Area: {ad.CityArea?.Name || "N/A"}</p>
                  <p className="city">Category: {ad.Category?.Name || "N/A"}</p>


                  <div className="btn-group">
                    <button className="del-btn" onClick={() => handleDeleteAd(ad._id)}>Delete<i class="fa-solid fa-trash"></i></button>
                    <button className="edit2-btn" onClick={() => handleAdEdit(ad)}>Edit <i class="fa-solid fa-pen-to-square"></i></button>
                    <button className="view-btn"><li><Link to={`/CarDetails/${ad._id}`} className="dropdown-item" >View More</Link></li>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
