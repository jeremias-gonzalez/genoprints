import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@heroui/react";
import NavbarApp from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-slate-50">
      
      {/* --- NAVBAR --- */}
     

      {/* --- HERO SECTION --- */}
      {/* Imagen: Cambiamos la casa por un primer plano de impresión 3D de alta calidad */}
      <section 
        className="relative h-[85vh] flex items-center justify-center bg-cover bg-center rounded-2xl mx-5 my-5 overflow-hidden shadow-2xl"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1705436324900-349f28020623?q=80&w=2070&auto=format&fit=crop")' }}
      >
        {/* Overlay en verde oscuro profundo para dar ese toque "Tech" */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>

        {/* Contenido Principal */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mt-[-5vh]">
          {/* Texto en color verde esmeralda brillante para resaltar sobre el oscuro */}
          <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg text-white">
            El futuro de tus ideas<br />
            <span className="text-emerald-400 inline-block">esta acá</span>
          </h2>
          
          <p className="text-lg md:text-xl text-emerald-50 mb-10 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
           Materializamos lo que queres al mejor precio.
          </p>
          
          <Link to="/catalogo">
            <Button 
              size="lg"
              className="font-bold rounded-full px-12 py-8 text-xl bg-emerald-600 hover:bg-emerald-500 hover:scale-105 transition-all shadow-2xl shadow-emerald-900/50 text-white"
            >
              Explorar Catálogo 3D
            </Button>
          </Link>
        </div>
      </section>

      {/* --- SECCIÓN DE DESTACADOS --- */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
        {/* Texto Verde Oscuro solicitado */}
        <h3 className="text-sm font-black text-emerald-900 uppercase tracking-[0.3em] mb-3">
          Tecnología Aditiva
        </h3>
        <h2 className="text-4xl font-black text-emerald-950 mb-12 tracking-tighter">
          Modelos Destacados
        </h2>
        
        {/* Grilla de productos (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {[1, 2, 3].map(i => (
             <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-slate-200 rounded-[2.5rem] overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-500">
                  {/* Placeholder de imagen de producto */}
                  <div className="absolute inset-0 bg-emerald-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-full h-full bg-slate-200 animate-pulse" />
                </div>
                <div className="mt-6 space-y-1">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">PLA Premium</p>
                  <h4 className="text-xl font-black text-emerald-950">Producto en Stock</h4>
                </div>
             </div>
           ))}
        </div>

        <p className="mt-16 text-emerald-900/40 text-xs font-bold uppercase tracking-widest">
          Desarrollado en Río Cuarto, Córdoba.
        </p>
      </section>

    </div>
  );
};

export default Home;