// Siempre apuntamos al backend en desarrollo
const API_URL = 'http://localhost:5000/api/productos';

export async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetchProducts:', err);
    throw new Error('No se pudo cargar el catálogo');
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetchProductById:', err);
    throw err;
  }
}

export async function createProduct(product) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    // Leer el texto de error del backend para depuración
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error createProduct backend:', errorText);
      throw new Error(`HTTP ${res.status} - ${errorText}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Error createProduct:', err);
    throw err;
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Error deleteProduct:', err);
    throw err;
  }
}
