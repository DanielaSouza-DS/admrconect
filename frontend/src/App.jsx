import { NavLink, Route, Routes } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  ContactRound,
  LogOut,
  LayoutDashboard,
  Moon,
  PhoneCall,
  Sun,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import Clientes from "./pages/Clientes.jsx";
import Produtos from "./pages/Produtos.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Ligacoes from "./pages/Ligacoes.jsx";
import Login from "./pages/Login.jsx";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/usuarios", label: "Usuarios", icon: UsersRound },
  { to: "/clientes", label: "Clientes", icon: ContactRound },
  { to: "/produtos", label: "Produtos", icon: Boxes },
  { to: "/pedidos", label: "Pedidos", icon: ClipboardList },
  { to: "/ligacoes", label: "Ligacoes", icon: PhoneCall },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("admr-session") === "active");
  const [theme, setTheme] = useState(() => localStorage.getItem("admr-theme") || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("admr-theme", theme);
  }, [theme]);

  function handleLogin() {
    localStorage.setItem("admr-session", "active");
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("admr-session");
    setIsAuthenticated(false);
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <BarChart3 size={24} />
          </div>
          <div>
            <strong>ADMR Conect</strong>
            <span>Pneus Continental</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-actions">
          <button className="sidebar-button" type="button" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === "dark" ? "Modo claro" : "Modo escuro"}</span>
          </button>
          <button className="sidebar-button logout" type="button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/ligacoes" element={<Ligacoes />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
