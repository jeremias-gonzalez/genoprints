import { Link } from 'react-router-dom';
import { Button, Chip } from "@heroui/react";

const SeccionPropiedad = ({ item, index }) => {
  // Verificamos si es un índice impar para invertir el orden (Imagen a la derecha)
  const isInverted = index % 2 !== 0;

  return (
    <section className={`flex flex-col md:flex-row w-full min-h-[70vh] border-b border-slate-100 ${isInverted ? 'md:flex-row-reverse' : ''}`}>
      {/* BLOQUE DE IMAGEN */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden relative group">
        <img 
          src={item.imagen_principal} 
          alt={item.titulo} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      </div>

      {/* BLOQUE DE CONTENIDO */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-24 space-y-8 bg-white">
        <div className="space-y-4">
          <Chip variant="flat" color="primary" className="font-bold text-[10px] uppercase tracking-tighter">
            {item.tipo_propiedad} • {item.ubicacion}
          </Chip>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            {item.titulo}
          </h2>
        </div>

        <p className="text-slate-500 text-lg leading-relaxed line-clamp-3 font-medium italic">
          "{item.descripcion}"
        </p>

        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-black text-blue-600">
            {item.moneda} ${item.precio?.toLocaleString()}
          </span>
        </div>

        <div className="pt-4">
          <Link to={`/detalle/${item.id}`}>
            <Button 
              size="lg" 
              className="bg-slate-900 text-white font-bold rounded-2xl px-12 h-16 text-lg hover:bg-blue-600 shadow-2xl transition-all active:scale-95"
            >
              EXPLORAR PROPIEDAD
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeccionPropiedad;