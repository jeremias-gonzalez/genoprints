import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import { useCart } from '../components/CartContext'; // Importamos el carrito
import { Button, Chip, Card, CardBody, Modal, ModalContent, useDisclosure } from "@heroui/react";

const transitionStyles = `
  @keyframes fadeInScale {
    from { opacity: 0.4; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-image-change {
    animation: fadeInScale 0.4s ease-out forwards;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const { addToCart } = useCart(); // Hook del carrito
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Las imágenes ahora vienen de tu tabla de productos 3D
  const allImages = prod ? [prod.imagen_principal, ...(prod.imagenes || [])] : [];

  useEffect(() => {
    const getProduct = async () => {
      // CAMBIO CLAVE: Buscamos en 'productos'
      const { data } = await supabase.from('productos').select('*').eq('id', id).single();
      setProd(data);
      setMainImg(data?.imagen_principal);
    };
    getProduct();
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

  if (!prod) return <div className="p-20 text-center font-sans animate-pulse text-emerald-100 font-black text-3xl">CARGANDO PIEZA...</div>;

  return (
    <> 
      <style>{transitionStyles}</style>

      {/* --- MODAL LIGHTBOX --- */}
      <Modal 
        size="full" 
        backdrop="blur" 
        isOpen={isOpen} 
        onClose={onClose} 
        className="bg-transparent shadow-none !m-0 p-4 items-center justify-center"
        classNames={{ closeButton: "text-white bg-black/50 rounded-full p-2 top-4 right-4 z-50 hover:bg-emerald-600 transition-all" }}
      >
        <ModalContent className="w-auto h-auto max-w-full max-h-full flex justify-center items-center shadow-none bg-transparent relative">
            <img 
              src={mainImg} 
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl shadow-2xl animate-image-change" 
              alt="Vista completa" 
              onClick={(e) => e.stopPropagation()} 
            />
        </ModalContent>
      </Modal>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
        
        {/* COLUMNA IZQUIERDA: GALERÍA */}
        <div className="lg:col-span-8 space-y-4">
          <div 
            className="relative aspect-square md:aspect-video w-full rounded-[3rem] overflow-hidden shadow-2xl bg-slate-50 group cursor-zoom-in"
            onClick={onOpen} 
          >
            <img 
              key={mainImg}
              src={mainImg} 
              className="w-full h-full object-cover animate-image-change" 
              alt={prod.titulo} 
            />

            {/* Flechas de Navegación */}
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/20 hover:bg-emerald-600 backdrop-blur-xl text-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            >
              ❮
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white/20 hover:bg-emerald-600 backdrop-blur-xl text-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-xl"
            >
              ❯
            </button>

            <div className="absolute bottom-6 right-8 bg-emerald-950/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold">
              {allImages.indexOf(mainImg) + 1} / {allImages.length}
            </div>
          </div>

          {/* MINIATURAS */}
          <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
            {allImages.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setMainImg(img)}
                className={`aspect-square rounded-[1.5rem] overflow-hidden border-3 transition-all duration-300 ${mainImg === img ? 'border-emerald-600 scale-95 ring-4 ring-emerald-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Detalle ${i}`} />
              </button>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO Y COMPRA */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-4">
            <Chip variant="flat" className="font-black uppercase text-[10px] bg-emerald-100 text-emerald-700 border-none">
              {prod.material} • {prod.categoria}
            </Chip>
            <h1 className="text-5xl font-black text-emerald-950 tracking-tighter leading-none uppercase">
              {prod.titulo}
            </h1>
            <div className="text-5xl font-black text-emerald-600 pt-4 tracking-tighter">
              ${prod.precio?.toLocaleString()}
            </div>
          </div>

          <Card className="border-none shadow-2xl bg-emerald-950 text-white rounded-[2.5rem]">
            <CardBody className="p-10 space-y-8">
              <h3 className="font-bold text-[10px] uppercase tracking-[0.3em] text-emerald-400">Ficha Técnica</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">{prod.dimensiones || "---"}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Medidas</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">{prod.resolucion || "0.2mm"}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Capa</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">{prod.relleno || "15%"}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Infill</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">{prod.tiempo_entrega || "48hs"}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Producción</span>
                </div>
              </div>

              {/* ACCIÓN PRINCIPAL: AÑADIR AL CARRITO */}
              <Button 
                onPress={() => addToCart(prod)}
                className="w-full h-20 rounded-[1.5rem] font-black text-xl bg-emerald-500 text-white shadow-xl shadow-emerald-900/40 hover:bg-emerald-400 transition-all uppercase tracking-tighter"
              >
                Añadir al Carrito
              </Button>
            </CardBody>
          </Card>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-black text-emerald-950 uppercase text-[10px] tracking-widest">Descripción del Modelo</h3>
            <p className="text-slate-500 leading-relaxed font-medium italic text-lg">
              {prod.descripcion}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;