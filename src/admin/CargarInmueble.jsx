import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, useDisclosure 
} from "@heroui/react";

const CargarInmueble = () => {
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [loading, setLoading] = useState(false);
  
  const [mainFile, setMainFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [formData, setFormData] = useState({
    titulo: '', descripcion: '', precio: '', moneda: 'USD',
    tipo_operacion: 'Venta', tipo_propiedad: 'Casa',
    dormitorios: 0, baños: 0, metros_cuadrados: 0,
    ubicacion: '', destacado: false, disponible: true
  });

  const handleSubmit = async () => {
    onClose();
    if (!mainFile) return toast.warning("Debes subir una foto de portada");
    
    setLoading(true);
    const toastId = toast.loading("Publicando propiedad...");

    try {
      const folderName = `${Date.now()}_nuevo`;
      const mainPath = `${folderName}/main.${mainFile.name.split('.').pop()}`;
      await supabase.storage.from('fotos-propiedades').upload(mainPath, mainFile);
      const { data: mData } = supabase.storage.from('fotos-propiedades').getPublicUrl(mainPath);
      const mainUrl = mData.publicUrl;

      const galleryUrls = [];
      for (const file of galleryFiles) {
        const path = `${folderName}/gal_${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
        await supabase.storage.from('fotos-propiedades').upload(path, file);
        const { data: gData } = supabase.storage.from('fotos-propiedades').getPublicUrl(path);
        galleryUrls.push(gData.publicUrl);
      }

      const { error } = await supabase.from('propiedades').insert([{ 
        ...formData,
        precio: parseFloat(formData.precio),
        dormitorios: parseInt(formData.dormitorios) || 0,
        baños: parseInt(formData.baños) || 0,
        metros_cuadrados: parseInt(formData.metros_cuadrados) || 0,
        imagen_principal: mainUrl,
        imagenes: galleryUrls
      }]);

      if (error) throw error;
      toast.success("¡Propiedad publicada con éxito!", { id: toastId });
      setTimeout(() => navigate('/admin'), 1500);

    } catch (e) {
      toast.error(e.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <Toaster richColors position="top-center" />
      
      {/* MODAL HERO UI */}
      <Modal 
        backdrop="blur" 
        isOpen={isOpen} 
        onClose={onClose} 
        placement="center" 
        classNames={{ base: "rounded-[1rem] border border-slate-200 bg-white" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold">Publicar Inmueble</ModalHeader>
              <ModalBody>
                <p className="text-slate-600">¿Confirmás que los datos ingresados son correctos para su publicación?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="font-bold text-slate-500">Revisar</Button>
                <Button color="primary" onPress={handleSubmit} className="font-bold shadow-lg shadow-blue-200">Publicar Ahora</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <h2 className="font-bold uppercase tracking-widest text-sm">Nueva Propiedad</h2>
          <button onClick={() => navigate('/admin')} className="text-xs text-blue-100 hover:text-white uppercase font-bold transition">Cancelar</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onOpen(); }} className="p-6 space-y-6 text-slate-800">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-100 p-4 rounded-xl border">
            <div className="col-span-1 space-y-2 text-center">
              <label className="text-[10px] font-bold uppercase text-slate-500">Imagen Portada</label>
              <div className="relative h-32 rounded-lg border-2 border-dashed border-blue-400 bg-white flex items-center justify-center overflow-hidden">
                {mainFile ? <img src={URL.createObjectURL(mainFile)} className="w-full h-full object-cover" /> : <span className="text-[9px] text-slate-400 font-bold">CLICK PARA SUBIR</span>}
                <input type="file" required accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setMainFile(e.target.files[0])} />
              </div>
            </div>
            <div className="col-span-3 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase text-slate-500">Galería de fotos ({galleryFiles.length})</label>
                <label className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-700 transition font-bold">
                  + AGREGAR FOTOS
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => setGalleryFiles([...galleryFiles, ...Array.from(e.target.files)])} />
                </label>
              </div>
              <div className="grid grid-cols-6 gap-2 h-32 overflow-y-auto p-2 bg-white rounded-lg border shadow-inner">
                {galleryFiles.map((file, idx) => (
                  <div key={idx} className="relative h-12 rounded border overflow-hidden group">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setGalleryFiles(galleryFiles.filter((_, i) => i !== idx))} className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 text-[8px] opacity-0 group-hover:opacity-100 transition">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Título del Anuncio</label>
              <input type="text" required placeholder="Título del anuncio" className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, titulo: e.target.value})} />
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Ubicación</label>
              <input type="text" required placeholder="Barrio / Ciudad" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" onChange={(e) => setFormData({...formData, ubicacion: e.target.value})} />
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Tipo de Propiedad</label>
              <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm" onChange={(e) => setFormData({...formData, tipo_propiedad: e.target.value})}>
                <option value="Casa">Casa</option><option value="Departamento">Departamento</option><option value="Terreno">Terreno</option><option value="Local">Local</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-blue-500 uppercase">Precio</label>
              <input type="number" required placeholder="0" className="w-full p-2 border-blue-100 rounded-lg text-sm font-bold bg-blue-50/20" onChange={(e) => setFormData({...formData, precio: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Moneda</label>
              <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm font-bold" onChange={(e) => setFormData({...formData, moneda: e.target.value})}><option>USD</option><option>ARS</option></select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Operación</label>
              <select className="w-full p-2 bg-slate-50 border rounded-lg text-sm font-bold" onChange={(e) => setFormData({...formData, tipo_operacion: e.target.value})}><option>Venta</option><option>Alquiler</option></select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Dormitorios</label>
              <input type="number" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" onChange={(e) => setFormData({...formData, dormitorios: e.target.value})} />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Baños</label>
              <input type="number" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" onChange={(e) => setFormData({...formData, baños: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">M² Totales</label>
              <input type="number" className="w-full p-2 bg-slate-50 border rounded-lg text-sm" onChange={(e) => setFormData({...formData, metros_cuadrados: e.target.value})} />
            </div>
            <div className="md:col-span-2 flex items-center gap-8 pt-4 text-slate-600">
               <label className="flex items-center gap-2 cursor-pointer font-bold"><input type="checkbox" className="w-4 h-4" onChange={(e) => setFormData({...formData, destacado: e.target.checked})} /><span className="text-[10px] uppercase">Destacado ⭐</span></label>
               <label className="flex items-center gap-2 cursor-pointer font-bold"><input type="checkbox" defaultChecked className="w-4 h-4" onChange={(e) => setFormData({...formData, disponible: e.target.checked})} /><span className="text-[10px] uppercase">Disponible ✅</span></label>
            </div>
          </div>

          <textarea rows="3" placeholder="Descripción detallada de la propiedad..." className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, descripcion: e.target.value})} />

          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg active:scale-95 disabled:opacity-50">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Publicando...
              </span>
            ) : "Publicar Inmueble Ahora"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CargarInmueble;