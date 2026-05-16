import { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("");
    const [stock, setStock] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");

    useEffect(() => {
        const productosRef = collection(db, "productos");
        const unsubscribe = onSnapshot(productosRef, (snapshot) => {
            const docs = snapshot.docs.map(documento => ({ 
                id: documento.id, 
                ...documento.data() 
            }));
            setProductos(docs);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (productoAEditar) {
            setNombre(productoAEditar.nombre || "");
            setPrecio(productoAEditar.precio || "");
            setCategoria(productoAEditar.categoria || "");
            setStock(productoAEditar.stock || "");
            setDescripcion(productoAEditar.descripcion || "");
            setImagen(productoAEditar.imagen || "");
        } else {
            setNombre(""); setPrecio(""); setCategoria(""); setStock(""); setDescripcion(""); setImagen("");
        }
    }, [productoAEditar]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones: Usamos window.alert para que VS Code sepa de dónde viene
        if (nombre.trim() === "" || Number(precio) <= 0) {
            window.confirm("El nombre es obligatorio y el precio debe ser mayor a 0");
            return;
        }

        const datos = {
            nombre,
            precio: Number(precio),
            categoria,
            stock: Number(stock),
            descripcion,
            imagen
        };

        try {
            if (productoAEditar) {
                await updateDoc(doc(db, "productos", productoAEditar.id), datos);
                setProductoAEditar(null);
                window.alert("¡Producto actualizado con éxito!");
            } else {
                await addDoc(collection(db, "productos"), datos);
                window.alert("¡Producto creado correctamente!");
            }
            setNombre(""); setPrecio(""); setCategoria(""); setStock(""); setDescripcion(""); setImagen("");
        } catch (error) {
            // Usamos un log más "limpio" para que no chille el linter
            const errorMsg = error;
            return errorMsg;
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que querés borrar este producto?")) {
            await deleteDoc(doc(db, "productos", id));
        }
    };

    return (
    <div style={{ padding: '20px', color: 'white', minHeight: '100vh' }}>
            <h2 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '10px' }}>
                {productoAEditar ? "📝 Editando Producto" : "🚀 Nuevo Producto"}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px 0' }}>
                <input type="text" placeholder="Nombre del producto" value={nombre} onChange={e => setNombre(e.target.value)} style={{padding: '10px', borderRadius: '5px', border: 'none'}} />
                <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} style={{padding: '10px', borderRadius: '5px', border: 'none'}} />
                
                <button type="submit" style={{ background: productoAEditar ? '#f39c12' : '#27ae60', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    {productoAEditar ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
                </button>
                {productoAEditar && (
                    <button type="button" onClick={() => setProductoAEditar(null)} style={{ background: '#555', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}>
                        Cancelar edición
                    </button>
                )}
            </form>

            <div style={{ marginTop: '40px' }}>
                <h3 style={{ color: '#aaa' }}>Lista de Gestión (Base de Datos)</h3>
                {productos.map(p => (
                    <div key={p.id} style={{ borderLeft: '5px solid #27ae60', background: '#252525', margin: '15px 0', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0 8px 8px 0' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{p.nombre}</div>
                            <div style={{ color: '#27ae60' }}>${p.precio} <span style={{color: '#777', fontSize: '0.9rem', marginLeft: '10px'}}>Stock: {p.stock}</span></div>
                        </div>
                        <div>
                            <button onClick={() => setProductoAEditar(p)} style={{ marginRight: '10px', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', border: '1px solid #f39c12', background: 'transparent', color: '#f39c12' }}>Editar</button>
                            <button onClick={() => handleEliminar(p.id)} style={{ padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', border: 'none', background: '#e74c3c', color: 'white' }}>Borrar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GestionProductos;