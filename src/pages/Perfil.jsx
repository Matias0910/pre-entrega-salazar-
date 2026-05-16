import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/"); // Bonus: Redirigir al inicio
        } catch (error) {
            window.alert("Error al cerrar sesión");
        }
    };

    return (
        <div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>
            <div style={{ background: '#252525', padding: '30px', borderRadius: '15px', display: 'inline-block' }}>
                <h2 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '10px' }}>Mi Perfil</h2>
                <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
                    ¡Hola de nuevo, <span style={{ color: '#27ae60', fontWeight: 'bold' }}>{user?.email}</span>!
                </p>
                <button 
                    onClick={handleLogout}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#e74c3c', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Perfil;