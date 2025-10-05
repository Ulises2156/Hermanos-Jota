import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import { fetchProducts } from './api/products'
import HeroBanner from "./components/HeroBanner"
import ContactForm from "./components/ContactForm";

export default function App() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchProducts();
        if (mounted) setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        if (mounted) {
          setError("No se pudo cargar el catalogo");
          // cargamos producto de ejemplo para pruebas locales
          setProductos([
            {
              id: 1,
              nombre: "Producto de ejemplo",
              precio: 100,
              imagen: "https://via.placeholder.com/200",
              descripcion: "Este es un producto de prueba de catalogo",
            },
            {
              id: 2,
              nombre: "Segundo producto",
              precio: 150,
              imagen: "https://via.placeholder.com/200",
              descripcion: "Otro producto para probar catalogo.",
            }
          ]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSelect = (producto) => setSelectedProduct(producto);
  const handleAddToCart = () => setCartCount((c) => c + 1);
  const handleBackToList = () => setSelectedProduct(null);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <HeroBanner />
      <div className="band" />

      <main className="main">
        <section id="catalogo" className="featured-products">
          <h2 className="section-title">Productos destacados</h2>

          {loading && <p>Cargando productos…</p>}

          {error && !loading && (
            <p role="alert" style={{ color: "red" }}>
              {error}
            </p>
          )}

          
          {!loading && (
            selectedProduct ? (
              <ProductDetail
                producto={selectedProduct}
                onAddToCart={handleAddToCart}
                onBack={handleBackToList}
              />
            ) : (
              <ProductList productos={productos} onSelect={handleSelect} />
            )
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
