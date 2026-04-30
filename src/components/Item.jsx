import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/producto/${product.id}`}>
        <button>Ver Detalle</button>
      </Link>
    </div>
  );
};

export default Item;