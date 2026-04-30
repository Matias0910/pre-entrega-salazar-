import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <h1 style={{ margin: 0, color: 'white' }}>TechStore</h1>
        </div>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', margin: '0 1rem', padding: '0.5rem 1rem', borderRadius: '4px' }}>Inicio</Link>
          <Link to="/productos" style={{ color: 'white', textDecoration: 'none', margin: '0 1rem', padding: '0.5rem 1rem', borderRadius: '4px' }}>Productos</Link>
          <Link to="/carrito" style={{ color: 'white', textDecoration: 'none', margin: '0 1rem', padding: '0.5rem 1rem', borderRadius: '4px' }}>Carrito</Link>
        </div>
        <CartWidget />
      </nav>
    </header>
  );
};

export default Header;