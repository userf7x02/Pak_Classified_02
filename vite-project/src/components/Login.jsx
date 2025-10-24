import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ForgotPassword from './Forget_Pass';

function Login({ show, handleClose, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const LoginDone = async (data) => {
    const payload = {
      email: data.Email,
      password: data.Password,
    };

    try {
      const res = await fetch(`https://pakclassified.onrender.com/createlogin/login`, {
        method: "POST",
         credentials: "include",
        
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const item = await res.json();

      if (res.ok) {
        toast.success("Login Successful");
        reset();
        localStorage.setItem("user", JSON.stringify(item.user));
        handleClose();
          window.location.reload();
        if (onSuccess) onSuccess(item.user);
      } else {
        toast.error(item.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

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
        <Modal.Header closeButton className="bg-success" closeVariant="white">
          <Modal.Title style={{ color: "white" }}>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(LoginDone)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email Address"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })}
              />
              {errors.Email && <p style={{ color: "red" }}>{errors.Email.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3" style={{ position: "relative" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
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
                style={{ cursor: "pointer", position: "absolute", right: "10px", top: "38px" }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>

              {/* ✅ Forgot Password Link */}
              <p
                style={{
                  color: "#00cc66",
                  marginTop: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  fontWeight: "500",
                }}
                onClick={() => {
                  handleClose(); // Close login modal
                  setTimeout(() => setShowForgot(true), 300); // Forgot modal open after a moment
                }}
              >
                Forgot Password?
              </p>

            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="success" onClick={handleSubmit(LoginDone)}>Login</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ForgotPassword show={showForgot} handleClose={() => setShowForgot(false)} />

    </>
  );
}

export default Login;
