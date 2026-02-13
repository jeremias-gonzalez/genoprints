import { Link } from 'react-router-dom';
import logo from "../public/iconogverdefondoblanco.png"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 items-start">
          
          {/* COLUMNA 1: BRANDING - LOGO XL */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="inline-block transition-transform hover:scale-105">
              {/* h-32 (128px) le da una presencia visual muy fuerte */}
              <img 
                src={logo} 
                alt="GENO PRINTS Logo" 
                className="h-32 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-emerald-900/60 font-medium leading-relaxed italic max-w-[250px]">
              Transformando ideas en realidad física a través de tecnología aditiva de precisión en el corazón de Córdoba.
            </p>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div className="space-y-6 md:pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900">Catálogo</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link to="/catalogo" className="hover:text-emerald-600 transition-colors">Ver Catálogo</Link></li>
              <li><Link to="/proyectos" className="hover:text-emerald-600 transition-colors">Proyectos Realizados</Link></li>
              <li><Link to="/servicios" className="hover:text-emerald-600 transition-colors">Servicios Técnicos</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: INFORMACIÓN */}
          <div className="space-y-6 md:pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900">Empresa</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><Link to="/nosotros" className="hover:text-emerald-600 transition-colors">Sobre el Taller</Link></li>
              <li><Link to="/contacto" className="hover:text-emerald-600 transition-colors">Presupuestos</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO LOCAL */}
          <div className="space-y-6 md:pt-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900">Ubicación</h3>
            <div className="text-sm font-bold text-slate-500 space-y-2">
              <p className="text-emerald-950">Río Cuarto, Córdoba</p>
              <p className="font-medium">Argentina</p>
              <a 
                href="https://wa.me/tu-numero-de-geno-prints" 
                className="inline-block pt-2 text-emerald-600 font-black hover:underline"
              >
                Consultas por WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
            © {currentYear} GENO PRINTS Impresión 3D. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com/genoprints" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-600 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
            </a>
            <a href="#" className="text-slate-300 hover:text-emerald-600 transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest">Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;