import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup({ show, handleClose ,onSuccess}) {


  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
     reset,
    formState: { errors },

  } = useForm({ mode: "onChange" })

  const SignupDone = async (data) => {
    const formdata = new FormData();
    formdata.append("username", data.Name);
    formdata.append("email", data.Email);
    formdata.append("password", data.Password);
    formdata.append("contact", data.Contact);
    formdata.append("image", data.image[0]);

    try {
      const res = await fetch(`https://pakclassified.onrender.com/createuser/signup`, {
        method: "POST",
        credentials: "include",
        body: formdata,
      });

      const item = await res.json();
      console.log(item)


      if (item.success) {
        toast.success(item.message || "User Created Successfully");
        reset();
         localStorage.setItem("user", JSON.stringify(item.user)); 
         localStorage.setItem("userId", item.user._id);

        handleClose();
         if (onSuccess) onSuccess(item.user);

      } else {
        toast.error(item.message || "Failed to Create User");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create User");
    }
  };


  return (

    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton

          style={{ color: "white" }}
          className='bg-success'
          closeVariant="white">
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form noValidate onSubmit={handleSubmit(SignupDone)}>
          <Form.Group className="mb-3" >
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text"
              placeholder="Enter your name"
              {...register("Name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long"
                }
              })}
            />
            {errors.Name && <p style={{ color: "red" }}>{errors.Name.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email"
              placeholder="Enter your Email Address"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address"
                }
              })} />
            {errors.Email && <p style={{ color: "red" }}>{errors.Email.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Password</Form.Label>
            <Form.Control type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }

              })}

            />

            {errors.Password && <p style={{ color: "red" }}>{errors.Password.message}</p>}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", position: "absolute", right: "20px", top: "224px" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Contact</Form.Label>
            <Form.Control type="text"
              placeholder="Enter your contact number"
              {...register("Contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "Enter a valid contact number"
                }
              })}
            />
            {errors.Contact && <p style={{ color: "red" }}>{errors.Contact.message}</p>}
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file"  {...register("image", {
              required: "Image is required",
            })} />
            {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
          </Form.Group>
        </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit(SignupDone)}>
            SignUp
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}   <style>
    {`
      .form-control {
        border: 1px solid #ccc !important;
        border-radius: 6px !important;
        box-shadow: none !important;
        transition: all 0.3s ease !important;
      }

      .form-control:focus {
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


export default Signup;

