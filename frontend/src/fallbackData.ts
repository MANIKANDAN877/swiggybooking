// Fallback data for when API is not available
export const FALLBACK_RESTAURANTS = [
  {
    _id: '1',
    name: 'Burger Palace',
    cuisine: ['American', 'Fast Food'],
    rating: 4.5,
    deliveryTime: '30-40 min',
    costForTwo: 400,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    address: '123 Main Street, Downtown',
    menu: [
      {
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh vegetables',
        price: 199,
        category: 'Burgers',
        isVegetarian: false,
        inStock: true
      },
      {
        name: 'Veggie Burger',
        description: 'Plant-based patty with garden vegetables',
        price: 179,
        category: 'Burgers',
        isVegetarian: true,
        inStock: true
      }
    ]
  },
  {
    _id: '2',
    name: 'Pizza Heaven',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.7,
    deliveryTime: '25-35 min',
    costForTwo: 500,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    address: '456 Oak Avenue, Westside',
    menu: [
      {
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella, and basil',
        price: 299,
        category: 'Pizza',
        isVegetarian: true,
        inStock: true
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with mozzarella cheese',
        price: 349,
        category: 'Pizza',
        isVegetarian: false,
        inStock: true
      }
    ]
  },
  {
    _id: '3',
    name: 'Biryani House',
    cuisine: ['Indian', 'Biryani'],
    rating: 4.6,
    deliveryTime: '35-45 min',
    costForTwo: 600,
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-9640c0c434b0?w=800',
    address: '789 Spice Road, Old Town',
    menu: [
      {
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice with tender chicken',
        price: 399,
        category: 'Biryani',
        isVegetarian: false,
        inStock: true
      },
      {
        name: 'Vegetable Biryani',
        description: 'Mixed vegetables with fragrant basmati rice',
        price: 349,
        category: 'Biryani',
        isVegetarian: true,
        inStock: true
      }
    ]
  },
  {
    _id: '4',
    name: 'Chinese Wok',
    cuisine: ['Chinese', 'Asian'],
    rating: 4.4,
    deliveryTime: '30-40 min',
    costForTwo: 450,
    imageUrl: 'https://images.unsplash.com/photo-1563243577-9b53b885e86f?w=800',
    address: '321 Dragon Street, Chinatown',
    menu: [
      {
        name: 'Fried Noodles',
        description: 'Stir-fried noodles with vegetables',
        price: 249,
        category: 'Noodles',
        isVegetarian: true,
        inStock: true
      },
      {
        name: 'Sweet and Sour Chicken',
        description: 'Crispy chicken with tangy sauce',
        price: 299,
        category: 'Main Course',
        isVegetarian: false,
        inStock: true
      }
    ]
  },
  {
    _id: '5',
    name: 'South Indian Express',
    cuisine: ['South Indian', 'Dosas'],
    rating: 4.8,
    deliveryTime: '25-35 min',
    costForTwo: 350,
    imageUrl: 'https://images.unsplash.com/photo-1621510182287-b217b08d8f84?w=800',
    address: '654 Coconut Lane, South End',
    menu: [
      {
        name: 'Masala Dosa',
        description: 'Crispy rice crepe with spiced potato filling',
        price: 149,
        category: 'Dosas',
        isVegetarian: true,
        inStock: true
      },
      {
        name: 'Idli Sambar',
        description: 'Steamed rice cakes with lentil soup',
        price: 129,
        category: 'Breakfast',
        isVegetarian: true,
        inStock: true
      }
    ]
  }
];
