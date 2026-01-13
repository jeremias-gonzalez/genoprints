import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './lib/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './admin/AdminDashboard';
import CargarInmueble from './admin/CargarInmueble';
import EditarInmueble from './admin/EditarInmueble';
import Ventas from './pages/Ventas';
import Alquileres from './pages/Alquileres';
import Home from './pages/Home';
import NavbarApp from './components/Navbar';
import Footer from './Footer';
import DetalleInmueble from './pages/DetalleInmueble';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* RUTA PÚBLICA */}
         <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/alquileres" element={<Alquileres />} />
        <Route path="/detalle/:id" element={<DetalleInmueble />} />
        {/* BLOQUE PROTEGIDO: Todo lo que esté acá adentro requiere Login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/nuevo" element={<CargarInmueble />} />
          <Route path="/admin/editar/:id" element={<EditarInmueble />} />
        </Route>

        {/* REDIRECCIÓN GLOBAL */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;