import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';
import Item from './Item';
import productosData from '../data/productos.json';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!hasFirebaseConfig) {
        setProducts(productosData);
        setLoading(false);
        setError('Firebase no está configurado. Mostrando datos locales.');
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (fetchError) {
        setError('No se pudieron cargar los productos desde Firebase. Mostrando datos locales.');
        setProducts(productosData);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {products.map(product => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ItemListContainer;