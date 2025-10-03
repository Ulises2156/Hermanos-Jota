export async function fetchProducts() {
  try {
    const res = await fetch('/api/productos')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    throw new Error('No se pudo cargar el catálogo')
  }
}
