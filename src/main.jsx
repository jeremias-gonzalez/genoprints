import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react" // Ya no importamos ToastProvider
import { Toaster } from 'sonner' // Usamos Sonner
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      {/* Sonner configurado para verse elegante y evitar bucles */}
      <Toaster richColors theme="dark" position="top-center" closeButton />
      
      <main className="light text-foreground bg-background">
        <App />
      </main>
    </HeroUIProvider>
  </React.StrictMode>,
)