import React from "react";
import logo from "../../public/logopngverde.png"
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

  // Enlaces adaptados a tu negocio de impresión 3D
  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Catálogo", path: "/catalogo" },
    { label: "Proyectos", path: "/proyectos" },
    { label: "Servicios", path: "/servicios" },
    { label: "Administración", path: "/admin" },
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
        {/* LOGO: Ahora con branding de GENO PRINTS */}
        <NavbarBrand>
          <Link to="/" className="flex items-center gap-2">
            {/* Box del logo en Verde Esmeralda */}
           <img src={logo} alt="" />
          </Link>
        </NavbarBrand>

        {/* Menú Hamburguesa posicionado a la derecha en móvil */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden text-emerald-950"
        />
      </NavbarContent>

      {/* ENLACES DESKTOP: Color Emerald para el estado activo */}
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.path} isActive={location.pathname === item.path}>
            <Link 
              to={item.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                location.pathname === item.path ? "text-emerald-600" : "text-emerald-900/60 hover:text-emerald-600"
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* BOTÓN DE ACCESO (Opcional, podés dejarlo para tu Admin) */}
      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <Button 
            as={Link} 
            to="/admin" 
            variant="flat" 
            className="font-bold rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          >
            Panel Staff
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <NavbarMenu className="bg-white/95 backdrop-blur-xl pt-10 px-8 flex flex-col gap-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className={`w-full text-3xl font-black tracking-tighter ${
                location.pathname === item.path ? "text-emerald-600" : "text-emerald-950"
              }`}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        
        {/* Footer del Menú Móvil */}
        <div className="mt-10 pt-10 border-t border-emerald-100">
           <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">GENO PRINTS 3D</p>
           <p className="text-sm text-emerald-900/60 font-medium">Río Cuarto, Córdoba.</p>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarApp;