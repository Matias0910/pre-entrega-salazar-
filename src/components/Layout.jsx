import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext'; 
import { FaUser, FaSignOutAlt, FaTools, FaShoppingCart } from 'react-icons/fa';
import Footer from './Footer';

const Layout = () => {
    const { user, logout } = useAuth(); 
    const { getCartQuantity } = useCart(); 
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        try {
            await logout(); 
            navigate('/');  
        } catch (error) {
            window.console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
                <div className="container px-3">
                    
                    <Link className="navbar-brand fw-bold text-info" to="/">
                        TechStore ⚡
                    </Link>

                    <div className="d-flex align-items-center d-lg-none ms-auto me-2">
                        <Link className="nav-link position-relative px-3" to="/carrito" style={{ zIndex: 1100 }}>
                            <FaShoppingCart size={24} className="text-white" />
                            {getCartQuantity && getCartQuantity() > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                                    {getCartQuantity()}
                                </span>
                            )}
                        </Link>
                    </div>

                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                        {/* Links del lado izquierdo */}
                        <div className="navbar-nav me-auto mt-2 mt-lg-0">
                            <Link className="nav-link" to="/">Inicio</Link>
                            <Link className="nav-link" to="/productos">Productos</Link>
                            
                            {user && (
                                <>
                                    <Link 
                                        className="nav-link text-warning fw-bold d-flex align-items-center gap-1 mt-2 mt-lg-0 ms-lg-2" 
                                        to="/admin/productos"
                                    >
                                        <FaTools size={14} /> Panel Admin
                                    </Link>
                                    <Link 
                                        className="nav-link text-success fw-bold d-flex align-items-center gap-1 mt-2 mt-lg-0 ms-lg-2" 
                                        to="/admin/cupones"
                                    >
                                        🎟️ Crear Cupones
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Links del lado derecho */}
                        <div className="navbar-nav ms-auto align-items-center gap-2 mt-3 mt-lg-0">
                            
                            <Link className="nav-link position-relative px-2 d-none d-lg-block" to="/carrito">
                                <FaShoppingCart size={20} className="text-white" />
                                {getCartQuantity && getCartQuantity() > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {getCartQuantity()}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="d-flex flex-column flex-lg-row align-items-center gap-2 w-100 w-lg-auto">
                                    <span className="navbar-text text-light d-flex align-items-center gap-1">
                                        <FaUser size={13} className="text-info" /> {user.email}
                                    </span>
                                    <button 
                                        className="btn btn-outline-danger btn-sm rounded-pill px-3 w-100 w-lg-auto" 
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt size={12} /> Salir
                                    </button>
                                </div>
                            ) : (
                                <Link className="btn btn-info btn-sm rounded-pill px-3 text-dark fw-bold w-100 w-lg-auto" to="/login">
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default Layout;