import { ArrowRight, BarChart3, LockKeyhole, Mail, Moon, Sun, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Login({ onLogin, theme, onToggleTheme }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (mode === "login" || mode === "register") {
      onLogin();
      return;
    }
    setMode("login");
  }

  const title = {
    login: "Login",
    register: "Criar conta",
    forgot: "Recuperar senha",
  }[mode];

  const subtitle = {
    login: "Entre para gerenciar clientes, produtos e pedidos.",
    register: "Crie seu acesso para o painel ADMR Conect.",
    forgot: "Informe seu e-mail para receber as orientacoes.",
  }[mode];

  return (
    <main className="login-screen">
      <button className="theme-float" type="button" onClick={onToggleTheme}>
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
      </button>

      <section className="login-card" aria-label="Acesso ao sistema">
        <div className="login-brand">
          <div className="brand-mark">
            <BarChart3 size={26} />
          </div>
          <div>
            <strong>ADMR Conect</strong>
            <span>Pneus Continental</span>
          </div>
        </div>

        <div className="login-heading">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {mode === "register" && (
            <label className="login-field">
              <span>Nome</span>
              <div>
                <UserPlus size={17} />
                <input value={form.nome} onChange={(event) => updateField("nome", event.target.value)} required />
              </div>
            </label>
          )}

          <label className="login-field">
            <span>E-mail</span>
            <div>
              <Mail size={17} />
              <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
            </div>
          </label>

          {mode !== "forgot" && (
            <label className="login-field">
              <span>Senha</span>
              <div>
                <LockKeyhole size={17} />
                <input type="password" value={form.senha} onChange={(event) => updateField("senha", event.target.value)} required />
              </div>
            </label>
          )}

          {mode === "login" && (
            <div className="login-options">
              <button type="button" onClick={() => setMode("forgot")}>Esqueci minha senha</button>
              <label>
                <input type="checkbox" />
                Lembrar
              </label>
            </div>
          )}

          <button className="login-submit" type="submit">
            <span>{mode === "forgot" ? "Enviar" : "Entrar"}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-links">
          {mode !== "register" && <button type="button" onClick={() => setMode("register")}>Criar conta</button>}
          {mode !== "login" && <button type="button" onClick={() => setMode("login")}>Voltar ao login</button>}
        </div>
      </section>
    </main>
  );
}
