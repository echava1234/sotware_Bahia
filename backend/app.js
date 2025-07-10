const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const residentesRoutes = require('./routes/residentes');
const facturasRoutes = require('./routes/facturas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/residentes', residentesRoutes);
app.use('/api/facturas', facturasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend Bahía A corriendo en puerto ${PORT}`));
