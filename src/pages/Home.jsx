import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            
            {/* SECCIÓN HERO */}
            <section style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '60px 10%',
                backgroundColor: '#003d82', // El azul de tu marca
                color: 'white',
                minHeight: '500px',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: '1', minWidth: '300px', paddingRight: '20px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
                        TU HOGAR, TU <br /> TECNOLOGÍA.
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: '0.9' }}>
                        Encontrá los dispositivos que definen tu vida. <br />
                        Lo mejor en tecnología, al mejor precio.
                    </p>
                    <button 
                        onClick={() => navigate('/productos')}
                        style={{
                            padding: '15px 30px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            backgroundColor: 'white',
                            color: '#003d82',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                        }}
                    >
                        EXPLORAR PRODUCTOS
                    </button>
                </div>

                <div style={{ flex: '1', minWidth: '300px', textAlign: 'right' }}>
                    {/* Imagen representativa de tecnología moderna */}
                    <img 
                        src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800" 
                        alt="Tecnología Hogar" 
                        style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                    />
                </div>
            </section>

            {/* SECCIÓN BENEFICIOS (Tarjetas Blancas) */}
            <section style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                padding: '50px 10%',
                marginTop: '-50px', // Efecto de solapamiento
                flexWrap: 'wrap'
            }}>
                {/* Tarjeta 1 */}
                <div style={cardStyle}>
                    <span style={{ fontSize: '2.5rem' }}>🚚</span>
                    <h3 style={{ margin: '10px 0', color: '#333' }}>ENVÍOS GRATIS</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>En compras superiores a $150000</p>
                </div>

                {/* Tarjeta 2 */}
                <div style={cardStyle}>
                    <span style={{ fontSize: '2.5rem' }}>🛡️</span>
                    <h3 style={{ margin: '10px 0', color: '#333' }}>COMPRA SEGURA</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Pago protegido con encriptación SSL</p>
                </div>

                {/* Tarjeta 3 */}
                <div style={cardStyle}>
                    <span style={{ fontSize: '2.5rem' }}>📞</span>
                    <h3 style={{ margin: '10px 0', color: '#333' }}>SOPORTE 24/7</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Atención profesional las 24 horas</p>
                </div>
            </section>
        </div>
    );
};

// Estilo reutilizable para las tarjetas
const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    width: '280px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
};

export default Home;