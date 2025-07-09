import { openDb } from '../db.js';

export async function crearTablaClientes() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT,
    telefono TEXT
  )`);
}

export async function agregarCliente(cliente) {
  const db = await openDb();
  const { nombre, email, telefono } = cliente;
  await db.run('INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)', [nombre, email, telefono]);
}

export async function obtenerClientes() {
  const db = await openDb();
  return db.all('SELECT * FROM clientes');
}
