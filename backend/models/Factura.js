class Factura {
  constructor(id, residenteId, fecha, monto, estado) {
    this.id = id;
    this.residenteId = residenteId;
    this.fecha = fecha;
    this.monto = monto;
    this.estado = estado; // "pendiente" o "pagada"
  }
}
module.exports = Factura;
