// routes de productos
import { Router } from "express";
import {readFile} from 'fs/promises';


const router = Router();

// Agregamos la función para cargar los datos de JSON
async function cargarDatos(){
    const data = await readFile('muebles.json', {encoding: 'utf-8'});
    return JSON.parse(data);
}

//GET para todos los productos
router.get('/', async(req, res, next) =>{
    try{
        const datos = await cargarDatos();
        res.json(datos);
    }catch(error){
        next(error); // para anticipar los errores
    }
});

// GET producto por ID ejemplo /api/productos/:id
router.get('/:id', async(req, res, next)=> {
    try{
        const datos = await cargarDatos();
        const id = parseInt(req.params.id);
        const producto = datos.find(p => p.id ===id);
        

    if (producto){
        res.json(producto);
    }else{
        res.status(404).json({mensaje:"Producto no encontrado"});
    }
    }catch(error){
        next(error);
    }
});


export default router