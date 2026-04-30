import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import productosData from '../data/productos.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const prod = productosData.find(p => p.id === parseInt(id));
    setProduct(prod);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setMessage(`¡${product.name} agregado al carrito!`);
    setTimeout(() => setMessage(''), 3000); // eslint-disable-line no-undef
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center' }}>
      <img src={product.image} alt={product.name} style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      <div>
        <h1>{product.name}</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', margin: '1rem 0' }}>{product.description}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>${product.price}</p>
        <button onClick={handleAddToCart} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Agregar al Carrito</button>
        {message && <p style={{ color: '#27ae60', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>{message}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;