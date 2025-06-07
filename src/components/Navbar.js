import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar({
  searchValue,
  onSearchChange,
  recommendations = [],
  onSelectRecommendation
}) {
  const [cartView, setCartView] = React.useState(false);
  let navigate = useNavigate();
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
        .navbar-quickfood {
          background: #ff7043;
          color: #fff;
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(39,48,67,0.08);
          padding: 0;
          min-height: 64px;
        }
        .navbar-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 100vw;
          margin: 0;
          padding: 0 16px;
          min-height: 64px;
        }
        .navbar-brand {
          font-family: 'Noto Sans KR', 'Montserrat', sans-serif;
          font-weight: bold;
          font-size: 1.45rem;
          color: #fff;
          letter-spacing: 1.4px;
          margin-right: 18px;
          padding: 0;
        }
        .search-bar-wrap {
          position: relative;
          width: 350px;
          margin-right: 18px;
        }
        .search-form-myntra {
          display: flex;
          align-items: center;
          min-width: 210px;
          width: 100%;
        }
        .input-group-myntra {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          z-index: 2;
          display: flex;
          align-items: center;
          height: 100%;
          pointer-events: none;
        }
        .input-myntra {
          width: 100%;
          height: 38px;
          border-radius: 22px;
          border: none;
          background: #fff;
          color: #232323;
          padding-left: 38px;
          font-size: 1rem;
          box-shadow: 0 1px 4px rgba(39,48,67,0.05);
          outline: none;
          transition: box-shadow 0.13s;
        }
        .input-myntra:focus {
          box-shadow: 0 2px 10px rgba(39,48,67,0.10);
        }
        .search-suggestions {
          position: absolute;
          top: 45px;
          left: 0;
          width: 100%;
          background: #fff;
          color: #222;
          z-index: 999;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 12px rgba(39,48,67,0.08);
          padding: 0;
          margin: 0;
          list-style: none;
          max-height: 270px;
          overflow-y: auto;
        }
        .search-suggestions li {
          padding: 10px 18px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.18s;
        }
        .search-suggestions li:hover {
          background: #ffe5d0;
          color: #d84315;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: 24px;
          margin-right: 24px;
        }
        .navbar-links .nav-link {
          color: #fff;
          font-weight: 600;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          padding: 4px 8px;
          transition: color 0.16s;
          text-decoration: none;
          position: relative;
        }
        .navbar-links .nav-link:hover, .navbar-links .nav-link.active {
          color: #232323;
        }
        .navbar-links .nav-link::after {
          content: "";
          display: block;
          height: 2px;
          width: 0;
          background: #fff;
          transition: width 0.23s cubic-bezier(.4,0,.2,1);
          position: absolute;
          left: 0;
          bottom: -2px;
          border-radius: 3px;
        }
        .navbar-links .nav-link:hover::after,
        .navbar-links .nav-link.active::after {
          width: 100%;
        }
        .auth-cart-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .auth-cart-buttons .btn {
          padding: 7px 16px;
          font-weight: 600;
          border-radius: 7px;
          font-size: 1rem;
        }
        .auth-cart-buttons .btn-light {
          background: #fff;
          color: #ff385c;
          border: none;
        }
        .auth-cart-buttons .btn-light:hover {
          background: #ffe4ec;
        }
        .auth-cart-buttons .btn-danger {
          background: #ff385c;
          color: #fff;
          border: none;
        }
        .auth-cart-buttons .btn-danger:hover {
          background: #e02a4a;
        }
        .MuiBadge-badge {
          background-color: #03a9f4 !important;
        }
        @media (max-width: 900px) {
          .navbar-flex { flex-wrap: wrap; gap: 5px;}
          .search-bar-wrap { width: 220px;}
          .search-form-myntra { min-width: 110px; width: 160px; margin-right: 6px;}
          .navbar-links { gap: 15px; margin-left: 6px; margin-right: 6px;}
        }
        @media (max-width: 700px) {
          .navbar-flex { flex-direction: column; gap: 7px; min-height: 0; }
          .navbar-brand { margin-right: 0; margin-bottom: 5px;}
          .search-bar-wrap { margin: 8px 0; width: 97%; }
          .navbar-links { gap: 9px; margin: 4px 0;}
          .auth-cart-buttons { width: 100%; justify-content: center;}
        }
        `}
      </style>
      <nav className="navbar-quickfood">
        <div className="navbar-flex">
          {/* Brand */}
          <Link className="navbar-brand" to="/">
            QuickFood
          </Link>
          {/* Search Bar & Suggestions */}
          <div className="search-bar-wrap">
            <form className="search-form-myntra" onSubmit={e => e.preventDefault()}>
              <div className="input-group-myntra">
                <span className="input-icon">
                  {/* Simple search icon */}
                  <svg width="19" height="19" fill="none" stroke="#696e79" strokeWidth="2" viewBox="0 0 20 20">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                    <line x1="14.3" y1="14.3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="input-myntra"
                  placeholder="Search for food, category, etc."
                  value={searchValue}
                  onChange={onSearchChange}
                  aria-label="Search for food"
                  autoComplete="off"
                />
              </div>
            </form>
            {recommendations.length > 0 && (
              <ul className="search-suggestions">
                {recommendations.map((item, idx) => (
                  <li key={item._id || idx} onClick={() => onSelectRecommendation(item)}>
                    {item.name} <span style={{ fontSize: 13, color: "#8d99ae" }}>({item.CategoryName})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Horizontal Links */}
          <div className="navbar-links">
            <Link className="nav-link" to="/">Home</Link>
            {localStorage.getItem("token") && (
              <Link className="nav-link" to="/myorder">My Orders</Link>
            )}
            <Link className="nav-link" to="/contact">Contact</Link>
          </div>
          {/* Auth & Cart Buttons */}
          <div className="auth-cart-buttons">
            {!localStorage.getItem("token") ? (
              <>
                <Link className="btn btn-light" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <button
                  className="btn btn-light d-flex align-items-center gap-1"
                  onClick={() => setCartView(true)}
                >
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
