import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
    const prod = props || {};
    
    const id = prod.id || '';
    const nombre = prod.nombre || prod.name || 'Producto Tecnológico';
    const precio = Number(prod.precio) || 0;
    const stock = prod.stock || 0;
    const imagenUrl = prod.imagen || 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500';

    return (
        <div className="card h-100 shadow-sm border-0" style={{ backgroundColor: '#ffffff', color: '#333333' }}>
            <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
                <img 
                    src={imagenUrl} 
                    className="card-img-top w-100 h-100" 
                    alt={nombre}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 className="card-title fw-bold text-dark mb-2">{nombre}</h5>
                    <p className="card-text fs-4 fw-bold text-primary mb-1">${precio.toLocaleString()}</p>
                    <p className="text-muted small">Disponibles: {stock}</p>
                </div>
                
                <Link to={`/item/${id}`} className="btn btn-outline-primary w-100 rounded-pill mt-3">
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
};

export default Item;