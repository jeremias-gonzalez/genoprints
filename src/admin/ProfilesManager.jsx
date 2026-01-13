import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Input, Button, Select, SelectItem, Card, CardBody } from "@heroui/react";
import { toast, Toaster } from 'sonner';

const GestionCredenciales = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('editor');
  const [loading, setLoading] = useState(false);
  const isProcessing = useRef(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (isProcessing.current) return;
    
    isProcessing.current = true;
    setLoading(true);
    const toastId = toast.loading("Creando acceso para el personal...");

    try {
      // 1. Registro en el sistema de autenticación de Supabase
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Insertar el rol único en la tabla perfiles
      const { error: profileError } = await supabase
        .from('perfiles')
        .insert([{ id: data.user.id, email, rol: rol }]);

      if (profileError) throw profileError;

      toast.success(`Acceso creado: ${email} con rol ${rol}`, { id: toastId });
      setEmail(''); setPassword('');
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
      isProcessing.current = false;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 min-h-[80vh] flex items-center">
      <Toaster theme="dark" richColors position="top-right" />
      
      <Card className="w-full rounded-[2.5rem] shadow-2xl border-none p-4">
        <CardBody className="gap-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Gestión de Accesos</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Crear credenciales para el panel</p>
          </div>

          <form onSubmit={handleCreateUser} className="flex flex-col gap-5">
            <Input 
              label="Email Corporativo" 
              type="email" 
              variant="bordered" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <Input 
              label="Contraseña Temporal" 
              type="password" 
              variant="bordered" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <Select 
              label="Rol de Usuario" 
              variant="bordered" 
              selectedKeys={[rol]}
              onChange={(e) => setRol(e.target.value)}
            >
              <SelectItem key="editor" value="editor">Editor (Carga y Edición)</SelectItem>
              <SelectItem key="admin" value="admin">Admin (Control Total)</SelectItem>
            </Select>

            <Button 
              color="primary" 
              type="submit" 
              isLoading={loading}
              className="font-bold h-14 rounded-2xl text-lg shadow-xl shadow-blue-200 mt-2"
            >
              Generar Credenciales
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default GestionCredenciales;