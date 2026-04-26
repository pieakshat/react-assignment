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

  const calculateTotalAmount = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotalItems = () =>
    items.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, amount: -1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalItems = calculateTotalItems();
  const totalAmount = calculateTotalAmount();

  return (
    <div>
      <Navbar count={totalItems} />
      <div className="cart-container">
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
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">Unit Price: ${item.price.toFixed(2)}</p>
                    <p className="cart-item-total">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => handleDecrement(item)}>−</button>
                    <span className="cart-item-quantity">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                  </div>

                  <button className="btn-delete" onClick={() => handleRemove(item)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="total-cart-amount">
                <span>Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <Link to="/products" className="btn-continue continue-shopping">
                  Continue Shopping
                </Link>
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
