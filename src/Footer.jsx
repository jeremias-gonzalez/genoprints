import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: BRANDING */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg rotate-12 flex items-center justify-center shadow-md shadow-blue-100">
                <span className="text-white font-black text-sm -rotate-12">C</span>
              </div>
              <h2 className="text-xl font-black tracking-tighter text-slate-900">Corpus</h2>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
              Elevando el estándar inmobiliario en el sur de Córdoba con gestión transparente y moderna.
            </p>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Explorar</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link to="/ventas" className="hover:text-blue-600 transition-colors">Ventas</Link></li>
              <li><Link to="/alquileres" className="hover:text-blue-600 transition-colors">Alquileres</Link></li>
              <li><Link to="/tasaciones" className="hover:text-blue-600 transition-colors">Tasaciones</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: EMPRESA */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Empresa</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link to="/nosotros" className="hover:text-blue-600 transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-blue-600 transition-colors">Contacto</Link></li>
              <li><Link to="/login" className="hover:text-blue-600 transition-colors">Panel Staff</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO LOCAL */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Ubicación</h3>
            <div className="text-sm font-bold text-slate-500 space-y-2">
              <p className="text-slate-900">Río Cuarto, Córdoba</p>
              <p className="font-medium">Argentina</p>
              <a 
                href="https://wa.me/tu-numero" 
                className="inline-block pt-2 text-blue-600 hover:underline"
              >
                WhatsApp Business →
              </a>
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {currentYear} Corpus Gestión Inmobiliaria. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-300 hover:text-slate-900 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
            </a>
            <a href="#" className="text-slate-300 hover:text-slate-900 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;