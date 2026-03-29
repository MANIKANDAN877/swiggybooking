import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { queryClient } from './utils/queryClient';
import { registerServiceWorker } from './utils/registerSW';
import './App.css';

// Lazy load components for code splitting
const Home = React.lazy(() => import('./pages/Home'));
const RestaurantMenu = React.lazy(() => import('./pages/RestaurantMenu'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Orders = React.lazy(() => import('./pages/Orders'));
const About = React.lazy(() => import('./pages/About'));

// Loading component
const PageLoader: React.FC = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '50vh',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    Loading...
  </div>
);

function App() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/restaurant/:id" element={<RestaurantMenu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
