import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SeccionPropiedad from '../components/SeccionPropiedad';
import NavbarApp from '../components/Navbar';
const Ventas = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentas = async () => {
      const { data } = await supabase
        .from('propiedades')
        .select('*')
        .eq('tipo_operacion', 'Venta')
        .order('created_at', { ascending: false });
      setInmuebles(data || []);
      setLoading(false);
    };
    fetchVentas();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-slate-200 text-5xl animate-pulse">VENTAS</div>;

  return (
    <> 
    <main className="w-full pt-10 font-sans">
      
      <div className="px-8 mb-12">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter">Ventas</h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs mt-2">Propiedades exclusivas en Río Cuarto</p>
      </div>
      {inmuebles.map((item, index) => (
        <SeccionPropiedad key={item.id} item={item} index={index} />
      ))}
    </main>
    </>
  );
};

export default Ventas;