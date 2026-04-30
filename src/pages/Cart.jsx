import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Tu Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío. ¡Agrega algunos productos!</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0', padding: '1rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
                  <button onClick={() => { console.log('Click en botón - para producto:', item.id); decreaseQuantity(item.id); }} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Cantidad: {item.quantity}</span>
                  <button onClick={() => { console.log('Click en botón + para producto:', item.id); increaseQuantity(item.id); }} style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                </div>
                <p>Precio unitario: ${item.price}</p>
                <p>Subtotal: ${item.price * item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px' }}>Eliminar</button>
            </div>
          ))}
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
            <h2>Total: ${total}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={clearCart} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Vaciar Carrito</button>
              <button style={{ backgroundColor: '#27ae60', color: 'white', padding: '0.5rem 1rem', fontSize: '1.1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Proceder al Pago</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;