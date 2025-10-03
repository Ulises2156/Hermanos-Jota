import React from "react";

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="topbar">
      <div className="logo-container">
        <img src="/img/logo.svg" alt="Hermanos Jota" />
      </div>

      <nav className="topnav">
        <a href="#catalogo">Productos</a>
        <a href="#contacto">Contacto</a>
        <div className="cart-icon-container" aria-label="Carrito">
          🛒 <span className="cart-counter">{cartCount}</span>
        </div>
      </nav>
    </header>
  );
}


