import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PanelResidente({ residente, onLogout }) {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/facturas/${residente.id}`)
      .then((res) => setFacturas(res.data));
  }, [residente.id]);

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <h2>Bienvenido, {residente.nombre}</h2>
          <div>Depto: {residente.depto} | Email: {residente.email}</div>
        </div>
        <button className="logout" onClick={onLogout}>Cerrar sesión</button>
      </div>
      <h3>Mis facturas</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map(f => (
            <tr key={f.id}>
              <td>{f.fecha}</td>
              <td>${f.monto}</td>
              <td>{f.estado === "pagada" ? "Pagada" : "Pendiente"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total pendiente: $
        {facturas.filter(f => f.estado === "pendiente").reduce((sum, f) => sum + f.monto, 0)}
      </h3>
    </div>
  );
}
