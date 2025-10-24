import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
const Post = ({ show, handleClose }) => {
    const [categories, setCategories] = useState([]);
    const [CityArea, setCityArea] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const getcategory = async () => {
        try {
            const res = await fetch("https://pakclassified.onrender.com/createCategory/Get", {
                credentials: "include" // ✅ cookies/session ke liye
            })
            if (!res.ok) {
                // toast.error("Failed to fetch categories");
            }
            const data = await res.json();
            console.log("Categories:", data);
            setCategories(data);

        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    }
    const getCityArea = async () => {
        try {
            const res = await fetch("https://pakclassified.onrender.com/createArea/Get", {
                credentials: "include" // ✅ cookies/session ke liye
            })
            if (!res.ok) {
                // toast.error("Failed to fetch categories");
            }
            const data = await res.json();
            console.log("CityArea:", data);
            setCityArea(data);

        } catch (error) {
            console.error("Error fetching City Areas:", error.message);
        }
    }

    const onSubmit = async (formData) => {
        try {
            let url = "https://pakclassified.onrender.com/createAdvertisement";
            let method = "POST";
            const formDataToSend = new FormData();

            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user._id) {
                formDataToSend.append("userId", user._id);
            } else {
                toast.error("User not logged in!");
                return;
            }


            // sari fields append karo
            for (let key in formData) {
                if (key === "Image") {
                    // File input ke liye FileList me se pehla file lena
                    formDataToSend.append("Image", formData.Image[0]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            const res = await fetch(url, {
                method,
                body: formDataToSend,
                 credentials: "include"
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to post Advertisement");
                return;
            }

            toast.success("Advertisement Added successfully");
            reset();
            handleClose();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Server Error 🚨");
        }
    };


    useEffect(() => {
        getcategory();
        getCityArea();

    }, [])

    return (
        <>
            <style>
                {` 
                
            

    .form-control {
      border: 1px solid #ccc !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      transition: all 0.3s ease !important;
    }

    .form-control:focus {
      border: 1.5px solid #00cc66 !important; /* green border */
      box-shadow: 0 0 8px rgba(0, 204, 102, 0.4) !important; /* soft green glow */
      background-color: #f9fff9 !important; /* slight greenish bg */
    }

    .form-select:focus {
      border: 1.5px solid #00cc66 !important;
      box-shadow: 0 0 8px rgba(0, 204, 102, 0.4) !important;
      background-color: #f9fff9 !important;
    }

    /* ✅ Final White Cross Button Fix */
.modal-header .btn-close {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 16 16'%3E%3Cpath d='M2 2l12 12M14 2L2 14' stroke='%23ffffff' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: 1.2rem !important;
  border: none !important;
  opacity: 1 !important;
  cursor: pointer !important;
  background-color: transparent !important;
  transition: transform 0.2s ease !important;
}

.modal-header .btn-close:hover {
  transform: scale(1.1);
  background-color: transparent !important;
  opacity: 1 !important;
}

      
  `}
            </style>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header
                    style={{ color: "white" }}
                    className="bg-success"
                    closeButton closeVariant="white"
                >
                    <Modal.Title>Post Advertisement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                            <Form.Control type="file"  {...register("Image", {
                                required: "Image is required",
                            })} />
                            {errors.Image && <p style={{ color: "red" }}>{errors.Image.message}</p>}
                        </Form.Group>


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" type="submit">
                                Post Advertisement
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>)

}

export default Post