import { openDb } from '../db.js';

export async function crearTablaTransacciones() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT, -- ingreso/egreso
    descripcion TEXT,
    monto REAL,
    fecha TEXT
  )`);
}

export async function agregarTransaccion(transaccion) {
  const db = await openDb();
  const { tipo, descripcion, monto, fecha } = transaccion;
  await db.run(
    'INSERT INTO transacciones (tipo, descripcion, monto, fecha) VALUES (?, ?, ?, ?)',
    [tipo, descripcion, monto, fecha]
  );
}

export async function obtenerTransacciones() {
  const db = await openDb();
  return db.all('SELECT * FROM transacciones ORDER BY fecha DESC');
}
