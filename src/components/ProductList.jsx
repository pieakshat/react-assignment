import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../store/CartSlice';

const categories = [
  {
    name: 'Succulents',
    plants: [
      { name: 'Aloe Vera', price: 12.99, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop', description: 'Soothing gel, easy care' },
      { name: 'Echeveria', price: 8.99, image: 'https://images.unsplash.com/photo-1531499010575-df02a9e6c36f?w=400&auto=format&fit=crop', description: 'Rosette-shaped beauty' },
      { name: 'Jade Plant', price: 14.99, image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&auto=format&fit=crop', description: 'Symbol of good luck' },
      { name: 'Haworthia', price: 9.99, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c10616?w=400&auto=format&fit=crop', description: 'Striped, shade tolerant' },
      { name: 'Sedum', price: 7.99, image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop', description: 'Drought-resistant groundcover' },
      { name: 'Crassula', price: 10.99, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&auto=format&fit=crop', description: 'Stacked, architectural form' },
    ],
  },
  {
    name: 'Tropical Plants',
    plants: [
      { name: 'Monstera', price: 24.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop', description: 'Bold split-leaf statement piece' },
      { name: 'Peace Lily', price: 16.99, image: 'https://images.unsplash.com/photo-1620127807580-990072a53588?w=400&auto=format&fit=crop', description: 'Air-purifying white blooms' },
      { name: 'Bird of Paradise', price: 34.99, image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop', description: 'Dramatic tropical foliage' },
      { name: 'Pothos', price: 11.99, image: 'https://images.unsplash.com/photo-1585854467604-cf2080cc5834?w=400&auto=format&fit=crop', description: 'Trailing, nearly indestructible' },
      { name: 'Snake Plant', price: 19.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8de5?w=400&auto=format&fit=crop', description: 'Upright, low-light champion' },
      { name: 'ZZ Plant', price: 21.99, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&auto=format&fit=crop', description: 'Glossy, extremely drought tolerant' },
    ],
  },
  {
    name: 'Flowering Plants',
    plants: [
      { name: 'African Violet', price: 13.99, image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&auto=format&fit=crop', description: 'Compact, vibrant blooms' },
      { name: 'Orchid', price: 22.99, image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc8a?w=400&auto=format&fit=crop', description: 'Elegant, long-lasting flowers' },
      { name: 'Bromeliad', price: 18.99, image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&auto=format&fit=crop', description: 'Exotic tropical color' },
      { name: 'Anthurium', price: 26.99, image: 'https://images.unsplash.com/photo-1620127807580-990072a53588?w=400&auto=format&fit=crop', description: 'Waxy heart-shaped spathes' },
      { name: 'Begonia', price: 12.99, image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&auto=format&fit=crop', description: 'Rich colors, compact habit' },
      { name: 'Kalanchoe', price: 10.99, image: 'https://images.unsplash.com/photo-1531499010575-df02a9e6c36f?w=400&auto=format&fit=crop', description: 'Bright clusters, easy bloomer' },
    ],
  },
];

function Navbar() {
  const count = useSelector(state => state.cart.items.reduce((s, i) => s + i.quantity, 0));
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Paradise Nursery</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Plants</Link></li>
        <li>
          <Link to="/cart" className="cart-link">
            🛒 Cart
            {count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const addedNames = new Set(cartItems.map(i => i.name));

  return (
    <div className="product-page">
      <Navbar />
      {categories.map(cat => (
        <div key={cat.name} className="product-category">
          <h2>{cat.name}</h2>
          <div className="product-grid">
            {cat.plants.map(plant => (
              <div key={plant.name} className="product-card">
                <img src={plant.image} alt={plant.name} />
                <div className="product-card-body">
                  <h3>{plant.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#777' }}>{plant.description}</p>
                  <span className="price">${plant.price.toFixed(2)}</span>
                  <button
                    className="btn-add"
                    disabled={addedNames.has(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {addedNames.has(plant.name) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
