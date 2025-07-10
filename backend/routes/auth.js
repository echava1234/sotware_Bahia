const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const residentes = JSON.parse(fs.readFileSync('data/residentes.json', 'utf8'));
  const user = residentes.find(r => r.email === email && r.password === password);
  if (!user) return res.status(401).json({ error: 'Usuario o clave incorrectos' });
  res.json({ id: user.id, nombre: user.nombre, depto: user.depto, email: user.email });
});

module.exports = router;
