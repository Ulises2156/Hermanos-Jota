import React from "react";

export default function ProductDetail({ producto, onAddToCart, onBack }) {
  if (!producto) return null;

  return (
    <div className="product-detail">
      <button className="cf-button" onClick={onBack}>
         Volver al catálogo
      </button>

      <div className="detail-content">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="detail-image"
        />
        <div className="detail-info">
          <h2>{producto.nombre}</h2>
          <p className="detail-description">{producto.descripcion}</p>
          <p className="detail-price">${producto.precio}</p>

          <button className="cf-button" onClick={onAddToCart}>
             Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
