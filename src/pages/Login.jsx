import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            window.alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            navigate("/perfil"); 
        } catch (error) {
            window.console.error("Error de Firebase:", error.code, error.message);
            
            if (error.code === "auth/invalid-credential") {
                window.alert("Email o contraseña incorrectos.");
            } else if (error.code === "auth/too-many-requests") {
                window.alert("Demasiados intentos. Reintenta más tarde.");
            } else {
                window.alert("Hubo un error al intentar ingresar.");
            }
        }
    };

    return (
        <div style={{ 
            padding: '50px', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh' 
        }}>
            <form onSubmit={handleLogin} style={{ 
                background: '#252525', 
                padding: '40px', 
                borderRadius: '15px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '350px' 
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#27ae60' }}>Iniciar Sesión</h2>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#1a1a1a', color: 'white' }}
                    />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="******" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', background: '#1a1a1a', color: 'white' }}
                    />
                </div>

                <button type="submit" style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: '#27ae60', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}>
                    INGRESAR
                </button>
            </form>
        </div>
    );
};

export default Login;