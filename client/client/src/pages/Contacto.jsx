import React from 'react';
import ContactForm from '../components/ContactForm';

export default function Contacto() {
  return (
    <main id="main-content" className="main">
      <section className="contact-section">
        <h2 className="contact-title">Contactanos</h2>
        <p className="contact-intro">
          ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad.
        </p>
        <ContactForm />
        
        <div className="contact-info">
          <div className="info-item">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Dirección
            </h3>
            <p>Av. Principal 1234, CABA, Argentina</p>
          </div>
          <div className="info-item">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Teléfono
            </h3>
            <p>+54 11 1234-5678</p>
          </div>
          <div className="info-item">
            <h3>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </h3>
            <p>info@hermanosjota.com.ar</p>
          </div>
        </div>
      </section>
    </main>
  );
}

