import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <h1>Paradise Nursery</h1>
      <p>
        Bring life into your home with our hand-picked collection of beautiful
        houseplants — curated for every space and skill level.
      </p>
      <button className="btn-primary" onClick={() => navigate('/products')}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
