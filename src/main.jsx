import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react"
import { CartProvider } from './components/CartContext' // Importá el proveedor que creamos
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      {/* EL SECRETO: El CartProvider debe envolver a <App /> 
          para que el Navbar y todas las páginas tengan acceso.
      */}
      <CartProvider>
        <main className="light text-foreground bg-background">
          <App />
        </main>
      </CartProvider>
    </HeroUIProvider>
  </React.StrictMode>,
)