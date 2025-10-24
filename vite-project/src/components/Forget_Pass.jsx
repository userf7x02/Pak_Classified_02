import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ForgotPassword({ show, handleClose }) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPass, setNewPass] = useState("");
    const [step, setStep] = useState(1); // 1=email, 2=otp

    const sendOtp = async () => {
        try {
            const res = await fetch("https://pakclassified.onrender.com/createAuth/forgot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email }),
                
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("OTP sent to your email!");
                setStep(2);
            } else toast.error(data.message || "Failed to send OTP");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }

    };

    const resetPassword = async () => {
        try {
            const res = await fetch("https://pakclassified.onrender.com/createAuth/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, otp, newPassword: newPass }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Password reset successful!");
                handleClose();
                 window.location.reload();
            } else toast.error(data.message || "Invalid OTP");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-success" closeVariant="white">
                <Modal.Title style={{ color: "white" }}>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step === 1 && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" onClick={sendOtp}>
                            Send OTP
                        </Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="success" onClick={resetPassword}>
                            Reset Password
                        </Button>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
