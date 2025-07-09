import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as clientesRouter } from './routes/clientes.js';
import { router as productosRouter } from './routes/productos.js';
import { router as facturasRouter } from './routes/facturas.js';
import { router as transaccionesRouter } from './routes/transacciones.js';
import { inicializarDatos } from './seed.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/clientes', clientesRouter);
app.use('/api/productos', productosRouter);
app.use('/api/facturas', facturasRouter);
app.use('/api/transacciones', transaccionesRouter);

const PORT = process.env.PORT || 3001;
inicializarDatos().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
