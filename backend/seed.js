const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
require('dotenv').config();

const sampleRestaurants = [
  {
    name: "Burger Palace",
    cuisine: ["Fast Food", "American"],
    rating: 4.5,
    deliveryTime: "30-40 min",
    costForTwo: 600,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    address: "123 Main Street, Mumbai",
    menu: [
      {
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, and our special sauce",
        price: 180,
        category: "Burgers",
        isVegetarian: false,
        inStock: true
      },
      {
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables",
        price: 160,
        category: "Burgers",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "French Fries",
        description: "Crispy golden fries with salt",
        price: 120,
        category: "Sides",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Chicken Wings",
        description: "Spicy chicken wings with dipping sauce",
        price: 220,
        category: "Starters",
        isVegetarian: false,
        inStock: true
      }
    ]
  },
  {
    name: "Pizza Heaven",
    cuisine: ["Italian", "Fast Food"],
    rating: 4.3,
    deliveryTime: "35-45 min",
    costForTwo: 800,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    address: "456 Park Avenue, Delhi",
    menu: [
      {
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, basil",
        price: 280,
        category: "Pizza",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Pepperoni Pizza",
        description: "Pepperoni, mozzarella, tomato sauce",
        price: 320,
        category: "Pizza",
        isVegetarian: false,
        inStock: true
      },
      {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 140,
        category: "Sides",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce, croutons, parmesan",
        price: 180,
        category: "Salads",
        isVegetarian: true,
        inStock: true
      }
    ]
  },
  {
    name: "Biryani House",
    cuisine: ["North Indian", "Biryani"],
    rating: 4.7,
    deliveryTime: "40-50 min",
    costForTwo: 700,
    imageUrl: "https://images.unsplash.com/photo-1589302168068-9640c0c434b0?w=800",
    address: "789 Food Street, Bangalore",
    menu: [
      {
        name: "Chicken Dum Biryani",
        description: "Aromatic basmati rice with tender chicken",
        price: 280,
        category: "Biryani",
        isVegetarian: false,
        inStock: true
      },
      {
        name: "Veg Biryani",
        description: "Mixed vegetables with fragrant rice",
        price: 220,
        category: "Biryani",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Chicken Tikka",
        description: "Grilled chicken marinated in spices",
        price: 260,
        category: "Starters",
        isVegetarian: false,
        inStock: true
      },
      {
        name: "Paneer Butter Masala",
        description: "Soft cottage cheese in creamy tomato gravy",
        price: 240,
        category: "Main Course",
        isVegetarian: true,
        inStock: true
      }
    ]
  },
  {
    name: "Chinese Wok",
    cuisine: ["Chinese", "Asian"],
    rating: 4.2,
    deliveryTime: "25-35 min",
    costForTwo: 550,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    address: "321 Spice Road, Hyderabad",
    menu: [
      {
        name: "Hakka Noodles",
        description: "Stir-fried noodles with vegetables",
        price: 180,
        category: "Noodles",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Chicken Manchurian",
        description: "Spicy chicken balls in Indo-Chinese gravy",
        price: 220,
        category: "Starters",
        isVegetarian: false,
        inStock: true
      },
      {
        name: "Fried Rice",
        description: "Steamed rice stir-fried with vegetables",
        price: 160,
        category: "Rice",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Spring Rolls",
        description: "Crispy rolls with vegetable filling",
        price: 140,
        category: "Starters",
        isVegetarian: true,
        inStock: true
      }
    ]
  },
  {
    name: "South Indian Express",
    cuisine: ["South Indian"],
    rating: 4.6,
    deliveryTime: "20-30 min",
    costForTwo: 400,
    imageUrl: "https://images.unsplash.com/photo-1589302168068-9640c0c434b0?w=800",
    address: "654 Temple Street, Chennai",
    menu: [
      {
        name: "Masala Dosa",
        description: "Crispy rice crepe with potato filling",
        price: 120,
        category: "Dosa",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Idli Sambar",
        description: "Steamed rice cakes with lentil soup",
        price: 100,
        category: "Breakfast",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Medu Vada",
        description: "Crispy lentil donuts",
        price: 80,
        category: "Breakfast",
        isVegetarian: true,
        inStock: true
      },
      {
        name: "Filter Coffee",
        description: "Traditional South Indian coffee",
        price: 40,
        category: "Beverages",
        isVegetarian: true,
        inStock: true
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swiggy-clone');
    
    // Clear existing restaurants
    await Restaurant.deleteMany({});
    
    // Insert sample restaurants
    await Restaurant.insertMany(sampleRestaurants);
    
    console.log('Database seeded successfully!');
    console.log(`Added ${sampleRestaurants.length} restaurants`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
