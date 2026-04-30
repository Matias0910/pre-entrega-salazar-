const Home = () => {
  return (
    <div>
      <h1>Bienvenido a TechStore</h1>
      <p>Tu tienda online de tecnología de confianza. Encuentra los mejores productos al mejor precio.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h3>🚚 Envios Gratis</h3>
          <p>En compras superiores a $1500</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>🔒 Compra Segura</h3>
          <p>Pago seguro con encriptación SSL</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>📞 Soporte 24/7</h3>
          <p>Atención al cliente las 24 horas</p>
        </div>
      </div>
    </div>
  );
};

export default Home;