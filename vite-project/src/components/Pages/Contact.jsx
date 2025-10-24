import React from "react";
import "./Contact.css";
import { toast } from "react-toastify";

export default function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("https://pakclassified.onrender.com/createContact/sendContact", {
        method: "POST",
      
      credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(" Message sent successfully!");
        e.target.reset(); // clear form after success
      } else {
        toast.error("Failed to send message!");
      }
    } catch (error) {
      toast.error(" Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
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
            <h1>Contact with us
            </h1>
            <p>We are here to assist you anytime</p>
          </div>
        </div>
      </section>

      {/* Contact Title */}
      <div className="contact-title">
        <h2>Contact For Any Query</h2>
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        {/* Left Side: Info + Map */}
        <div className="contact-info">
          <p><i className="fas fa-map-marker-alt"></i> Gulberg II, Lahore</p>
          <p><i className="fas fa-envelope"></i> evs@gmail.com</p>
          <p><i className="fas fa-phone"></i> 0300 1237 387</p>

          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13601.345922179498!2d74.3438893157859!3d31.509663781375814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905e0c94872e1%3A0xf2c0f5b46d1436!2sGulberg%20II%2C%20Lahore!5e0!3m2!1sen!2s!4v1698765432109!5m2!1sen!2s"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "8px", marginTop: "10px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right Side: Form */}
        <div className="contact-form">
          <p>
            For any inquiries, assistance, or feedback, please fill out our
            contact form below. Our team is committed to responding promptly to
            ensure your experience with PakClassified is exceptional.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea name="message" placeholder="Leave a message here" rows="5"></textarea>
            <button type="submit">Send Message</button>
          </form>

        </div>
      </div>
    </div>
  );
}
