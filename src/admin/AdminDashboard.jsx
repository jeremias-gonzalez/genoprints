import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom'; // Añadimos useNavigate
import { Toaster, toast } from 'sonner';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, useDisclosure 
} from "@heroui/react";
import { CardSkeleton } from '../components/AdminUi';

const AdminDashboard = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetId, setTargetId] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  
  const navigate = useNavigate(); // Inicializamos el navegador
  const deleteDisc = useDisclosure();
  const imageDisc = useDisclosure();

  useEffect(() => { fetchInmuebles(); }, []);

  const fetchInmuebles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('propiedades').select('*').order('created_at', { ascending: false });
    if (error) toast.error("Error de conexión");
    else setInmuebles(data);
    setLoading(false);
  };

  // FUNCIÓN DE LOGOUT
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      toast.success("Sesión cerrada correctamente");
      navigate('/login'); // Redirigimos al usuario al Login
    }
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Eliminando...");
    const { error } = await supabase.from('propiedades').delete().eq('id', targetId);
    if (error) toast.error("Error al borrar", { id: toastId });
    else {
      setInmuebles(inmuebles.filter(item => item.id !== targetId));
      toast.success("Eliminado", { id: toastId });
      deleteDisc.onClose();
    }
  };

  const openLightbox = (url) => {
    setActiveImg(url);
    imageDisc.onOpen();
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <Toaster position="top-right" richColors theme="dark" />

      {/* MODALES (Mantener igual...) */}
      <Modal backdrop="blur" isOpen={deleteDisc.isOpen} onClose={deleteDisc.onClose} classNames={{base: "rounded-[1rem] border border-slate-200 bg-white"}}>
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody className="text-slate-600 text-sm">¿Estás seguro de borrar este inmueble? Esta acción es permanente.</ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={deleteDisc.onClose}>Cancelar</Button>
            <Button color="danger" className="font-bold" onPress={confirmDelete}>Eliminar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal size="5xl" backdrop="blur" isOpen={imageDisc.isOpen} onClose={imageDisc.onClose} className="bg-transparent shadow-none">
        <ModalContent className="flex items-center justify-center">
          <img src={activeImg} className="max-h-[85vh] rounded-3xl shadow-2xl object-contain" />
        </ModalContent>
      </Modal>

      {/* HEADER CON LOGOUT */}
      <div className="flex justify-between items-center mb-8 px-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Panel de Control</h1>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">Corpus Inmobiliaria</p>
        </div>
        
        <div className="flex gap-3 items-center">
          {/* BOTÓN LOGOUT (Diseño minimalista) */}
          <Button 
            onPress={handleLogout}
            variant="flat" 
            color="default" 
            className="font-bold text-slate-500 hover:text-red-500 rounded-xl px-4"
          >
            Salir
          </Button>

          <Link to="/admin/nuevo" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-lg">
            + Nuevo Inmueble
          </Link>
        </div>
      </div>

      {/* GRID DE INMUEBLES (Mantener igual...) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? [...Array(10)].map((_, i) => <CardSkeleton key={i} />) : (
          inmuebles.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-400 transition-colors shadow-sm flex flex-col group">
              <div className="relative h-32 w-full overflow-hidden">
                <img src={item.imagen_principal} className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500" onClick={() => openLightbox(item.imagen_principal)} />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded text-white ${item.tipo_operacion === 'Venta' ? 'bg-green-600' : 'bg-orange-600'}`}>{item.tipo_operacion}</span>
                </div>
              </div>

              <div className="flex gap-1 p-1 overflow-x-auto snap-x bg-slate-50 border-b">
                {item.imagenes?.map((img, idx) => (
                  <img key={idx} src={img} onClick={() => openLightbox(img)} className="w-10 h-10 object-cover rounded snap-start cursor-pointer hover:opacity-80 flex-shrink-0 border" />
                ))}
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-bold text-slate-800 truncate" title={item.titulo}>{item.titulo}</h3>
                    <span className="text-blue-700 font-extrabold text-xs ml-2">${item.precio?.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">📍 {item.ubicacion}</p>
                </div>
                <div className="flex gap-1 pt-2 border-t border-gray-50">
                  <Link to={`/admin/editar/${item.id}`} className="flex-1 text-center py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all">EDITAR</Link>
                  <button onClick={() => { setTargetId(item.id); deleteDisc.onOpen(); }} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold hover:bg-red-600 hover:text-white transition-all">BORRAR</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;