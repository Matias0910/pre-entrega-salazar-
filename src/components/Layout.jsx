import { Outlet } from 'react-router-dom';
import Header from './Header'; // O como se llame tu componente de arriba
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      
      {/* ⬇️ ESTO ES LO QUE TE FALTA ⬇️ */}
      <main className="container my-4" style={{ minHeight: '80vh' }}>
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;