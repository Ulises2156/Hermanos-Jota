import React, { useState } from "react";

const INITIAL = { nombre: "", email: "", mensaje: "" };

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | ok | fail

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const e = {};
    const { nombre, email, mensaje } = values;

    if (!nombre.trim()) e.nombre = "El nombre es obligatorio.";
    else if (nombre.trim().length < 2 || nombre.trim().length > 60)
      e.nombre = "Debe tener entre 2 y 60 caracteres.";

    if (!email.trim()) e.email = "El email es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Usá un correo válido (ej: nombre@gmail.com).";

    if (!mensaje.trim()) e.mensaje = "El mensaje es obligatorio.";
    else if (mensaje.trim().length < 10 || mensaje.trim().length > 1000)
      e.mensaje = "Mínimo 10 caracteres. Máximo 1000.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      setStatus("sending");
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setValues(INITIAL);
      setErrors({});
    } catch {
      setStatus("fail");
    }
  };

  return (
    <section className="contact-card">
      <p className="cf-hint">
        Los campos marcados con <strong>*</strong> son obligatorios. Por favor
        rellene todos los datos necesitados
      </p>

      <form onSubmit={onSubmit} noValidate>
        {/* Nombre */}
        <div className="cf-row">
          <label htmlFor="nombre">Nombre <span>*</span></label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre completo por favor"
            value={values.nombre}
            onChange={onChange}
            className={errors.nombre ? "cf-input error" : "cf-input"}
            aria-invalid={!!errors.nombre}
          />
          <small className="cf-help">Entre 2 y 60 caracteres.</small>
          {errors.nombre && <div className="cf-error">{errors.nombre}</div>}
        </div>

        {/* Email */}
        <div className="cf-row">
          <label htmlFor="email">Email <span>*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ingrese su correo"
            value={values.email}
            onChange={onChange}
            className={errors.email ? "cf-input error" : "cf-input"}
            aria-invalid={!!errors.email}
          />
          <small className="cf-help">
            Usá un correo válido (ej: nombre@gmail.com)
          </small>
          {errors.email && <div className="cf-error">{errors.email}</div>}
        </div>

        {/* Mensaje */}
        <div className="cf-row">
          <label htmlFor="mensaje">Mensaje<span>*</span></label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={6}
            placeholder="Contanos en qué te podemos ayudarte"
            value={values.mensaje}
            onChange={onChange}
            className={errors.mensaje ? "cf-textarea error" : "cf-textarea"}
            aria-invalid={!!errors.mensaje}
          />
          <small className="cf-help">Mínimo 10 caracteres. Máximo 1000.</small>
          {errors.mensaje && <div className="cf-error">{errors.mensaje}</div>}
        </div>

        <button className="cf-button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar"}
        </button>

        {status === "ok" && <p className="cf-ok">¡Gracias! Te responderemos a la brevedad.</p>}
        {status === "fail" && <p className="cf-fail">No pudimos enviar el mensaje. Probá de nuevo.</p>}
      </form>
    </section>
  );
}
