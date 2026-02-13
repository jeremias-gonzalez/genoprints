import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import NavbarApp from '../components/Navbar';
// 1. Importamos los componentes necesarios para el modal (Lightbox)
import { Button, Chip, Card, CardBody, Modal, ModalContent, useDisclosure } from "@heroui/react";

// 2. Definimos la animación CSS suave para la transición
const transitionStyles = `
  @keyframes fadeInScale {
    from { opacity: 0.4; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-image-change {
    animation: fadeInScale 0.4s ease-out forwards;
  }
`;

const DetalleInmueble = () => {
  const { id } = useParams();
  const [prop, setProp] = useState(null);
  const [mainImg, setMainImg] = useState("");
  // 3. Hook para controlar el Lightbox
  const {isOpen, onOpen, onClose} = useDisclosure();

  const allImages = prop ? [prop.imagen_principal, ...prop.imagenes] : [];

  useEffect(() => {
    const getProp = async () => {
      const { data } = await supabase.from('propiedades').select('*').eq('id', id).single();
      setProp(data);
      setMainImg(data?.imagen_principal);
    };
    getProp();
  }, [id]);

  const handleNext = () => {
    const currentIndex = allImages.indexOf(mainImg);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setMainImg(allImages[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = allImages.indexOf(mainImg);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setMainImg(allImages[prevIndex]);
  };

  if (!prop) return <div className="p-20 text-center font-sans animate-pulse text-slate-300 font-black">CARGANDO DETALLES...</div>;

  return (
      <> <NavbarApp/>
    <div className="min-h-screen bg-white font-sans pb-10 pt-6">
     
      {/* Inyectamos los estilos de la animación */}
      <style>{transitionStyles}</style>

      {/* --- MODAL LIGHTBOX (Igual que en el Admin) --- */}
      <Modal 
        size="full" 
        backdrop="blur" 
        isOpen={isOpen} 
        onClose={onClose} 
        className="bg-transparent shadow-none !m-0 p-4 items-center justify-center"
        classNames={{ closeButton: "text-white bg-black/50 rounded-full p-2 top-4 right-4 z-50 hover:bg-white hover:text-black transition-all" }}
      >
        <ModalContent className="w-auto h-auto max-w-full max-h-full flex justify-center items-center shadow-none bg-transparent relative">
            <img 
              src={mainImg} 
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl animate-image-change" 
              alt="Vista completa" 
              onClick={(e) => e.stopPropagation()} // Evita que el click en la imagen cierre el modal
            />
        </ModalContent>
      </Modal>


      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* VISOR PRINCIPAL INTERACTIVO */}
          {/* Agregamos cursor-zoom-in y el evento onClick para abrir el modal */}
          <div 
            className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 group cursor-zoom-in"
            onClick={onOpen} 
          >
            {/* IMPORTANTE: El uso de key={mainImg} es el truco. 
                Cuando 'mainImg' cambia, React desmonta la imagen vieja y monta la nueva,
                disparando la animación 'animate-image-change' de nuevo.
            */}
            <img 
              key={mainImg}
              src={mainImg} 
              className="w-full h-full object-cover animate-image-change" 
              alt="Visualización principal" 
            />

            {/* Flechas (usamos stopPropagation para que el click en la flecha no abra el modal) */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/50 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <span className="text-2xl font-bold relative right-[1px]">❮</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/50 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <span className="text-2xl font-bold relative left-[1px]">❯</span>
            </button>

            <div className="absolute bottom-4 right-6 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold pointer-events-none">
              {allImages.indexOf(mainImg) + 1} / {allImages.length}
            </div>
             <div className="absolute top-4 right-6 bg-black/40 backdrop-blur-md text-white p-2 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              🔍 Click para ampliar
            </div>
          </div>

          {/* GRID DE MINIATURAS */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {allImages.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setMainImg(img)}
                // Agregamos una transición suave al borde y escala de la miniatura activa
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${mainImg === img ? 'border-blue-600 scale-95 opacity-100 ring-2 ring-blue-200' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Miniatura ${i}`} />
              </button>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA (Sin cambios) */}
        <div className="lg:col-span-4 space-y-8">
            {/* ... (El resto del código de info y tarjeta se mantiene igual) ... */}
            <div className="space-y-4">
            <Chip variant="dot" color="primary" className="font-bold uppercase text-[10px]">{prop.tipo_propiedad}</Chip>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{prop.titulo}</h1>
            <p className="text-slate-400 font-bold flex items-center gap-2 italic">📍 {prop.ubicacion}</p>
            <div className="text-5xl font-black text-blue-600 pt-4">
              {prop.moneda} ${prop.precio?.toLocaleString()}
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2rem]">
            <CardBody className="p-8 space-y-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-black">{prop.metros_cuadrados}m²</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Superficie</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black">{prop.dormitorios}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Dormitorios</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black">{prop.baños}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Baños</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black">{prop.tipo_operacion}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Operación</span>
                </div>
              </div>
              <Button color="primary" className="w-full h-16 rounded-2xl font-bold text-lg bg-blue-600 shadow-xl shadow-blue-900/40 hover:scale-[1.02] transition-transform">
                CONSULTAR POR WHATSAPP
              </Button>
            </CardBody>
          </Card>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Descripción</h3>
            <p className="text-slate-600 leading-relaxed font-medium italic">{prop.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
</>
  );

};

export default DetalleInmueble;