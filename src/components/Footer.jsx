import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, hasFirebaseConfig } from '../firebase';
import teamData from '../data/equipo.json';

const Footer = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      if (!hasFirebaseConfig) {
        setTeam(teamData);
        setLoading(false);
        setError('Firebase no está configurado. Mostrando equipo local.');
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, 'equipo'));
        const teamDataFromFirebase = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (teamDataFromFirebase.length > 0) {
          setTeam(teamDataFromFirebase);
        } else {
          setTeam(teamData);
          setError('No hay datos del equipo en Firebase. Mostrando equipo local.');
        }
      } catch (fetchError) {
        setError('No se pudo cargar el equipo desde Firebase. Mostrando datos locales.');
        setTeam(teamData);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <footer>
      <div className="footer-info">
        <h3>TechStore - Tu Tienda de Tecnología</h3>
        <p>Somos líderes en venta de productos tecnológicos de alta calidad. Ofrecemos los mejores precios y servicio al cliente.</p>
        <p>© 2024 TechStore. Todos los derechos reservados.</p>
      </div>
      <div className="footer-team">
        <h4>Nuestro Equipo</h4>
        {loading ? (
          <p>Cargando equipo...</p>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            <div className="team-cards">
              {team.map((member, index) => (
                <div key={member.id || `${member.nombre}-${index}`} className="team-card">
                  <img src={member.fotoURL} alt={member.nombre} />
                  <h5>{member.nombre}</h5>
                  <p>{member.rol}</p>
                  <a href={member.linkedinURL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;