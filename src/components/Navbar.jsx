import React from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem, 
  Button 
} from "@heroui/react";
import { Link, useLocation } from "react-router-dom";

const NavbarApp = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // Definimos los enlaces para no repetir código (DRY)
  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Ventas", path: "/ventas" },
    { label: "Alquileres", path: "/alquileres" },
    { label: "Tasaciones", path: "/tasaciones" },
    { label: "Administración", path: "/administracion" },
  ];

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      maxWidth="xl" 
      className="bg-white/80 backdrop-blur-md border-b border-slate-100 font-sans"
      isBordered
      sticky
    >
      <NavbarContent>
        {/* Menú Hamburguesa para Móvil */}
     
        
        {/* LOGO */}
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-lg -rotate-12">C</span>
            </div>
            <p className="font-black text-2xl tracking-tighter text-slate-900">Corpus</p>
          </Link>
        </NavbarBrand>
           <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden text-slate-900"
        />
      </NavbarContent>

      {/* ENLACES DESKTOP (Se ocultan en md:down) */}
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={location.pathname === item.path}>
            <Link 
              to={item.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                location.pathname === item.path ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* BOTÓN DE ACCESO CLIENTES / LOGIN */}
 

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <NavbarMenu className="bg-white/95 backdrop-blur-xl pt-10 px-8 flex flex-col gap-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className={`w-full text-3xl font-black tracking-tighter ${
                location.pathname === item.path ? "text-blue-600" : "text-slate-900"
              }`}
              to={item.path}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <div className="mt-10 pt-10 border-t border-slate-100">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inmobiliaria Corpus</p>
           <p className="text-sm text-slate-500 font-medium">Río Cuarto, Córdoba.</p>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarApp;