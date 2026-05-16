import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

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
                    
                    <div className="d-flex align-items-center gap-3 mb-4" style={{ maxWidth: '200px' }}>
                        <label htmlFor="cantidad" className="form-label mb-0">Cantidad:</label>
                        <input 
                            type="number" 
                            id="cantidad" 
                            className="form-control text-center" 
                            min="1" 
                            max={producto.stock || 10}
                            value={cantidad} 
                            onChange={(e) => {
                                const valorInput = parseInt(e.target.value, 10);
                                setCantidad(isNaN(valorInput) || valorInput < 1 ? 1 : valorInput);
                            }}
                        />
                    </div>

                    <button className="btn btn-primary btn-lg rounded-pill px-4" onClick={handleAgregar}>
                        <FaShoppingCart className="me-2" /> Comprar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;