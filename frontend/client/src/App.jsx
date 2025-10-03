import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import { fetchProducts } from './api/products'
import HeroBanner from "./components/HeroBanner"
import ContactForm from "./components/ContactForm";

export default function App(){
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(()=>{
    let mounted = true
    ;(async ()=>{
      try {
        const data = await fetchProducts()
        if (mounted) setProductos(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return ()=> { mounted = false }
  }, [])

  const handleSelect = () => setCartCount(c => c + 1)

 return (
  <>
    <Navbar cartCount={cartCount} />

    <HeroBanner />
    <div className="band" />

    <main className="main">
  <section id="catalogo" className="featured-products">
    <h2 className="section-title">Productos destacados</h2>
    {loading && <p>Cargando productos…</p>}
    {error && !loading && <p role="alert">Error al cargar los productos: {error}</p>}
    {!loading && !error && (
    <ProductList productos={productos} onSelect={()=>setCartCount(c=>c+1)} />
    )}
  </section>

    <section id="contacto" className="contact-section">
      <h2 className="contact-title">Contacto</h2>
      <p className="contact-intro">Escribinos y te respondemos en breve.</p>
      <ContactForm />
    </section>
    </main>

    <Footer />
  </>
);
}
