const express = require('express');
const multer = require('multer');
const { importarDesdeCSV } = require('../utils/importador');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/importar', upload.single('archivo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió archivo' });
  importarDesdeCSV(req.file.path, (err, info) => {
    if (err) return res.status(500).json({ error: 'Error importando datos' });
    res.json({ ok: true, importados: info });
  });
});

module.exports = router;
