import React from 'react';
import SearchIcon from '@mui/icons-material/Search'; // Or use an SVG/icon

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search_bar ms-3">
      <span className="search_icon">
        {/* <SearchIcon fontSize="small" /> */}
      </span>
      <input
        className="search_input"
        type="text"
        placeholder="Search for food,category etc."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
