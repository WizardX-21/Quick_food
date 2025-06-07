import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // Fetch food data from backend
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0] || []);
    setFoodCat(response[1] || []);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedSuggestion(null);
    if (value.length === 0) {
      setSearchSuggestions([]);
      return;
    }
    // Suggest matching food items by name or category
    const matches = foodItems.filter(item =>
      item.name?.toLowerCase().includes(value.toLowerCase()) ||
      item.CategoryName?.toLowerCase().includes(value.toLowerCase())
    );
    // Limit suggestions to 8
    setSearchSuggestions(matches.slice(0, 8));
  };

  // When user clicks a suggestion
  const handleSelectSuggestion = (item) => {
    setSelectedSuggestion(item);
    setSearch(item.name);
    setSearchSuggestions([]);
  };

  // The filtered items to display:
  let filteredBySearch = foodItems.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  // If user clicks a suggestion, show only that item (and highlight at top)
  let displayItems;
  if (selectedSuggestion) {
    displayItems = [selectedSuggestion];
  } else if (search.length > 0) {
    displayItems = filteredBySearch;
  } else {
    displayItems = foodItems;
  }

  return (
    <div>
      <Navbar
        searchValue={search}
        onSearchChange={handleSearchChange}
        recommendations={searchSuggestions}
        onSelectRecommendation={handleSelectSuggestion}
      />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "9" }}>
              {/* Searchbar in navbar only, so this is now empty */}
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* --- FOOD LISTINGS, grouped by category unless searching --- */}
      <div className='container'>
        {search.length === 0 && !selectedSuggestion ? (
          foodCat.length > 0 ?
            foodCat.map((data) => (
              <div className='row mb-3' key={data._id || data.CategoryName}>
                <div className='fs-3 m-3'>{data.CategoryName}</div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                {foodItems.length > 0 ?
                  foodItems
                    .filter((items) => items.CategoryName === data.CategoryName)
                    .map(filterItems => (
                      <div key={filterItems._id || filterItems.id} className='col-12 col-md-6 col-lg-3'>
                        <Card
                          foodName={filterItems.name}
                          item={filterItems}
                          options={filterItems.options?.[0]}
                          ImgSrc={filterItems.img}
                        />
                      </div>
                    ))
                  : <div>No Such Data</div>}
              </div>
            )) : null
        ) : (
          // If searching, display only filtered items (all in one row)
          <div className="row mt-4">
            {displayItems.length > 0 ? displayItems.map(item => (
              <div key={item._id || item.id} className='col-12 col-md-6 col-lg-3'>
                <Card
                  foodName={item.name}
                  item={item}
                  options={item.options?.[0]}
                  ImgSrc={item.img}
                />
              </div>
            )) : <div className="text-center fs-4 my-5">No items found for "<span className="text-danger">{search}</span>"</div>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
