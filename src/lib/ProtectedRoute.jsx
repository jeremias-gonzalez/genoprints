import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Chequeamos la sesión actual al cargar
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();

    // 2. Escuchamos cambios (por si la sesión expira)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Mientras verifica, no mostramos nada (o podrías poner un spinner)
  if (loading) return <div className="min-h-screen bg-slate-50" />;

  // Si hay sesión, mostramos la ruta (Outlet). Si no, al Login.
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; // IMPORTANTE: El export default para evitar el SyntaxError