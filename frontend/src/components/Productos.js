import React, { useEffect, useState } from "react";
import axios from "axios";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", precio: "", descripcion: "", notas: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/api/productos").then((res) => setProductos(res.data));
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/productos", { ...nuevo, precio: parseFloat(nuevo.precio) });
    setNuevo({ nombre: "", precio: "", descripcion: "", notas: "" });
    const res = await axios.get("http://localhost:3001/api/productos");
    setProductos(res.data);
  };

  return (
    <div>
      <h2>Productos</h2>
      <form onSubmit={agregar}>
        <input placeholder="Nombre" required value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input placeholder="Precio" required type="number" value={nuevo.precio} onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} />
        <input placeholder="Descripción" value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} />
        <input placeholder="Notas / Información adicional" value={nuevo.notas} onChange={e => setNuevo({ ...nuevo, notas: e.target.value })} />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <b>{p.nombre}</b> - ${p.precio} - {p.descripcion} {p.notas ? ` | Notas: ${p.notas}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Productos;
