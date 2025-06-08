// src/screens/MyOrder.js
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    const response = await res.json();
    setOrderData(response.orderData || []);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.length === 0 ? (
            <div className="m-5 w-100 text-center fs-3">
              No orders found!
            </div>
          ) : (
            orderData.slice(0).reverse().map((order, idx) => (
              <div key={idx} className="mb-5">
                <div className="fs-4 fw-bold mb-3">Date: {order.Order_date || "Unknown"}</div>
                <div className="row">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, i) => (
                      <div className="col-12 col-md-6 col-lg-3" key={item.id || i}>
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                            onError={e => (e.target.src = "https://via.placeholder.com/120x80?text=No+Image")}
                            style={{ height: "120px", objectFit: "fill" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                              <span className="m-1">{item.qty}</span>
                              <span className="m-1">{item.size}</span>
                              <span className="m-1">₹{item.price}/-</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No items in this order.</div>
                  )}
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
