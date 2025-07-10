class Residente {
  constructor(id, nombre, depto, email, password) {
    this.id = id;
    this.nombre = nombre;
    this.depto = depto;
    this.email = email;
    this.password = password; // En producción, usa hash para seguridad
  }
}
module.exports = Residente;
