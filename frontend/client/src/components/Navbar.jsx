import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <header className="topbar" role="banner">
        <Link 
          to="/" 
          className="logo-container"
          onClick={closeMenu}
          aria-label="Hermanos Jota - Ir al inicio"
        >
          <img src="/img/logo completo.png" alt="" className="logo-full" />
        </Link>

        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Menú de navegación"
          aria-controls="main-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav 
          id="main-nav"
          className={`topnav ${mobileMenuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Navegación principal"
        >
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''}
            onClick={closeMenu}
          >
            Inicio
          </Link>
          <Link 
            to="/catalogo" 
            className={isActive('/catalogo') ? 'active' : ''}
            onClick={closeMenu}
          >
            Catálogo
          </Link>
          <Link 
            to="/contacto" 
            className={isActive('/contacto') ? 'active' : ''}
            onClick={closeMenu}
          >
            Contacto
          </Link>
          <button 
            className="cart-button" 
            aria-label={`Carrito de compras, ${cartCount} productos`}
            disabled
            title="Carrito (próximamente)"
          >
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-counter" aria-label={`${cartCount} productos en el carrito`}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div 
            className="mobile-overlay" 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </header>
    </>
  );
}


