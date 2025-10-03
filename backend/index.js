// 1. Requerir modulos
import express from 'express';
import { readFile } from 'fs/promises'; // Para la versión asíncrona

// 2. Crear una instancia de la aplicación
const app = express();
 
// 3. Definir el puerto. Es una buena práctica usar una variable de entorno para producción.
const PORT = 4000;
 
// 4. Definir nuestra primera ruta (endpoint)
// Cuando un cliente haga una petición GET a la raíz ('/'), se ejecutará esta función.
app.get('/', (req, res) => {
  res.send('¡Bienvenido al API de Mueblería Jota!');
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido al API de Mueblería Jota!');
});
 
// GET para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const datos = await cargarDatos();
    res.json(datos);  // mejor usar .json() para enviar objetos
  } catch (error) {
    res.status(500).send('Error al obtener los datos');
  }
});

app.get('/api/productos/:id', async (req, res) => {
  try {
    const datos = await cargarDatos();
    
    const id = parseInt(req.params.id); // el :id viene como string, lo pasamos a número
    console.log(id);
    
    const producto = datos.find(p => p.id === id); // buscamos por id
    console.log(id,producto);
    

    if (producto) {
      res.json(producto);
    } else {
        console.log(id,producto)
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

 
// 5. Poner el servidor a escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});

// Middleware global: para los log de cada request

app.use((req, res, next) =>{
  console.log(`[${new Date().toDateString()}] ${req.method} ${req.url}`);
  next();
});

// Importo las rutas de productos
import productoRouter from './routes/productos.js';
app.use('/api/productos', productoRouter);


//Middleware 404 (si no se encuentra la ruta)
app.use((req, res)=>{
 res.status(404).json({mensaje: "Ruta no encontrada"}); 
});

//Middleware para centralizar errores
app.use((err, req, res, next) =>{
  console.log('Error interno:', err);
  res.status(500).json({mensaje: 'Error interno del servidor'});
});



async function cargarDatos() {
  try {
    const data = await readFile('muebles.json', { encoding: 'utf8' });
    const datos = JSON.parse(data);
    return datos;  
  } catch (error) {
    console.error('Error al leer o parsear el JSON:', error);
    throw error;
  }
}

