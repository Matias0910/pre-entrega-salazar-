import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';

const ProductDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const getProducto = async () => {
            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProducto({ id: docSnap.id, ...docSnap.data() });
                }
                setLoading(false);
            } catch (error) {
                window.console.error("Error al traer el detalle:", error);
                setLoading(false);
            }
        };
        getProducto();
    }, [id]);

    const handleAgregar = () => {
        if (!producto) return;

        // Pasamos las propiedades exactas de tu Firebase (imagen en singular, precio como Number)
        const itemParaCarrito = {
            id: producto.id,
            nombre: producto.nombre || 'Producto Tecnológico',
            precio: Number(producto.precio) || 0,
            imagen: producto.imagen || ''
        };

        addToCart(itemParaCarrito, parseInt(cantidad, 10) || 1);
        window.alert("¡Producto añadido al carrito!");
    };

    if (loading) return <div className="text-center mt-5 text-white"><h3>Cargando detalles...</h3></div>;
    if (!producto) return <div className="text-center mt-5 text-white"><h3>El producto no existe.</h3></div>;

    return (
        <div className="container py-5 text-white">
            <Link to="/productos" className="btn btn-outline-light mb-4 rounded-pill">
                <FaArrowLeft className="me-2" /> Volver al catálogo
            </Link>

            <div className="row g-5 align-items-center bg-dark p-4 rounded-3 shadow">
                <div className="col-12 col-md-6 text-center">
                    <img 
                        src={producto.imagen || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500'} 
                        alt={producto.nombre} 
                        className="img-fluid rounded shadow bg-light"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <h1 className="fw-bold mb-2">{producto.nombre}</h1>
                    <h2 className="text-success fw-bold mb-4">${(Number(producto.precio) || 0).toLocaleString()}</h2>
                    <p className="lead mb-4">{producto.descripcion || 'Sin descripción disponible.'}</p>
                    
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 mb-4">
                        <span className="fw-semibold text-white-50">Cantidad:</span>
                        <div className="d-flex align-items-center gap-2 border border-light rounded-pill px-2 py-1 bg-dark-subtle">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-light rounded-circle"
                                onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                                aria-label="Disminuir cantidad"
                            >
                                <FaMinus size={12} />
                            </button>
                            <span className="fw-bold text-white px-2" style={{ minWidth: '2rem', textAlign: 'center' }}>{cantidad}</span>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-light rounded-circle"
                                onClick={() => setCantidad(prev => Math.min(producto.stock || 10, prev + 1))}
                                aria-label="Aumentar cantidad"
                            >
                                <FaPlus size={12} />
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary btn-lg rounded-pill px-4" onClick={handleAgregar}>
                        <FaShoppingCart className="me-2" /> Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;