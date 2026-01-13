import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, CardBody } from "@heroui/react";
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Verificando credenciales...");

    try {
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

  const { data: perfil, error: perfilError } = await supabase
  .from('perfiles') // <--- Asegurate que el nombre sea exacto
  .select('rol')
  .eq('id', user.id) // <--- El id que viene del Auth
  .single();

      if (perfilError || !perfil) {
        await supabase.auth.signOut();
        throw new Error("Acceso denegado: Usuario sin permisos configurados.");
      }

      toast.success(`Bienvenido al Panel`, { id: toastId });
      navigate('/admin');
      
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fondo con un degradado sutil para que no sea solo gris plano
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-slate-200 p-4 font-sans antialiased">
      
      <Card className="max-w-md w-full rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-none bg-white/80 backdrop-blur-md">
        <CardBody className="gap-8 py-12 px-8">
          
          <div className="text-center space-y-3">
            {/* Un pequeño detalle visual para el logo */}
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-2xl rotate-12 flex items-center justify-center shadow-lg shadow-blue-200 mb-2">
               <span className="text-white font-black text-xl -rotate-12">C</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Corpus</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Gestión Inmobiliaria</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="space-y-4">
              <Input 
                label="Email" 
                type="email" 
                variant="flat" 
                isRequired
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={{
                  inputWrapper: "h-14 bg-slate-100/50 group-data-[focus=true]:bg-white border-transparent group-data-[focus=true]:border-blue-500 transition-all rounded-2xl",
                  label: "font-bold text-slate-500",
                }}
              />
              <Input 
                label="Contraseña" 
                type="password" 
                variant="flat" 
                isRequired
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  inputWrapper: "h-14 bg-slate-100/50 group-data-[focus=true]:bg-white border-transparent group-data-[focus=true]:border-blue-500 transition-all rounded-2xl",
                  label: "font-bold text-slate-500",
                }}
              />
            </div>

            <Button 
              color="primary" 
              type="submit" 
              isLoading={loading}
              className="font-bold h-16 rounded-2xl text-lg bg-slate-900 text-white shadow-2xl shadow-slate-300 hover:scale-[1.02] active:scale-95 transition-all mt-4"
            >
              Ingresar al Sistema
            </Button>
            
            <p className="text-center text-[10px] text-slate-400 font-medium">
              Soporte Técnico: Corpus Rio Cuarto
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;