import express from 'express';
import { agregarProducto, obtenerProductos, crearTablaProductos } from '../models/producto.js';

export const router = express.Router();

crearTablaProductos();

router.get('/', async (_req, res) => {
  res.json(await obtenerProductos());
});

router.post('/', async (req, res) => {
  await agregarProducto(req.body);
  res.status(201).json({ mensaje: 'Producto agregado' });
});
