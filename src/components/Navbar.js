import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  const items = useCart();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  // For searchbar recommendations (if provided as props)
  const { searchValue, onSearchChange, recommendations = [], onSelectRecommendation } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <style>{`
        .navbar-quickfood {
          background: #ff774b;
          color: #fff;
          position: sticky;
          top: 0;
          width: 100vw;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(39,48,67,0.08);
          padding: 0;
          min-height: 60px;
        }
        .navbar-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          max-width: 100vw;
          height: 60px;
        }
        .navbar-brand {
          font-family: 'Montserrat', 'Noto Sans KR', sans-serif;
          font-weight: bold;
          font-size: 1.1rem;
          color: #fff;
          letter-spacing: 1.1px;
          padding: 0;
          margin: 0 10px 0 0;
          white-space: nowrap;
        }
        .search-form-myntra {
          display: flex;
          align-items: center;
          width: 210px;
          margin: 0 10px;
          position: relative;
        }
        .input-group-myntra {
          position: relative;
          width: 100%;
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
          height: 36px;
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
        .input-myntra::placeholder {
          font-size: 0.87rem;
          color: #888;
          opacity: 1;
        }
        .input-myntra:focus {
          box-shadow: 0 2px 10px rgba(39,48,67,0.10);
        }
        .search-dropdown {
          position: absolute;
          top: 40px;
          left: 0;
          width: 100%;
          background: #fff;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          z-index: 99;
          max-height: 220px;
          overflow-y: auto;
        }
        .search-dropdown-item {
          padding: 7px 16px;
          cursor: pointer;
          color: #282c3f;
          font-size: 0.96rem;
        }
        .search-dropdown-item:hover {
          background: #fff3ee;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 17px;
          margin: 0 5px;
        }
        .navbar-links .nav-link {
          color: #fff;
          font-weight: 600;
          font-size: 1.04rem;
          padding: 4px 5px;
          transition: color 0.14s;
          text-decoration: none;
          position: relative;
        }
        .navbar-links .nav-link:hover, .navbar-links .nav-link.active {
          color: #262626;
        }
        .navbar-links .nav-link::after {
          content: "";
          display: block;
          height: 2px;
          width: 0;
          background: #fff;
          transition: width 0.22s;
          position: absolute;
          left: 0;
          bottom: -2px;
          border-radius: 2px;
        }
        .navbar-links .nav-link:hover::after,
        .navbar-links .nav-link.active::after {
          width: 100%;
        }
        .auth-cart-buttons {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .auth-cart-buttons .btn {
          padding: 7px 15px;
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
          background: #ffd9c7;
        }
        .auth-cart-buttons .btn-danger {
          background: #ff385c;
          color: #fff;
          border: none;
        }
        .auth-cart-buttons .btn-danger:hover {
          background: #d62b4b;
        }
        .MuiBadge-badge {
          background-color: #ff385c !important;
        }
        /* Responsive styles */
        @media (max-width: 950px) {
          .navbar-flex { flex-wrap: wrap; height: auto; padding: 0 4px; }
          .search-form-myntra { width: 150px; margin: 0 3px;}
          .navbar-links { gap: 10px; }
          .navbar-brand { font-size: 1rem; margin-right: 0;}
        }
        @media (max-width: 700px) {
          .navbar-flex { flex-direction: column; height: auto; gap: 3px;}
          .navbar-brand { margin-bottom: 3px; }
          .search-form-myntra { width: 97%; margin: 5px 0 0 0;}
          .navbar-links { margin: 2px 0 2px 0; gap: 10px;}
          .auth-cart-buttons { width: 100%; justify-content: center; margin-top: 4px;}
        }
        @media (max-width: 500px) {
          .navbar-flex { flex-direction: column; padding: 0 1px; height: auto; }
          .navbar-brand { font-size: 0.97rem; }
          .search-form-myntra { width: 97vw; margin-top: 5px; }
          .navbar-links { font-size: 0.98rem; gap: 5px;}
        }
      `}</style>
      <nav className="navbar-quickfood">
        <div className="navbar-flex">
          <Link className="navbar-brand" to="/">QuickFood</Link>
          <form
            className="search-form-myntra"
            autoComplete="off"
            onSubmit={e => e.preventDefault()}
            style={{ position: "relative" }}
          >
            <div className="input-group-myntra">
              <span className="input-icon">
                <svg width="19" height="19" fill="none" stroke="#696e79" strokeWidth="2" viewBox="0 0 20 20">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="14.3" y1="14.3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                className="input-myntra"
                placeholder="Search for food,category"
                value={searchValue || ''}
                onChange={onSearchChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 180)}
                aria-label="Search for food"
                autoComplete="off"
              />
              {showDropdown && recommendations && recommendations.length > 0 && (
                <div className="search-dropdown">
                  {recommendations.map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="search-dropdown-item"
                      onMouseDown={() => onSelectRecommendation && onSelectRecommendation(item)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
          <div className="navbar-links">
            <Link className="nav-link" to="/">Home</Link>
            {localStorage.getItem("token") && (
              <Link className="nav-link" to="/myorder">My Orders</Link>
            )}
            <Link className="nav-link" to="/contact">Contact</Link>
          </div>
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
