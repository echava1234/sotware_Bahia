import React, { useState } from "react";
import axios from "axios";
import "../style.css";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", form);
      onLogin(res.data);
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="app-container">
      <h2>Edificio Bahía A</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button className="button-primary" type="submit">Ingresar</button>
      </form>
      {error && <div className="alert">{error}</div>}
    </div>
  );
}
