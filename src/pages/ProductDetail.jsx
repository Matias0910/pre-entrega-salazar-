import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
import { db, hasFirebaseConfig } from '../firebase';
import productosData from '../data/productos.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!hasFirebaseConfig) {
        const localProduct = productosData.find(p => p.id === parseInt(id, 10));
        setProduct(localProduct);
        setLoading(false);
        if (!localProduct) {
          setError('Producto no encontrado en datos locales.');
        }
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const foundProduct = productsData.find(
          p => p.id === id || p.id === parseInt(id, 10) || p.id === id.toString()
        );
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Producto no encontrado.');
        }
      } catch (fetchError) {
        const localProduct = productosData.find(p => p.id === parseInt(id, 10));
        setProduct(localProduct);
        setError('No se pudo cargar el producto desde Firebase. Mostrando datos locales.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setMessage(`¡${product.nombre} agregado al carrito!`);
  };

  if (loading) return <div>Cargando...</div>;
  if (!product) return <div>{error || 'Producto no encontrado.'}</div>;

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <img src={product.imagen} alt={product.nombre} style={{ width: '400px', maxWidth: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h1>{product.nombre}</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', margin: '1rem 0' }}>{product.descripcion}</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>${product.precio}</p>
        <p style={{ margin: '0.5rem 0' }}>Stock disponible: {product.stock}</p>
        <button onClick={handleAddToCart} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Agregar al Carrito</button>
        {message && <p style={{ color: '#27ae60', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>{message}</p>}
        {error && <p style={{ color: '#e74c3c', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;