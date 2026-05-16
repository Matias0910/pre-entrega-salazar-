import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // O el icono que uses

const CartWidget = () => {
    // Traemos la función contadora desde el contexto blindado
    const { getCartQuantity } = useCart();
    
    // Forzamos a que sea un número entero real
    const cantidadTotal = parseInt(getCartQuantity(), 10) || 0;

    return (
        <Link to="/carrito" className="d-flex align-items-center text-decoration-none position-relative" style={{ color: '#ffffff' }}>
            {/* El dibujito del carrito */}
            <FaShoppingCart size={24} className="me-1" />
            
            {/* El globito o número: Solo se muestra si hay más de 0 productos */}
            {cantidadTotal > 0 && (
                <span 
                    className="badge rounded-circle bg-danger position-absolute d-flex align-items-center justify-content-center"
                    style={{
                        top: '-8px',
                        right: '-10px',
                        width: '20px',
                        height: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}
                >
                    {cantidadTotal}
                </span>
            )}
        </Link>
    );
};

export default CartWidget;