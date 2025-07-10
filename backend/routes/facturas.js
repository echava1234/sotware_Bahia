const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:residenteId', (req, res) => {
  const facturas = JSON.parse(fs.readFileSync('data/facturas.json', 'utf8'));
  const residentesFacturas = facturas.filter(f => f.residenteId == req.params.residenteId);
  res.json(residentesFacturas);
});

module.exports = router;
