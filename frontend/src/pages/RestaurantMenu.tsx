import React, { useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LazyImage from '../components/LazyImage';
import { useCart } from '../context/CartContext';
import { API_ENDPOINTS, apiFetch } from '../api';
import './RestaurantMenu.css';

interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isVegetarian: boolean;
  inStock: boolean;
}

const RestaurantMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem, cart } = useCart();

  const { data: restaurant, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      if (!id) throw new Error('Restaurant ID is required');
      
      console.log('Fetching restaurant from:', API_ENDPOINTS.RESTAURANT_BY_ID(id));
      const data = await apiFetch(API_ENDPOINTS.RESTAURANT_BY_ID(id));
      console.log('Restaurant fetched:', data.name);
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const categories = useMemo(() => {
    if (!restaurant) return [];
    const uniqueCategories = Array.from(new Set(restaurant.menu.map((item: MenuItem) => item.category)));
    return ['All', ...uniqueCategories];
  }, [restaurant]);

  const filteredMenu = useMemo(() => {
    if (!restaurant) return [];
    if (selectedCategory === 'All') return restaurant.menu;
    return restaurant.menu.filter((item: MenuItem) => item.category === selectedCategory);
  }, [restaurant, selectedCategory]);

  const handleAddToCart = useCallback((item: MenuItem) => {
    if (!restaurant) return;
    
    addItem({
      id: `${restaurant._id}-${item.name}`,
      name: item.name,
      price: item.price,
      quantity: 1,
      isVegetarian: item.isVegetarian,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    });
  }, [restaurant, addItem]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const canAddItems = !cart.restaurantId || cart.restaurantId === restaurant?._id;

  if (isLoading) {
    return <div className="loading">Loading restaurant menu...</div>;
  }

  if (error || !restaurant) {
    return <div className="error">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-menu">
      <div className="restaurant-header">
        <div className="restaurant-image">
          <LazyImage 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className="restaurant-header-img"
          />
        </div>
        <div className="restaurant-info">
          <h1>{restaurant.name}</h1>
          <div className="restaurant-meta">
            <span className="rating">⭐ {restaurant.rating}</span>
            <span className="delivery-time">⏱️ {restaurant.deliveryTime}</span>
            <span className="cost">₹{restaurant.costForTwo} for two</span>
          </div>
          <div className="cuisine-tags">
            {restaurant.cuisine.map((c: string, index: number) => (
              <span key={index} className="cuisine-tag">{c}</span>
            ))}
          </div>
          <p className="address">📍 {restaurant.address}</p>
        </div>
      </div>

      {!canAddItems && (
        <div className="cart-warning">
          <p>⚠️ You have items from {cart.restaurantName} in your cart. Clear your cart to order from this restaurant.</p>
          <Link to="/cart" className="btn btn-primary">View Cart</Link>
        </div>
      )}

      <div className="menu-container">
        <div className="category-filters">
          {(categories as string[]).map((category: string) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-items">
          {filteredMenu.map((item: MenuItem, index: number) => (
            <MenuItemCard 
              key={index} 
              item={item} 
              onAddToCart={handleAddToCart}
              canAddItems={canAddItems}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  canAddItems: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = React.memo(({ item, onAddToCart, canAddItems }) => {
  const handleAddClick = useCallback(() => {
    onAddToCart(item);
  }, [item, onAddToCart]);

  return (
    <div className="menu-item">
      <div className="item-info">
        <div className="item-header">
          <h3>{item.name}</h3>
          {item.isVegetarian && <span className="veg-badge">🟢 Veg</span>}
        </div>
        <p className="item-description">{item.description}</p>
        <p className="item-price">₹{item.price}</p>
        {!item.inStock && <span className="out-of-stock">Out of stock</span>}
      </div>
      <div className="item-actions">
        {item.imageUrl && (
          <LazyImage 
            src={item.imageUrl} 
            alt={item.name} 
            className="item-image"
          />
        )}
        <button
          className="add-btn"
          onClick={handleAddClick}
          disabled={!item.inStock || !canAddItems}
        >
          {item.inStock && canAddItems ? 'Add +' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
});

MenuItemCard.displayName = 'MenuItemCard';

export default RestaurantMenu;
