import express from 'express';
import { agregarTransaccion, obtenerTransacciones, crearTablaTransacciones } from '../models/transaccion.js';

export const router = express.Router();

crearTablaTransacciones();

router.get('/', async (_req, res) => {
  res.json(await obtenerTransacciones());
});

router.post('/', async (req, res) => {
  await agregarTransaccion(req.body);
  res.status(201).json({ mensaje: 'Transacción registrada' });
});
