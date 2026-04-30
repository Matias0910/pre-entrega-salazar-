import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  console.log('CartWidget - Carrito actual:', cart);
  console.log('CartWidget - Total items:', totalItems);

  return (
    <Link to="/carrito" style={{ textDecoration: 'none' }}>
      <div className="cart-widget">
        🛒 {totalItems}
      </div>
    </Link>
  );
};

export default CartWidget;