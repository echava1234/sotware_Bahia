import { agregarCliente, crearTablaClientes } from './models/cliente.js';
import { agregarProducto, crearTablaProductos } from './models/producto.js';
import { agregarFactura, crearTablaFacturas } from './models/factura.js';
import { agregarTransaccion, crearTablaTransacciones } from './models/transaccion.js';

export async function inicializarDatos() {
  await crearTablaClientes();
  await crearTablaProductos();
  await crearTablaFacturas();
  await crearTablaTransacciones();

  // Clientes ficticios
  const clientes = [
    { nombre: 'Juan López', email: 'juan.lopez@ejemplo.com', telefono: '555-1234' },
    { nombre: 'Empresa ABC S.A.', email: 'contacto@abcsa.com', telefono: '555-5678' }
  ];
  for (const c of clientes) await agregarCliente(c);

  // Productos ficticios
  const productos = [
    { nombre: 'Servicio de Consultoría', precio: 1500, descripcion: 'Consultoría profesional por hora' },
    { nombre: 'Software Gestión', precio: 12000, descripcion: 'Licencia anual de software' },
    { nombre: 'Soporte Técnico', precio: 500, descripcion: 'Soporte remoto mensual' }
  ];
  for (const p of productos) await agregarProducto(p);

  // Facturas ficticias
  await agregarFactura({
    cliente_id: 1,
    fecha: '2025-07-01',
    items: [
      { producto_id: 1, cantidad: 4, precio: 1500 },
      { producto_id: 2, cantidad: 1, precio: 12000 }
    ]
  });
  await agregarFactura({
    cliente_id: 2,
    fecha: '2025-07-02',
    items: [
      { producto_id: 3, cantidad: 2, precio: 500 }
    ]
  });

  // Transacciones ficticias (ingresos/egresos)
  await agregarTransaccion({
    tipo: 'ingreso',
    descripcion: 'Pago factura #1',
    monto: 18000,
    fecha: '2025-07-03'
  });
  await agregarTransaccion({
    tipo: 'egreso',
    descripcion: 'Pago de salarios',
    monto: 7000,
    fecha: '2025-07-05'
  });
}
