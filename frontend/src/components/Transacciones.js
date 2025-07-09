import React, { useEffect, useState } from "react";
import axios from "axios";

function Transacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [nuevo, setNuevo] = useState({ tipo: "ingreso", descripcion: "", monto: "", fecha: "", notas: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/api/transacciones").then(res => setTransacciones(res.data));
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/transacciones", { ...nuevo, monto: parseFloat(nuevo.monto) });
    setNuevo({ tipo: "ingreso", descripcion: "", monto: "", fecha: "", notas: "" });
    const res = await axios.get("http://localhost:3001/api/transacciones");
    setTransacciones(res.data);
  };

  return (
    <div>
      <h2>Transacciones</h2>
      <form onSubmit={agregar}>
        <select value={nuevo.tipo} onChange={e => setNuevo({ ...nuevo, tipo: e.target.value })}>
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        <input placeholder="Descripción" required value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} />
        <input placeholder="Monto" required type="number" value={nuevo.monto} onChange={e => setNuevo({ ...nuevo, monto: e.target.value })} />
        <input placeholder="Fecha" required type="date" value={nuevo.fecha} onChange={e => setNuevo({ ...nuevo, fecha: e.target.value })} />
        <input placeholder="Notas / Información adicional" value={nuevo.notas} onChange={e => setNuevo({ ...nuevo, notas: e.target.value })} />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {transacciones.map((t) => (
          <li key={t.id}>
            <b>{t.tipo.toUpperCase()}</b> - {t.descripcion} - ${t.monto} - {t.fecha} {t.notas ? ` | Notas: ${t.notas}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Transacciones;
