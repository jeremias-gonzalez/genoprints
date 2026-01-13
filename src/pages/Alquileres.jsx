import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import SeccionPropiedad from '../components/SeccionPropiedad';
import NavbarApp from '../components/Navbar';
const Alquileres = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlquileres = async () => {
      const { data } = await supabase
        .from('propiedades')
        .select('*')
        .eq('tipo_operacion', 'Alquiler')
        .order('created_at', { ascending: false });
      setInmuebles(data || []);
      setLoading(false);
    };
    fetchAlquileres();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-slate-200 text-5xl animate-pulse">ALQUILERES</div>;

  return (
    <>
           <NavbarApp/>   
 <main className="w-full pt-10 font-sans">
 
      <div className="px-8 mb-12">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter">Alquileres</h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs mt-2">Tu próximo hogar temporal</p>
      </div>
      {inmuebles.map((item, index) => (
        <SeccionPropiedad key={item.id} item={item} index={index} />
      ))}
    </main>
  </>

  );
};

export default Alquileres;