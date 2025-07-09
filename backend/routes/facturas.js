import express from 'express';
import { agregarFactura, obtenerFacturas, crearTablaFacturas } from '../models/factura.js';

export const router = express.Router();

crearTablaFacturas();

router.get('/', async (_req, res) => {
  res.json(await obtenerFacturas());
});

router.post('/', async (req, res) => {
  const id = await agregarFactura(req.body);
  res.status(201).json({ mensaje: 'Factura creada', id });
});
