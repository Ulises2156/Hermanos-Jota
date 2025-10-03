import React from 'react'

export default function ProductCard({ producto, onClick }) {
  return (
    <article className="product-card" role="button" tabIndex={0}
      onClick={() => onClick?.(producto)}
      onKeyDown={(e)=>{ if(e.key==='Enter') onClick?.(producto) }}>
      <img src={producto.imagen} alt={producto.nombre} />
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        {producto.precio != null && <div className="price">${producto.precio}</div>}
        <a className="details-link" href="#detalle">Ver detalle</a>
      </div>
    </article>
  )
}

