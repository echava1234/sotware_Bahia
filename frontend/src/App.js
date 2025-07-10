import React, { useState } from "react";
import Login from "./components/Login";
import PanelResidente from "./components/PanelResidente";
import PanelAdmin from "./components/PanelAdmin";
import "./style.css";

export default function App() {
  const [user, setUser] = useState(null);

  // Si el email contiene "admin", es admin (puedes cambiar esto por un login real de admin)
  if (!user) return <Login onLogin={setUser} />;
  if (user.email === "admin@bahiaa.com") return <PanelAdmin onLogout={() => setUser(null)} />;
  return <PanelResidente residente={user} onLogout={() => setUser(null)} />;
}
