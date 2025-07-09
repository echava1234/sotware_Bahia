import React, { useState } from "react";
import Clientes from "./components/Clientes";
import Productos from "./components/Productos";
import Facturas from "./components/Facturas";
import Transacciones from "./components/Transacciones";

function App() {
  const [vista, setVista] = useState("clientes");

  return (
    <div style={{ padding: 24 }}>
      <h1>Contabilidad y Facturación</h1>
      <nav>
        <button onClick={() => setVista("clientes")}>Clientes</button>
        <button onClick={() => setVista("productos")}>Productos</button>
        <button onClick={() => setVista("facturas")}>Facturas</button>
        <button onClick={() => setVista("transacciones")}>Transacciones</button>
      </nav>
      <div style={{ marginTop: 24 }}>
        {vista === "clientes" && <Clientes />}
        {vista === "productos" && <Productos />}
        {vista === "facturas" && <Facturas />}
        {vista === "transacciones" && <Transacciones />}
      </div>
    </div>
  );
}

export default App;
