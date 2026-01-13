import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoader = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Cada vez que cambia la ruta, mostramos el loader brevemente
    setIsVisible(true);
    
    // Simulamos un tiempo de carga o esperamos a que el componente cargue
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 600); // 600ms es ideal para una transición fluida

    return () => clearTimeout(timer);
  }, [location]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/30 backdrop-blur-md animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner animado con Tailwind v4 */}
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-900 font-bold text-sm tracking-widest uppercase animate-pulse">
          Corpus Inmobiliaria
        </p>
      </div>
    </div>
  );
};

export default PageLoader;