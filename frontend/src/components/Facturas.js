import React, { useEffect, useState } from "react";
import axios from "axios";

function Facturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/facturas").then((res) => setFacturas(res.data));
  }, []);

  return (
    <div>
      <h2>Facturas</h2>
      <ul>
        {facturas.map((f) => (
          <li key={f.id}>
            <b>Factura #{f.id}</b> - Cliente: {f.cliente} - Fecha: {f.fecha}<br />
            Total: ${f.total}
            <ul>
              {f.items.map(item =>
                <li key={item.id}>{item.producto} x {item.cantidad} = ${item.subtotal}</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Facturas;
