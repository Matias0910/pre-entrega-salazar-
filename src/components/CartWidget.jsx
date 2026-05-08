import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/carrito" style={{ textDecoration: 'none' }}>
      <div className="cart-widget">
        🛒 {totalItems}
      </div>
    </Link>
  );
};

export default CartWidget;