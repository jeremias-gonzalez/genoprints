import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../components/CartContext';
import { 
  Skeleton, 
  Card, 
  CardBody, 
  Button, 
  Select, 
  SelectItem,
  Input
} from "@heroui/react";
import CardProducto from '../components/CardProducto'; // Tu componente de card

const Categoria = () => {
  const { slug } = useParams(); // Obtenemos el nombre de la categoría de la URL
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Estados para filtros
  const [filtroMaterial, setFiltroMaterial] = useState("Todos");
  const [orden, setOrden] = useState("recientes");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      
      // Consulta base a tu tabla de productos 3D
      let query = supabase
        .from('productos')
        .select('*')
        .ilike('categoria', `%${slug}%`); // Filtra por la categoría de la URL

      const { data, error } = await query;

      if (!error) setProductos(data);
      setLoading(false);
    };

    fetchProductos();
  }, [slug]);

  // LÓGICA DE FILTRADO EN FRONTEND (Para mayor velocidad)
  const productosFiltrados = productos
    .filter(p => (filtroMaterial === "Todos" ? true : p.material === filtroMaterial))
    .filter(p => p.titulo.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => {
      if (orden === "menor-precio") return a.precio - b.precio;
      if (orden === "mayor-precio") return b.precio - a.precio;
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <main className="min-h-screen bg-white pb-20 font-sans">
      {/* HEADER DE CATEGORÍA */}
      <header className="bg-emerald-950 py-20 px-8 text-white rounded-b-[3rem] mb-12 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <p className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs mb-2">Geno Prints 3D</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            {slug}
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* BARRA DE FILTROS RESPONSIVE */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-end">
          <div className="w-full md:w-1/3">
            <Input 
              label="Buscar en esta categoría"
              placeholder="Ej: Mate imperial..."
              value={busqueda}
              onValueChange={setBusqueda}
              variant="flat"
              className="font-bold"
            />
          </div>
          <div className="w-full md:w-1/4">
            <Select 
              label="Material" 
              selectedKeys={[filtroMaterial]} 
              onSelectionChange={(keys) => setFiltroMaterial(Array.from(keys)[0])}
            >
              <SelectItem key="Todos">Todos los materiales</SelectItem>
              <SelectItem key="PLA">PLA (Biodegradable)</SelectItem>
              <SelectItem key="PETG">PETG (Resistente)</SelectItem>
              <SelectItem key="Resina">Resina (Alta resolución)</SelectItem>
            </Select>
          </div>
          <div className="w-full md:w-1/4">
            <Select 
              label="Ordenar por" 
              selectedKeys={[orden]} 
              onSelectionChange={(keys) => setOrden(Array.from(keys)[0])}
            >
              <SelectItem key="recientes">Más recientes</SelectItem>
              <SelectItem key="menor-precio">Menor precio</SelectItem>
              <SelectItem key="mayor-precio">Mayor precio</SelectItem>
            </Select>
          </div>
        </div>

        {/* GRILLA DE PRODUCTOS / SKELETONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            // Renderiza 8 Skeletons mientras carga
            Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="w-full space-y-5 p-4 rounded-[2.5rem]" radius="lg">
                <Skeleton className="rounded-[2rem]">
                  <div className="h-64 rounded-[2rem] bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                </div>
              </Card>
            ))
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod) => (
              <CardProducto key={prod.id} item={prod} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-bold italic text-xl">No encontramos productos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Categoria;