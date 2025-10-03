import React from "react";

export default function HeroBanner(){
  return (
    <section className="hero-banner">
      <div className="hero-overlay" />
      <div className="hero-center">
        <h1>Tradición y Diseño en Muebles de Madera</h1>
        <p>30 años de experiencia, calidad que se siente, diseño que perdura.</p>
        <a className="button" href="#catalogo">Explorar Catálogo</a>
      </div>
    </section>
  );
}
