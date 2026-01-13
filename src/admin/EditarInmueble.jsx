import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Toaster, toast } from 'sonner'; // Volvemos a Sonner
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, useDisclosure 
} from "@heroui/react";

const EditarInmueble = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState(null);
  const [newMainFile, setNewMainFile] = useState(null);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);

  // BLOQUEO FÍSICO PARA EVITAR BUCLES
  const isSubmitting = useRef(false);

  useEffect(() => {
    const fetchInmueble = async () => {
      const { data, error } = await supabase.from('propiedades').select('*').eq('id', id).single();
      if (error) {
        toast.error("Error al cargar los datos");
        navigate('/admin');
      } else {
        setFormData({ ...data, imagenes: data.imagenes || [] });
      }
      setFetching(false);
    };
    fetchInmueble();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (isSubmitting.current) return; // Si ya está enviando, no hace nada
    
    isSubmitting.current = true;
    onClose();
    setLoading(true);
    const toastId = toast.loading("Sincronizando cambios...");
    
    try {
      const folderName = `${id}_edit`;
      let finalMainUrl = formData.imagen_principal;
      let finalGalleryUrls = [...formData.imagenes];

      if (newMainFile) {
        const path = `${folderName}/main_${Date.now()}.${newMainFile.name.split('.').pop()}`;
        await supabase.storage.from('fotos-propiedades').upload(path, newMainFile);
        finalMainUrl = (supabase.storage.from('fotos-propiedades').getPublicUrl(path)).data.publicUrl;
      }

      for (const file of newGalleryFiles) {
        const path = `${folderName}/gal_${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
        await supabase.storage.from('fotos-propiedades').upload(path, file);
        finalGalleryUrls.push((supabase.storage.from('fotos-propiedades').getPublicUrl(path)).data.publicUrl);
      }

      const { error } = await supabase.from('propiedades').update({
        ...formData,
        precio: parseFloat(formData.precio),
        dormitorios: parseInt(formData.dormitorios) || 0,
        baños: parseInt(formData.baños) || 0,
        metros_cuadrados: parseInt(formData.metros_cuadrados) || 0,
        imagen_principal: finalMainUrl,
        imagenes: finalGalleryUrls
      }).eq('id', id);

      if (error) throw error;

      toast.success("Inmueble actualizado con éxito", { id: toastId });
      setTimeout(() => navigate('/admin'), 1200);
    } catch (e) {
      toast.error(e.message, { id: toastId });
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  if (fetching) return <div className="p-10 text-center font-bold text-slate-400">Cargando datos de Corpus Inmobiliaria...</div>;
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
        <Toaster richColors position="top-center" />
      {/* MODAL HERO UI */}
      <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onClose={onClose}
        placement="center"
       classNames={{base: "rounded-[1rem] border border-slate-200 bg-white "}}
      >
        
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmar Edición</ModalHeader>
              <ModalBody className="py-6">
                <p className="text-slate-600">¿Estás seguro de que deseas actualizar la información de esta propiedad?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="font-bold text-slate-500">Revisar</Button>
                <Button color="primary" onPress={handleUpdate} className="font-bold ">Guardar Cambios</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <h2 className="font-bold uppercase tracking-widest text-sm">Editar Inmueble</h2>
          <button onClick={() => navigate('/admin')} className="text-xs text-slate-400 hover:text-white transition">CERRAR</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onOpen(); }} className="p-6 space-y-6 text-slate-800">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-100 p-4 rounded-xl border">
            <div className="col-span-1 space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500">Imagen Principal</label>
              <div className="relative h-32 rounded-lg overflow-hidden border-2 border-blue-500 shadow-inner group bg-white">
                <img 
                  src={newMainFile ? URL.createObjectURL(newMainFile) : formData.imagen_principal} 
                  className="w-full h-full object-cover" 
                  alt="Principal"
                />
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                   <span className="text-white text-[10px] font-bold">REEMPLAZAR</span>
                   <input type="file" className="hidden" onChange={(e) => setNewMainFile(e.target.files[0])} />
                </label>
              </div>
            </div>

            <div className="col-span-3 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase text-slate-500">Galería ({formData.imagenes.length + newGalleryFiles.length} fotos)</label>
                <label className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition font-bold">
                  + AGREGAR FOTOS
                  <input type="file" multiple className="hidden" onChange={(e) => setNewGalleryFiles([...newGalleryFiles, ...Array.from(e.target.files)])} />
                </label>
              </div>
              <div className="grid grid-cols-6 gap-2 h-32 overflow-y-auto p-2 bg-white rounded-lg border shadow-inner">
                {formData.imagenes.map((img, idx) => (
                  <div key={idx} className="relative group h-12 rounded border overflow-hidden">
                    <img src={img} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setFormData({...formData, imagenes: formData.imagenes.filter((_, i) => i !== idx)})} className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 text-[8px] opacity-0 group-hover:opacity-100 transition">✕</button>
                  </div>
                ))}
                {newGalleryFiles.map((file, idx) => (
                  <div key={idx} className="relative h-12 rounded border-2 border-green-400 overflow-hidden">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setNewGalleryFiles(newGalleryFiles.filter((_, i) => i !== idx))} className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 text-[8px]">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Título del Anuncio</label>
              <input type="text" required className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Ubicación</label>
              <input type="text" required className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.ubicacion} onChange={(e) => setFormData({...formData, ubicacion: e.target.value})} />
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo Propiedad</label>
              <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.tipo_propiedad} onChange={(e) => setFormData({...formData, tipo_propiedad: e.target.value})}>
                <option value="Casa">Casa</option><option value="Departamento">Departamento</option><option value="Terreno">Terreno</option><option value="Local">Local</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-blue-500 uppercase">Precio</label>
              <input type="number" required className="w-full p-2 border-blue-200 rounded-lg text-sm font-bold bg-blue-50/20" value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Moneda</label>
              <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm font-bold" value={formData.moneda} onChange={(e) => setFormData({...formData, moneda: e.target.value})}>
                <option value="USD">USD</option><option value="ARS">ARS</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Operación</label>
              <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm font-bold" value={formData.tipo_operacion} onChange={(e) => setFormData({...formData, tipo_operacion: e.target.value})}>
                <option value="Venta">Venta</option><option value="Alquiler">Alquiler</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Dormitorios</label>
              <input type="number" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.dormitorios} onChange={(e) => setFormData({...formData, dormitorios: e.target.value})} />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Baños</label>
              <input type="number" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.baños} onChange={(e) => setFormData({...formData, baños: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">M² Totales</label>
              <input type="number" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" value={formData.metros_cuadrados} onChange={(e) => setFormData({...formData, metros_cuadrados: e.target.value})} />
            </div>
            <div className="md:col-span-2 flex items-center gap-8 pt-4">
               <label className="flex items-center gap-2 cursor-pointer font-bold"><input type="checkbox" className="w-4 h-4" checked={formData.destacado} onChange={(e) => setFormData({...formData, destacado: e.target.checked})} /><span className="text-[10px] uppercase">Destacado ⭐</span></label>
               <label className="flex items-center gap-2 cursor-pointer font-bold"><input type="checkbox" checked={formData.disponible} onChange={(e) => setFormData({...formData, disponible: e.target.checked})} /><span className="text-[10px] uppercase">Disponible ✅</span></label>
            </div>
          </div>

          <textarea rows="3" placeholder="Descripción detallada..." className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />

          <button type="submit" disabled={loading} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:shadow-lg active:scale-95 transition-all disabled:opacity-50">
            {loading ? "Sincronizando..." : "Guardar Todos los Cambios"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarInmueble;