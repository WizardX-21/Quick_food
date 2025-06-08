// src/screens/Contact.js

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// <-- Import Footer

import { API_BASE_URL } from "../api";   // <-- Import the API

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
    rating: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{
          color: i < form.rating ? "#FFD600" : "#bbb",
          cursor: "pointer",
          fontSize: 24,
        }}
        onClick={() => setForm({ ...form, rating: i + 1 })}
        data-testid={`star-${i + 1}`}
      >
        ★
      </span>
    ));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        setError("Could not submit review. Try again.");
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h2 style={{ color: "#ff385c" }}>Thank you for your feedback!</h2>
          <p>We appreciate your review.</p>
        </div>
        <Footer /> {/* Show footer here */}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5" style={{ maxWidth: 500 }}>
        <h2 className="mb-4 text-center" style={{ color: "#ff385c" }}>
          Contact &amp; Review Us
        </h2>
        <form className="bg-dark p-4 rounded shadow" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              required
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              style={{ borderRadius: 8 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              required
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              style={{ borderRadius: 8 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Address</label>
            <input
              required
              type="text"
              name="address"
              className="form-control"
              value={form.address}
              onChange={handleChange}
              style={{ borderRadius: 8 }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Message</label>
            <textarea
              required
              name="message"
              className="form-control"
              rows={3}
              value={form.message}
              onChange={handleChange}
              style={{ borderRadius: 8 }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-white">Review us (out of 5):</label>
            <div>{renderStars()}</div>
          </div>
          {error && (
            <div className="alert alert-danger py-1">{error}</div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ background: "#ff385c", border: "none", borderRadius: 8 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer /> {/* Show footer here too */}
    </>
  );
}
