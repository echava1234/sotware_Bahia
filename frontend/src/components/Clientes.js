import React, { useEffect, useState } from "react";
import axios from "axios";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", email: "", telefono: "", notas: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/api/clientes").then((res) => setClientes(res.data));
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/clientes", nuevo);
    setNuevo({ nombre: "", email: "", telefono: "", notas: "" });
    const res = await axios.get("http://localhost:3001/api/clientes");
    setClientes(res.data);
  };

  return (
    <div>
      <h2>Clientes</h2>
      <form onSubmit={agregar}>
        <input placeholder="Nombre" required value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input placeholder="Email" required value={nuevo.email} onChange={e => setNuevo({ ...nuevo, email: e.target.value })} />
        <input placeholder="Teléfono" required value={nuevo.telefono} onChange={e => setNuevo({ ...nuevo, telefono: e.target.value })} />
        <input placeholder="Notas / Información adicional" value={nuevo.notas} onChange={e => setNuevo({ ...nuevo, notas: e.target.value })} />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {clientes.map((c) => (
          <li key={c.id}>
            <b>{c.nombre}</b> - {c.email} - {c.telefono} {c.notas ? ` | Notas: ${c.notas}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Clientes;
