import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../store/CartSlice';

function Navbar({ count }) {
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

function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);
  const totalCost = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div>
      <Navbar count={totalCount} />
      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn-continue" style={{ display: 'inline-block', marginTop: 20 }}>
              Browse Plants
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.name} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span className="unit-price">Unit price: ${item.price.toFixed(2)}</span>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => dispatch(updateQuantity({ name: item.name, amount: -1 }))}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch(updateQuantity({ name: item.name, amount: 1 }))}>+</button>
                  </div>
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="btn-delete" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="cart-total-row">
                <span>Total ({totalCount} {totalCount === 1 ? 'item' : 'items'})</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <Link to="/products" className="btn-continue">Continue Shopping</Link>
                <button
                  className="btn-checkout"
                  onClick={() => alert('Coming Soon! Checkout is not yet available.')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
