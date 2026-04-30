const Footer = () => {
  return (
    <footer>
      <div>
        <h3>TechStore - Tu Tienda de Tecnología</h3>
        <p>Somos líderes en venta de productos tecnológicos de alta calidad. Ofrecemos los mejores precios y servicio al cliente.</p>
        <p>© 2024 TechStore. Todos los derechos reservados.</p>
      </div>
      <div>
        <h4>Nuestro Equipo</h4>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Juan Pérez" />
            <h5>Matias Salazar</h5>
            <p>CEO y Fundador</p>
            <p>Experto en tecnología con más de 10 años en el sector.</p>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="María García" />
            <h5>Carolina Coronel</h5>
            <p>Directora de Ventas</p>
            <p>Especialista en atención al cliente y estrategias de marketing.</p>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Carlos López" />
            <h5>Carlos López</h5>
            <p>Desarrollador Web</p>
            <p>Encargado del desarrollo y mantenimiento de nuestra plataforma online.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;