const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const residentes = JSON.parse(fs.readFileSync('data/residentes.json', 'utf8'));
  res.json(residentes);
});

module.exports = router;
