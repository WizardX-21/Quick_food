import React from "react";

export default function Footer() {
  return (
    <>
      <style>
        {`
        .quickfood-footer {
          background: #23252b;
          color: #f5f5f6;
          padding: 32px 0 18px 0;
          text-align: center;
          border-top: 1.5px solid #373b47;
          margin-top: 64px;
        }
        .quickfood-footer .footer-links {
          margin-bottom: 18px;
          display: flex;
          justify-content: center;
          gap: 34px;
          flex-wrap: wrap;
        }
        .quickfood-footer .footer-links a {
          color: #ff385c;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.08rem;
          transition: color 0.2s;
          position: relative;
        }
        .quickfood-footer .footer-links a:hover {
          color: #fff;
          text-shadow: 0 2px 8px #ff385c33;
        }
        .quickfood-footer .footer-brand {
          font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
          font-weight: bold;
          font-size: 1.5rem;
          color: #ff385c;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }
        .quickfood-footer .footer-meta {
          font-size: 0.99rem;
          color: #babcc2;
          margin-top: 10px;
        }
        @media (max-width: 600px) {
          .quickfood-footer {
            padding: 24px 0 10px 0;
          }
          .quickfood-footer .footer-links {
            gap: 18px;
          }
          .quickfood-footer .footer-brand {
            font-size: 1.1rem;
          }
        }
      `}
      </style>
      <footer className="quickfood-footer">
        <div className="footer-brand">QuickFood</div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/myorder">My Orders</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          Hungry for more?  <span role="img" aria-label="sparkle"></span>  Taste the best Korean and Indian fusion dishes, only at <b>QuickFood</b>.
        </div>
        <div className="footer-meta">
          &copy; 2025 QuickFood, Inc. All rights reserved.
        </div>
      </footer>
    </>
  );
}
