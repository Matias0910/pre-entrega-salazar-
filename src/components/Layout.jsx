import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Tu contexto de Firebase
import { useCart } from '../context/CartContext'; // Tu contexto del carrito
import { FaUser, FaSignOutAlt, FaTools, FaShoppingCart } from 'react-icons/fa';

const Layout = () => {
    const { user, logout } = useAuth(); // Traemos el estado del usuario y la función de salir
    const { getCartQuantity } = useCart(); // Para mostrar la cantidad en el globito
    const navigate = useNavigate(); // El timón para redirigir de página

    // Función segura para cerrar sesión y patear al usuario a la Home
    const handleLogout = async () => {
        try {
            await logout(); // 1. Borra la sesión en Firebase
            navigate('/');  // 2. 🚀 Al toque te manda a la página principal (Home)
        } catch (error) {
            window.console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div>
            {/* BARRA DE NAVEGACIÓN (Navbar) */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
                <div className="container">
                    {/* Logo de tu tienda */}
                    <Link className="navbar-brand fw-bold text-info" to="/">
                        TechStore ⚡
                    </Link>

                    {/* Botón para celulares (Responsive hamburguesa) */}
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

                    {/* Contenido del menú */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* Links del lado izquierdo */}
                        {/* Links del lado izquierdo */}
<div className="navbar-nav me-auto">
    <Link className="nav-link" to="/">Inicio</Link>
    <Link className="nav-link" to="/productos">Productos</Link>
    
    {/* 🛠️ SI HAY USUARIO LOGUEADO, SE ABRE EL MENÚ DE ADMINISTRADOR */}
    {user && (
        <>
            <Link 
                className="nav-link text-warning fw-bold d-flex align-items-center gap-1 ms-2" 
                to="/admin/productos"
                aria-label="Ir al Panel de Productos"
            >
                <FaTools size={14} /> Panel Admin
            </Link>
            
            <Link 
                className="nav-link text-success fw-bold d-flex align-items-center gap-1 ms-2" 
                to="/admin/cupones"
                aria-label="Ir al Creador de Cupones"
            >
                🎟️ Crear Cupones
            </Link>
        </>
    )}
</div>

                        {/* Links del lado derecho (Carrito, Usuario y Salir) */}
                        <div className="navbar-nav ms-auto align-items-center gap-2">
                            
                            {/* Widget del Carrito con su globito (Siempre visible) */}
                            <Link className="nav-link position-relative px-2" to="/carrito" aria-label="Ver carrito">
                                <FaShoppingCart size={20} className="text-white" />
                                {getCartQuantity && getCartQuantity() > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {getCartQuantity()}
                                    </span>
                                )}
                            </Link>

                            {/* Si hay usuario muestra su mail y el botón Salir, sino muestra Iniciar Sesión */}
                            {user ? (
                                <>
                                    <span className="navbar-text text-light d-flex align-items-center gap-1 ms-2">
                                        <FaUser size={13} className="text-info" /> {user.email}
                                    </span>
                                    <button 
                                        className="btn btn-outline-danger btn-sm rounded-pill px-3 ms-2 d-flex align-items-center gap-1" 
                                        onClick={handleLogout}
                                        aria-label="Cerrar sesión"
                                    >
                                        <FaSignOutAlt size={12} /> Salir
                                    </button>
                                </>
                            ) : (
                                <Link className="btn btn-info btn-sm rounded-pill px-3 text-dark fw-bold ms-2" to="/login">
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* CONTENEDOR PRINCIPAL: Acá React renderiza la página en la que estés metido (Home, Productos, etc.) */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;