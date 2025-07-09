import { openDb } from '../db.js';

export async function crearTablaProductos() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    precio REAL,
    descripcion TEXT
  )`);
}

export async function agregarProducto(producto) {
  const db = await openDb();
  const { nombre, precio, descripcion } = producto;
  await db.run('INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)', [nombre, precio, descripcion]);
}

export async function obtenerProductos() {
  const db = await openDb();
  return db.all('SELECT * FROM productos');
}
