import { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!hasFirebaseConfig) {
      setError('Firebase no está configurado. No se pueden cargar los cupones.');
      setLoading(false);
      return;
    }

    const cuponesQuery = query(collection(db, 'cupones'), orderBy('codigo', 'asc'));
    const unsubscribe = onSnapshot(
      cuponesQuery,
      (snapshot) => {
        const cuponesData = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));
        setCupones(cuponesData);
        setLoading(false);
      },
      (snapshotError) => {
        setError('Error cargando cupones: ' + snapshotError.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const trimmedCode = codigo.trim();
    const percent = Number(descuento);

    if (!trimmedCode) {
      setError('El código del cupón es obligatorio.');
      return;
    }

    if (!descuento || Number.isNaN(percent) || percent <= 0 || percent > 100) {
      setError('El descuento debe ser un número entre 1 y 100.');
      return;
    }

    try {
      await addDoc(collection(db, 'cupones'), {
        codigo: trimmedCode,
        descuento: percent,
      });
      setCodigo('');
      setDescuento('');
      setMessage('Cupón creado correctamente.');
    } catch (submitError) {
      setError('No se pudo crear el cupón: ' + submitError.message);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    setMessage('');

    try {
      await deleteDoc(doc(db, 'cupones', id));
      setMessage('Cupón eliminado correctamente.');
    } catch (deleteError) {
      setError('No se pudo eliminar el cupón: ' + deleteError.message);
    }
  };

  return (
    <div className="cupones-admin">
      <h1>Gestión de Cupones</h1>
      <div className="cupones-panel">
        <section className="cupones-form-section">
          <h2>Crear un nuevo cupón</h2>
          <form className="cupones-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <label>
              Código del cupón
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="EJEMPLO10"
              />
            </label>
            <label>
              Descuento (%)
              <input
                type="number"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                placeholder="10"
                min="1"
                max="100"
              />
            </label>
            <button type="submit">Agregar cupón</button>
          </form>
        </section>

        <section className="cupones-list-section">
          <h2>Cupones disponibles</h2>
          {loading ? (
            <p>Cargando cupones...</p>
          ) : (
            <div className="cupones-list">
              {cupones.length === 0 ? (
                <p>No hay cupones registrados.</p>
              ) : (
                cupones.map((cup) => (
                  <div key={cup.id} className="cupon-card">
                    <div>
                      <strong>{cup.codigo}</strong>
                      <p>{cup.descuento}% de descuento</p>
                    </div>
                    <button onClick={() => handleDelete(cup.id)}>Eliminar</button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GestionCupones;
