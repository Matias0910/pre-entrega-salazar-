import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // Esperamos a que Firebase nos diga quién es el usuario

    if (!user) {
        // Si no hay usuario, lo mandamos al home o al login
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;