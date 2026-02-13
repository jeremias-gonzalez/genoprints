import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { useCart } from '../components/CartContext';

const CardProducto = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Card className="border-none bg-white shadow-xl rounded-[2.5rem] hover:scale-[1.02] transition-all duration-300 h-full group">
      <CardBody className="p-0 overflow-hidden relative">
        {/* Link al detalle envolviendo la imagen */}
        <Link to={`/detalle/${item.id}`}>
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src={item.imagen_principal} 
              alt={item.titulo}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
        </Link>

        {/* Chip de Material (PLA, Resina, etc) */}
        <div className="absolute top-4 left-4 z-10">
          <Chip 
            size="sm" 
            variant="flat" 
            className="bg-white/90 backdrop-blur-md text-emerald-900 font-black uppercase text-[10px] border-none shadow-sm"
          >
            {item.material}
          </Chip>
        </div>

        {/* Botón flotante de añadir rápido */}
        <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-20">
          <Button 
            isIconOnly
            className="bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-900/30 hover:bg-emerald-500 w-12 h-12"
            onPress={() => addToCart(item)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Button>
        </div>
      </CardBody>

      {/* Información del producto */}
      <div className="p-6 flex flex-col gap-1">
        <Link to={`/detalle/${item.id}`}>
          <h3 className="font-black text-emerald-950 text-xl tracking-tighter truncate uppercase leading-none">
            {item.titulo}
          </h3>
        </Link>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {item.dimensiones || 'Tamaño Estándar'}
        </p>
        
        <div className="flex justify-between items-end mt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-emerald-600">
              ${item.precio?.toLocaleString()}
            </span>
          </div>
          <Button 
            size="sm" 
            variant="light" 
            as={Link} 
            to={`/detalle/${item.id}`}
            className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest hover:text-emerald-600 px-0 min-w-0"
          >
            Ver Detalle →
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardProducto;