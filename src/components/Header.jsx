import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto de usuario

const Header = () => {
  const { user } = useAuth(); // Obtenemos el usuario actual

  return (
    <header style={{ backgroundColor: '#002d5f', padding: '1rem 0' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>TechStore</h1>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/productos" style={linkStyle}>Productos</Link>
          <Link to="/carrito" style={linkStyle}>Carrito</Link>
          
          {/* Si el usuario está logueado, mostramos "Mi Perfil", si no, "Login" */}
          {user ? (
            <Link to="/perfil" style={{ ...linkStyle, color: '#27ae60', fontWeight: 'bold' }}>Mi Perfil</Link>
          ) : (
            <Link to="/login" style={linkStyle}>Login</Link>
          )}

          <Link to="/admin/cupones" style={linkStyle}>Cupones</Link>
        </div>
        
        <CartWidget />
      </nav>
    </header>
  );
};

const linkStyle = { 
  textDecoration: 'none', 
  margin: '0 1rem', 
  color: 'white',
  fontSize: '1rem'
};

export default Header;