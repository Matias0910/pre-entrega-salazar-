import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// IMPORTS EXACTOS DE TU CARPETA PAGES
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import GestionProductos from './pages/GestionProductos';

// IMPORT DE CUPONES DESDE COMPONENTS
import GestionCupones from './components/GestionCupones'; 

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Al entrar al sitio carga la página Home (el Inicio) */}
                <Route index element={<Home />} /> 
                
                {/* El resto de las secciones linkeadas a tu Header */}
                <Route path="/productos" element={<Products />} />
                <Route path="/item/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/admin/cupones" element={<GestionCupones />} />
                <Route path="/admin/productos" element={<GestionProductos />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;