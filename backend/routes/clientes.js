import express from 'express';
import { agregarCliente, obtenerClientes, crearTablaClientes } from '../models/cliente.js';

export const router = express.Router();

crearTablaClientes();

router.get('/', async (_req, res) => {
  res.json(await obtenerClientes());
});

router.post('/', async (req, res) => {
  await agregarCliente(req.body);
  res.status(201).json({ mensaje: 'Cliente agregado' });
});
