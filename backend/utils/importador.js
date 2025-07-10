const csv = require('csv-parser');
const fs = require('fs');
const Residente = require('../models/Residente');
const Factura = require('../models/Factura');

function importarDesdeCSV(path, cb) {
  const residentes = {};
  const facturas = [];
  let nextFacturaId = 1;

  fs.createReadStream(path)
    .pipe(csv())
    .on('data', (row) => {
      const rid = row.residente_id;
      if (!residentes[rid]) {
        residentes[rid] = new Residente(
          rid,
          row.nombre,
          row.depto,
          row.email,
          row.password
        );
      }
      facturas.push(
        new Factura(
          nextFacturaId++,
          rid,
          row.fecha_factura,
          parseFloat(row.monto_factura),
          row.estado_factura
        )
      );
    })
    .on('end', () => {
      fs.writeFileSync('data/residentes.json', JSON.stringify(Object.values(residentes), null, 2));
      fs.writeFileSync('data/facturas.json', JSON.stringify(facturas, null, 2));
      cb(null, { residentes: Object.values(residentes).length, facturas: facturas.length });
    });
}

module.exports = { importarDesdeCSV };
