import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import ItemListContainer from '../components/ItemListContainer';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

// Diseño responsivo y personalizado con Styled-components
const SearchContainer = styled.div`
  max-width: 600px;
  margin: 20px auto 40px auto;
  position: relative;
  padding: 0 15px;

  .search-input {
    padding-left: 45px;
    border-radius: 30px;
    height: 50px;
    border: 2px solid #1a237e;
    font-size: 1.1rem;
    &:focus {
      box-shadow: 0 0 15px rgba(26, 35, 126, 0.3);
      border-color: #4db6ac;
    }
  }

  .search-icon {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    color: #1a237e;
    font-size: 1.2rem;
  }
`;

const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
  margin-bottom: 20px;

  .page-info {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const ProductsNacionales = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    
    // 📊 ESTADOS PARA LA PAGINACIÓN
    const [currentPage, setCurrentPage] = useState(1);
    const productosPorPagina = 6; 

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productos"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductos(data);
                setLoading(false);
            } catch (error) {
                window.console.error("Error cargando productos nacionales:", error);
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
        setCurrentPage(1);
    };

    // 1. Filtrado por buscador
    const productosFiltrados = productos.filter((prod) => {
        const nombre = prod.nombre || prod.name || "";
        return nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    // 2. Lógica matemática de Paginación
    const indexOfLastProduct = currentPage * productosPorPagina;
    const indexOfFirstProduct = indexOfLastProduct - productosPorPagina;
    const productosPaginados = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const totalPages = Math.ceil(productosFiltrados.length / productosPorPagina) || 1;

    if (loading) return <div className="text-center mt-5 text-white"><h3>Cargando productos nacionales...</h3></div>;

    return (
        <div className="container mt-4">
            {/* Optimización SEO con React Helmet - SÚPER LIMPIO */}
            <Helmet>
                <html lang="es" />
                <title>TechStore | Productos Nacionales 🇦🇷🛒</title>
                <meta name="description" content="Catálogo responsivo de tecnología nacional." />
            </Helmet>

            <h2 className="text-center text-white mb-4 fw-bold">Productos Nacionales</h2>

            {/* Buscador Interactivo */}
            <SearchContainer>
                <FaSearch className="search-icon" />
                <input 
                    type="text" 
                    className="form-control search-input"
                    placeholder="Buscar producto nacional..."
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    aria-label="Buscar productos por nombre" 
                />
            </SearchContainer>

            {/* Grilla responsiva */}
            <ItemListContainer productos={productosPaginados} />

            {/* SECCIÓN DE PAGINACIÓN */}
            {productosFiltrados.length > productosPorPagina && (
                <PaginationNav aria-label="Navegación de páginas">
                    <button 
                        className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        aria-label="Ir a la página anterior"
                    >
                        <FaArrowLeft size={14} /> Anterior
                    </button>

                    <span className="text-white page-info">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button 
                        className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        aria-label="Ir a la página siguiente"
                    >
                        Siguiente <FaArrowRight size={14} />
                    </button>
                </PaginationNav>
            )}
        </div>
    );
};

export default ProductsNacionales;