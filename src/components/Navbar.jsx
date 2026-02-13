import React from "react";
import logo from "../../public/iconogverdefondoblanco.png";
import { 
  Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, 
  NavbarMenu, NavbarMenuItem, Button, Badge, 
  Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure
} from "@heroui/react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

const NavbarApp = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart, removeFromCart, total } = useCart();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const location = useLocation();

  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/catalogo" },
    { label: "Servicios", path: "/servicios" },
  ];

  const handleCheckout = () => {
    const message = cart.map(item => `- ${item.titulo} (x${item.quantity})`).join('\n');
    const finalMsg = `Hola GENO PRINTS! Me gustaría encargar:\n${message}\n\nTotal estimado: $${total}`;
    // Reemplazá con tu número real de Río Cuarto
    const url = `https://wa.me/549358XXXXXXX?text=${encodeURIComponent(finalMsg)}`; 
    window.open(url, '_blank');
  };

  // Componente del botón del carrito (para reutilizar)
  const CartButton = () => (
    <Badge color="danger" content={cart.length} isInvisible={cart.length === 0} shape="circle" size="sm">
      <Button isIconOnly variant="light" onPress={onOpen} className="text-emerald-950 hover:bg-emerald-50 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </Button>
    </Badge>
  );

  return (
    <>
      <Navbar 
        onMenuOpenChange={setIsMenuOpen} 
        maxWidth="xl" 
        isBordered 
        position="sticky"
        className="bg-white/80 backdrop-blur-md h-20 font-sans"
      >
        {/* ================= VISTA MOBILE (3 Bloques separados) ================= */}
        
        {/* 1. IZQUIERDA MOBILE: Menú Hamburguesa */}
        <NavbarContent justify="start" className="basis-1/3 md:hidden">
          <NavbarMenuToggle 
            className="text-emerald-950" 
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          />
        </NavbarContent>

        {/* 2. CENTRO MOBILE: Solo el Logo */}
        <NavbarContent justify="center" className="basis-1/3 md:hidden">
          <NavbarBrand className="justify-center">
            <Link to="/">
              <img src={logo} alt="GENO PRINTS" className="h-14 w-auto object-contain transition-transform hover:scale-105" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* 3. DERECHA MOBILE: Solo el Carrito */}
        <NavbarContent justify="end" className="basis-1/3 md:hidden">
            <NavbarItem>
                <CartButton />
            </NavbarItem>
        </NavbarContent>


        {/* ================= VISTA DESKTOP (1 Bloque central unificado) ================= */}
        {/* Este bloque contiene TODO en desktop y se oculta en mobile */}
        <NavbarContent justify="center" className="hidden md:flex w-full gap-12">
          
          {/* LOGO DESKTOP */}
          <NavbarBrand className="flex-grow-0">
            <Link to="/">
              <img src={logo} alt="GENO PRINTS" className="md:h-14 w-auto object-contain transition-transform hover:scale-105" />
            </Link>
          </NavbarBrand>

          {/* LINKS DESKTOP */}
          <div className="flex gap-10 items-center">
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
          </div>

          {/* CARRITO DESKTOP (Con separador) */}
          <div className="flex items-center ml-4 border-l border-emerald-100 pl-8">
            <CartButton />
          </div>
        </NavbarContent>


        {/* MENÚ MÓVIL DESPLEGABLE */}
        <NavbarMenu className="bg-white/95 backdrop-blur-xl pt-10 px-8 flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                className={`w-full text-3xl font-black tracking-tighter transition-colors ${
                  location.pathname === item.path ? "text-emerald-600" : "text-emerald-950 hover:text-emerald-600"
                }`}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="mt-10 pt-10 border-t border-emerald-100">
             <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">GENO PRINTS 3D</p>
             <p className="text-sm text-emerald-900/60 font-medium">Río Cuarto, Córdoba.</p>
          </div>
        </NavbarMenu>
      </Navbar>

      {/* DRAWER DEL CARRITO */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right" className="font-sans bg-white">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-emerald-950 font-black text-2xl uppercase tracking-tighter">Tu Pedido 3D</DrawerHeader>
              <DrawerBody>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 italic text-center">Todavía no sumaste ninguna pieza.</p>
                  </div>
                ) : (
                  <div className="space-y-4 pt-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <div className="space-y-1">
                          <p className="font-bold text-emerald-950 text-sm">{item.titulo}</p>
                          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Cant: {item.quantity} • ${item.precio * item.quantity}</p>
                        </div>
                        <Button isIconOnly size="sm" variant="light" color="danger" className="rounded-full" onPress={() => removeFromCart(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </DrawerBody>
              <DrawerFooter className="flex flex-col border-t border-slate-100 pt-6">
                <div className="flex justify-between w-full mb-6 px-2">
                  <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">Total Estimado</span>
                  <span className="font-black text-2xl text-emerald-950">${total}</span>
                </div>
                <Button 
                  className="w-full bg-emerald-600 text-white font-black text-lg h-16 rounded-2xl shadow-xl shadow-emerald-900/20 active:scale-95 transition-all"
                  isDisabled={cart.length === 0}
                  onPress={handleCheckout}
                >
                  PEDIR POR WHATSAPP
                </Button>
                <Button variant="light" className="w-full font-bold text-slate-400 mt-2" onPress={onClose}>Cerrar</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarApp;