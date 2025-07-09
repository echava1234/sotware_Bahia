import { openDb } from '../db.js';

export async function crearTablaFacturas() {
  const db = await openDb();
  await db.exec(`CREATE TABLE IF NOT EXISTS facturas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    fecha TEXT,
    total REAL,
    FOREIGN KEY(cliente_id) REFERENCES clientes(id)
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS factura_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    factura_id INTEGER,
    producto_id INTEGER,
    cantidad INTEGER,
    subtotal REAL,
    FOREIGN KEY(factura_id) REFERENCES facturas(id),
    FOREIGN KEY(producto_id) REFERENCES productos(id)
  )`);
}

export async function agregarFactura({ cliente_id, fecha, items }) {
  const db = await openDb();
  let total = 0;
  for (const item of items) {
    total += item.precio * item.cantidad;
  }
  const { lastID: facturaId } = await db.run(
    'INSERT INTO facturas (cliente_id, fecha, total) VALUES (?, ?, ?)',
    [cliente_id, fecha, total]
  );
  for (const item of items) {
    await db.run(
      'INSERT INTO factura_items (factura_id, producto_id, cantidad, subtotal) VALUES (?, ?, ?, ?)',
      [facturaId, item.producto_id, item.cantidad, item.precio * item.cantidad]
    );
  }
  return facturaId;
}

export async function obtenerFacturas() {
  const db = await openDb();
  const facturas = await db.all(`
    SELECT f.*, c.nombre as cliente
    FROM facturas f
    LEFT JOIN clientes c ON f.cliente_id = c.id
    ORDER BY f.id DESC
  `);
  for (const factura of facturas) {
    factura.items = await db.all(
      `SELECT fi.*, p.nombre as producto FROM factura_items fi
       LEFT JOIN productos p ON fi.producto_id = p.id
       WHERE fi.factura_id = ?`, [factura.id]
    );
  }
  return facturas;
}
