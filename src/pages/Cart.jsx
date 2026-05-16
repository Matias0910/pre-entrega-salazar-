import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTicketAlt } from 'react-icons/fa';

const Cart = () => {
    const { cart, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
    
    // ESTADOS PARA EL CUPÓN
    const [codigoCupon, setCodigoCupon] = useState("");
    const [descuento, setDescuento] = useState(0); // Guarda el valor a restar
    const [cuponAplicado, setCuponAplicado] = useState(""); // Guarda el nombre del cupón activo
    const [errorCupon, setErrorCupon] = useState("");

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center text-white">
                <FaShoppingBag size={60} className="text-warning mb-3" />
                <h2 className="fw-bold">Tu carrito está vacío</h2>
                <p className="text-muted">¡Explorá nuestro catálogo para sumar productos!</p>
                <Link to="/productos" className="btn btn-primary rounded-pill px-4 mt-3">
                    Ir al Catálogo
                </Link>
            </div>
        );
    }

    const subtotalGeneral = Number(getCartTotal()) || 0;

    // LÓGICA PARA VALIDAR EL CUPÓN
    const handleAplicarCupon = (e) => {
        e.preventDefault();
        setErrorCupon("");

        const codigoLimpio = codigoCupon.trim().toUpperCase();

       // 🎫 ACÁ ES DONDE JUGÁS VOS CON LAS PALABRAS
if (codigoLimpio === "TECHSTORE20") { // <--- Cambiás la palabra acá
    const ahorro = subtotalGeneral * 0.20; // 20% de descuento
    setDescuento(ahorro);
    setCuponAplicado("TECHSTORE20 (20% OFF)");

} else if (codigoLimpio === "MATIAS") { // <--- Cambiás la otra acá
    const ahorro = 3000; // $3000 fijos de regalo
    setDescuento(ahorro > subtotalGeneral ? subtotalGeneral : ahorro);
    setCuponAplicado("CUPÓN MATIAS ($3.000 Fijo)");

} else if (codigoLimpio === "PROFE") { // <--- ¡Y podés meter todos los que quieras sumando otra condición!
    const ahorro = subtotalGeneral * 0.50; // 50% de descuento para el corrector jajaja
    setDescuento(ahorro);
    setCuponAplicado("CUPÓN PROFE (50% OFF)");
}
    };

    // Calcular el total final restando el descuento
    const totalConDescuento = subtotalGeneral - descuento;

    return (
        <div className="container py-5 text-white" style={{ minHeight: '80vh' }}>
            <h1 className="text-center fw-bold mb-5">Tu Carrito de Compras</h1>

            <div className="row g-4">
                {/* LISTADO DE ITEMS */}
                <div className="col-12 col-lg-8">
                    {cart.map(prod => {
                        const precioUnitario = Number(prod.precio) || 0;
                        const cantidadItem = Number(prod.cantidad, 10) || 0;
                        const subtotalItem = precioUnitario * cantidadItem;
                        const fotoProducto = prod.imagen || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500';

                        return (
                            <div key={prod.id} className="card mb-3 border-0 shadow" style={{ backgroundColor: '#1a237e', color: '#ffffff' }}>
                                <div className="card-body p-4">
                                    <div className="row align-items-center g-3">
                                        <div className="col-4 col-sm-3 col-md-2 text-center">
                                            <img src={fotoProducto} alt={prod.nombre} className="img-fluid rounded shadow-sm bg-light" style={{ maxHeight: '90px', width: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="col-8 col-sm-4 col-md-4">
                                            <h5 className="fw-bold mb-1 text-truncate">{prod.nombre}</h5>
                                            <p className="mb-0 text-white-50 small">Precio: ${precioUnitario.toLocaleString()}</p>
                                        </div>
                                        <div className="col-6 col-sm-3 col-md-3 d-flex align-items-center justify-content-center">
                                            <button className="btn btn-sm btn-danger rounded-circle p-0" style={{ width: '32px', height: '32px' }} onClick={() => updateQuantity(prod.id, cantidadItem - 1)}>-</button>
                                            <span className="mx-3 fw-bold fs-5">{cantidadItem}</span>
                                            <button className="btn btn-sm btn-success rounded-circle p-0" style={{ width: '32px', height: '32px' }} onClick={() => updateQuantity(prod.id, cantidadItem + 1)}>+</button>
                                        </div>
                                        <div className="col-6 col-sm-2 col-md-3 text-end">
                                            <span className="fw-bold text-success fs-5">${subtotalItem.toLocaleString()}</span>
                                            <button className="btn btn-link text-danger p-0 ms-2 text-decoration-none d-block mt-1 w-100" onClick={() => removeItem(prod.id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* RESUMEN TOTAL DE COMPRA CON SECCIÓN DE CUPONES */}
                <div className="col-12 col-lg-4">
                    <div className="card border-0 shadow p-4 text-dark mb-4" style={{ backgroundColor: '#ffffff', borderRadius: '15px' }}>
                        <h4 className="fw-bold text-center border-bottom pb-3 mb-3">Resumen de Compra</h4>
                        
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Subtotal:</span>
                            <span className="fw-bold">${subtotalGeneral.toLocaleString()}</span>
                        </div>

                        {/* Muestra el descuento aplicado si existe */}
                        {descuento > 0 && (
                            <div className="d-flex justify-content-between mb-2 text-success fw-semibold">
                                <span>Descuento ({cuponAplicado}):</span>
                                <span>-${descuento.toLocaleString()}</span>
                            </div>
                        )}

                        <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
                            <span className="fs-5 fw-semibold text-muted">Total Final:</span>
                            <span className="fs-3 fw-bold text-primary">${totalConDescuento.toLocaleString()}</span>
                        </div>
                        
                        <div className="d-flex flex-column gap-2">
                            <button 
                                className="btn btn-success rounded-pill py-2 fw-bold text-uppercase"
                                onClick={() => {
                                    window.alert(`¡Pedido confirmado por $${totalConDescuento.toLocaleString()}! Compra finalizada.`);
                                    clearCart();
                                }}
                            >
                                Finalizar Compra
                            </button>
                            <button className="btn btn-outline-danger rounded-pill py-2 btn-sm mt-2" onClick={clearCart}>
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>

                    {/* TARJETA PARA INGRESAR EL CUPÓN */}
                    <div className="card border-0 shadow p-4 text-dark" style={{ backgroundColor: '#ffffff', borderRadius: '15px' }}>
                        <h5 className="fw-bold mb-3"><FaTicketAlt className="text-primary me-2" /> ¿Tenés un cupón?</h5>
                        <form onSubmit={handleAplicarCupon} className="d-flex gap-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Ej: DESCUENTO10 o BIENVENIDO" 
                                value={codigoCupon}
                                onChange={(e) => setCodigoCupon(e.target.value)}
                                disabled={descuento > 0} // Desactiva el input si ya aplicó uno
                            />
                            <button type="submit" className="btn btn-primary" disabled={descuento > 0}>
                                Aplicar
                            </button>
                        </form>
                        
                        {errorCupon && <p className="text-danger small mt-2 mb-0">{errorCupon}</p>}
                        {descuento > 0 && <p className="text-success small mt-2 mb-0">¡Cupón aplicado con éxito!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;