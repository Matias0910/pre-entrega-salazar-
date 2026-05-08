import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p>Categoría: {product.categoria}</p>
      <p>Precio: ${product.precio}</p>
      <p>Stock: {product.stock}</p>
      <Link to={`/producto/${product.id}`}>
        <button>Ver Detalle</button>
      </Link>
    </div>
  );
};

export default Item;