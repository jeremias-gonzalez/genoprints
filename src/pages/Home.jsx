import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@heroui/react";
import NavbarApp from '../components/Navbar';
const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-slate-50">
      
      {/* --- NAVBAR --- */}
    <NavbarApp/>

      {/* --- HERO SECTION --- */}
      {/* Reemplaza la URL de la imagen por una foto real e impactante de una propiedad en Río Cuarto */}
      <section 
        className="relative h-[85vh] flex items-center justify-center bg-cover bg-center rounded-2xl mx-5 my-5"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80")' }}
      >
        {/* Overlay oscuro para mejorar la lectura del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20"></div>

        {/* Contenido Principal */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mt-[-5vh]">
          <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg">
            Encuentra tu <span className="text-blue-400 inline-block">lugar</span> <br />en Río Cuarto.
          </h2>
          <p className="text-lg md:text-xl text-slate-200 mb-10 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Descubre una selección exclusiva de propiedades en venta y alquiler. Tu próximo hogar te está esperando.
          </p>
          
          <Link to="/propiedades">
            <Button 
              size="lg"
              color="primary" 
              className="font-bold rounded-full px-10 py-8 text-xl bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl shadow-blue-900/50"
            >
              Ver Catálogo de Propiedades
            </Button>
          </Link>
        </div>
      </section>

      {/* --- SECCIÓN DE DESTACADOS (Opcional, para dar contexto) --- */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Nuestra Selección</h3>
        <h2 className="text-3xl font-black text-slate-900 mb-12">Propiedades Destacadas</h2>
        
        {/* Aquí iría una grilla de 3 cards, similar a la del admin pero más visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
           {/* Placeholder de cards */}
           {[1, 2, 3].map(i => (
             <div key={i} className="aspect-[4/3] bg-slate-200 rounded-3xl animate-pulse"></div>
           ))}
        </div>
        <p className="mt-8 text-slate-500 text-sm">(Próximamente: Conexión con propiedades reales)</p>
      </section>

    </div>
  );
};

export default Home;