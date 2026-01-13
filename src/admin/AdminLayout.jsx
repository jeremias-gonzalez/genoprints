import { Outlet } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* El loader global de rutas */}
      <PageLoader />
      
      {/* Aquí se renderizarán las páginas (Dashboard, Nuevo, Editar) */}
      <main className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;