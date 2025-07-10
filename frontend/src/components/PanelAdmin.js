import React, { useState } from "react";
import axios from "axios";
import "../style.css";

export default function PanelAdmin({ onLogout }) {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleFile = e => setArchivo(e.target.files[0]);

  const handleImport = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (!archivo) return setMensaje("Selecciona un archivo CSV.");
    const formData = new FormData();
    formData.append("archivo", archivo);
    try {
      const res = await axios.post("http://localhost:3001/api/admin/importar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMensaje(`Importación exitosa: ${res.data.importados.residentes} residentes, ${res.data.importados.facturas} facturas.`);
    } catch (err) {
      setMensaje("Error importando archivo.");
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2>Panel Administración Bahía A</h2>
        <button className="logout" onClick={onLogout}>Cerrar sesión</button>
      </div>
      <div className="admin-import">
        <h3>Actualizar información residentes y facturas</h3>
        <form onSubmit={handleImport}>
          <input type="file" accept=".csv" onChange={handleFile} />
          <button className="button-primary" type="submit">Importar archivo</button>
        </form>
        {mensaje && <div className="alert">{mensaje}</div>}
        <div style={{marginTop: "12px"}}>
          <strong>Formato ejemplo:</strong>
          <pre>
residente_id,nombre,depto,email,password,fecha_factura,monto_factura,estado_factura
1,Ana Pérez,A101,ana@correo.com,clave123,2025-07-01,1200,pendiente
1,Ana Pérez,A101,ana@correo.com,clave123,2025-06-01,1200,pagada
2,Carlos Ruiz,A102,carlos@correo.com,clave456,2025-07-01,1200,pendiente
          </pre>
        </div>
      </div>
    </div>
  );
}
