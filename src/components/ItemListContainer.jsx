import Item from './Item'; // 👈 APUNTA DIRECTO A TU ARCHIVO SUELTO

const ItemListContainer = ({ productos }) => {
    const listaProductos = productos || [];

    return (
        <div className="container py-2">
            <div className="row">
                {listaProductos.length > 0 ? (
                    listaProductos.map(prod => (
                        <div key={prod.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <Item {...prod} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center text-warning mt-5">
                        <h4>No se encontraron productos</h4>
                        <p>Intentá con otro término o borrá el campo de búsqueda.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemListContainer;