import { useEffect, useState } from 'react';
import Item from './Item';
import productosData from '../data/productos.json';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productosData);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', padding: '2rem' }}>
      {products.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ItemListContainer;