import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Chip } from "@heroui/react";
import { supabase } from '../lib/supabase';
import { useCart } from '../components/CartContext';
import CardProducto from '../components/CardProducto';
// Importamos Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase.from('productos').select('*');
      setProductos(data || []);
    };
    fetchItems();
  }, []);

  // Función para obtener productos aleatorios
  const getRandomProducts = (arr, num) => [...arr].sort(() => 0.5 - Math.random()).slice(0, num);

  // Categorías manuales para el emprendimiento
  const categorias = [
    { name: "Veladores", img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=500", path: "/catalogo?cat=veladores" },
    { name: "Mates", img: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?q=80&w=500", path: "/catalogo?cat=mate" },
    { name: "Macetas", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d445?q=80&w=500", path: "/catalogo?cat=macetas" },
    { name: "Técnico", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500", path: "/catalogo?cat=tecnico" },
  ];

  return (
    <div className="min-h-screen font-sans bg-white pb-20">
      
      {/* 1. HERO SECTION (BANNER PRINCIPAL) */}
      <section 
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center rounded-2xl mx-1 my-5 overflow-hidden shadow-2xl"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1705436324900-349f28020623?q=80&w=2070&auto=format&fit=crop")' }}
      >
        {/* Overlay en verde oscuro profundo para dar ese toque "Tech" */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>

        {/* Contenido Principal */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mt-[-5vh]">
          {/* Texto en color verde esmeralda brillante para resaltar sobre el oscuro */}
          <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg text-white">
            El futuro de tus ideas<br />
            <span className="text-emerald-400 inline-block">empieza acá</span>
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

      {/* 2. CATEGORÍAS (LINKS) */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categorias.map((cat, i) => (
            <Link key={i} to={cat.path} className="group relative aspect-square rounded-[2rem] overflow-hidden shadow-lg">
              <img src={cat.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent flex items-end p-8">
                <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CARRUSEL DE PRODUCTOS 1 (RANDOM) */}
    <section className="py-10 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-emerald-950 tracking-tighter uppercase leading-none">
               Los más pedidos
            </h2>
            <p className="text-emerald-600 font-bold text-xs italic">Lo que todos están imprimiendo en Río Cuarto.</p>
          </div>
          <Link to="/catalogo" className="text-emerald-600 font-bold text-sm uppercase tracking-widest hover:underline">
            Ver todo
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={25}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 3500 }}
          breakpoints={{ 
            640: { slidesPerView: 2.2 }, 
            1024: { slidesPerView: 4.2 } 
          }}
          className="px-6 !overflow-visible"
        >
          {getRandomProducts(productos, 6).map((item) => (
            <SwiperSlide key={item.id} className="pb-12">
              {/* USAMOS EL NUEVO COMPONENTE AQUÍ */}
              <CardProducto item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* 4. BANNER INTERMEDIO (LLAMADA A LA ACCIÓN) */}
      <section 
        className="h-[50vh] flex items-center justify-center bg-cover bg-fixed rounded-[3rem] mx-4 my-20 overflow-hidden relative"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1631034301594-5517e2311f97?q=80&w=2000")' }}
      >
        <div className="absolute inset-0 bg-emerald-950/80"></div>
        <div className="relative z-10 text-center text-white p-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">¿Tenés un diseño propio?</h2>
          <p className="text-emerald-100 font-bold mb-8">Lo imprimimos por vos. Envíanos tu archivo .STL o .OBJ</p>
          <Button as={Link} to="/servicios" className="bg-white text-emerald-950 font-black px-10 h-14 rounded-2xl">
            COTIZAR AHORA
          </Button>
        </div>
      </section>

      {/* 5. CARRUSEL DE PRODUCTOS 2 (RANDOM) */}
     <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h2 className="text-4xl font-black text-emerald-950 tracking-tighter uppercase">Novedades en 3D</h2>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 4500, reverseDirection: true }}
          breakpoints={{ 
            640: { slidesPerView: 2.2 }, 
            1024: { slidesPerView: 4.2 } 
          }}
          className="px-6 !overflow-visible"
        >
          {getRandomProducts(productos, 6).map((item) => (
            <SwiperSlide key={item.id} className="pb-12">
              {/* USAMOS EL NUEVO COMPONENTE AQUÍ TAMBIÉN */}
              <CardProducto item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
};

// Componente Card pequeño para los carruseles
const CardShadow = ({ item, addToCart }) => (
  <Card className="border-none bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all h-full">
    <CardBody className="p-0 relative group">
      <Link to={`/detalle/${item.id}`}>
        <img src={item.imagen_principal} className="aspect-[4/5] object-cover w-full transition-transform group-hover:scale-105" />
      </Link>
      <Button 
        isIconOnly
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg z-20 hover:bg-emerald-600 hover:text-white transition-all"
        onPress={() => addToCart(item)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Button>
    </CardBody>
    <div className="p-5 space-y-2">
      <h3 className="font-black text-emerald-950 uppercase text-sm truncate">{item.titulo}</h3>
      <p className="text-emerald-600 font-black text-lg leading-none">${item.precio}</p>
    </div>
  </Card>
);

export default Home;