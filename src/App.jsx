import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

 // Podés renombrar el archivo luego
import Catalogo from './pages/Productos'; // Vinculamos Ventas al Catálogo 3D
import Proyectos from './pages/Servicios'; // Vinculamos Alquileres a Proyectos realizados
import Home from './pages/Home';
import NavbarApp from './components/Navbar';
import Footer from './Footer';
import DetalleProducto from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      {/* Insertamos el Navbar aquí para que sea persistente en todas las rutas */}
      <NavbarApp />
      
      <main className="min-h-[80vh]">
        <Routes>
          {/* RURAS PÚBLICAS DE GENO PRINTS */}
          <Route path="/" element={<Home />} />
     
          {/* Cambiamos los paths para que tengan sentido con impresión 3D */}
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          
          {/* BLOQUE PROTEGIDO: Gestión del taller 3D */}
   
          {/* REDIRECCIÓN GLOBAL AL HOME */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer minimalista al final de todas las páginas */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;