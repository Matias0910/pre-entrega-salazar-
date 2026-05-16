import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import ItemListContainer from '../components/ItemListContainer';
import { FaSearch } from 'react-icons/fa';

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Apunta a tu colección real de Firestore "productos"
                const querySnapshot = await getDocs(collection(db, "productos"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProductos(data);
                setLoading(false);
            } catch (error) {
                window.console.error("Error cargando productos:", error);
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    // Filtro interactivo de búsqueda
    const productosFiltrados = productos.filter((prod) => {
        const nombre = prod.name || prod.nombre || "";
        return nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    if (loading) return <div className="text-center mt-5 text-white"><h3>Cargando productos...</h3></div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center text-white mb-4">Nuestro Catálogo</h2>

            {/* Único buscador que queda en pie y funciona */}
            <div className="mx-auto mb-5" style={{ maxWidth: '600px', position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: '15px', top: '18px', color: '#1a237e', zIndex: 10 }} />
                <input 
                    type="text" 
                    className="form-control ps-5 rounded-pill" 
                    style={{ height: '50px', border: '2px solid #1a237e', fontSize: '1.1rem' }}
                    placeholder="Escribí el nombre del producto..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {/* Mandamos la lista filtrada al contenedor */}
            <ItemListContainer productos={productosFiltrados} />
        </div>
    );
};

export default Products;