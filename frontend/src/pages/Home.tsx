import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LazyImage from '../components/LazyImage';
import { useDebounce } from '../hooks/useDebounce';
import './Home.css';

interface Restaurant {
  _id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  costForTwo: number;
  imageUrl: string;
  address: string;
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: restaurants = [], isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/api/restaurants');
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const cuisines = useMemo(() => ['All', 'North Indian', 'South Indian', 'Chinese', 'Italian', 'Mexican', 'Biryani', 'Fast Food'], []);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (debouncedSearchTerm) {
      filtered = filtered.filter((restaurant: Restaurant) =>
        restaurant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (selectedCuisine && selectedCuisine !== 'All') {
      filtered = filtered.filter((restaurant: Restaurant) =>
        restaurant.cuisine.includes(selectedCuisine)
      );
    }

    return filtered;
  }, [restaurants, debouncedSearchTerm, selectedCuisine]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCuisineChange = useCallback((cuisine: string) => {
    setSelectedCuisine(cuisine);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="error">Error loading restaurants</div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Order Food Online</h1>
          <p>From your favorite restaurants</p>
        </div>
      </div>

      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for restaurants or dishes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="cuisine-filters">
          {cuisines.map(cuisine => (
            <button
              key={cuisine}
              className={`cuisine-btn ${selectedCuisine === cuisine ? 'active' : ''}`}
              onClick={() => handleCuisineChange(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div className="restaurants-container">
        <h2>Restaurants</h2>
        <div className="restaurants-grid">
          {filteredRestaurants.map((restaurant: Restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = React.memo(({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="restaurant-card">
      <div className="restaurant-image">
        <LazyImage 
          src={restaurant.imageUrl} 
          alt={restaurant.name}
          className="restaurant-img"
        />
      </div>
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <div className="restaurant-meta">
          <span className="rating">⭐ {restaurant.rating}</span>
          <span className="delivery-time">⏱️ {restaurant.deliveryTime}</span>
        </div>
        <div className="cuisine-tags">
          {restaurant.cuisine.slice(0, 3).map((c, index) => (
            <span key={index} className="cuisine-tag">{c}</span>
          ))}
        </div>
        <p className="cost">₹{restaurant.costForTwo} for two</p>
      </div>
    </Link>
  );
});

RestaurantCard.displayName = 'RestaurantCard';

export default Home;
