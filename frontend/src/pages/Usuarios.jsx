import { Edit3, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { api, endpoints } from "../api/client";
import DataTable from "../components/DataTable";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { label, PERFIS } from "../data/options";
import { useApiData } from "../hooks/useApiData";

const initialForm = { nome: "", email: "", senha: "", tipoUsuario: "VENDEDOR" };

export default function Usuarios() {
  const { data, loading, error, reload } = useApiData(endpoints.usuarios);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [feedback, setFeedback] = useState("");

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    try {
      if (editing) {
        await api.put(`${endpoints.usuarios}/${editing}`, form);
      } else {
        await api.post(endpoints.usuarios, form);
      }
      setForm(initialForm);
      setEditing(null);
      await reload();
    } catch (err) {
      setFeedback(err.message);
    }
  }

  function handleEdit(usuario) {
    setEditing(usuario.id);
    setForm({
      nome: usuario.nome || "",
      email: usuario.email || "",
      senha: usuario.senha || "",
      tipoUsuario: usuario.tipoUsuario || "VENDEDOR",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este usuario?")) return;
    await api.delete(`${endpoints.usuarios}/${id}`);
    await reload();
  }

  return (
    <>
      <PageHeader title="Usuarios" subtitle="Equipe responsavel por vendas, gestao e estoque." />

      <section className="form-panel">
        <form onSubmit={handleSubmit} className="entity-form">
          <Field label="Nome">
            <input value={form.nome} onChange={(event) => updateField("nome", event.target.value)} required />
          </Field>
          <Field label="E-mail">
            <input type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
          </Field>
          <Field label="Senha">
            <input type="password" value={form.senha} onChange={(event) => updateField("senha", event.target.value)} required={!editing} />
          </Field>
          <Field label="Perfil">
            <select value={form.tipoUsuario} onChange={(event) => updateField("tipoUsuario", event.target.value)}>
              {PERFIS.map((perfil) => (
                <option key={perfil} value={perfil}>{label(perfil)}</option>
              ))}
            </select>
          </Field>
          <div className="form-actions">
            {editing && (
              <button type="button" className="button secondary" onClick={() => { setEditing(null); setForm(initialForm); }}>
                <X size={18} /> Cancelar
              </button>
            )}
            <button className="button primary" type="submit">
              <Save size={18} /> {editing ? "Salvar" : "Cadastrar"}
            </button>
          </div>
        </form>
        {feedback && <div className="inline-error">{feedback}</div>}
      </section>

      <StatusMessage loading={loading} error={error} empty={data.length === 0}>
        <DataTable
          rows={data}
          columns={[
            { key: "nome", header: "Nome" },
            { key: "email", header: "E-mail" },
            { key: "tipoUsuario", header: "Perfil", render: (row) => label(row.tipoUsuario) },
            { key: "ativo", header: "Ativo", render: (row) => (row.ativo ? "Sim" : "Nao") },
            {
              key: "acoes",
              header: "Acoes",
              render: (row) => (
                <div className="row-actions">
                  <button className="icon-button" type="button" onClick={() => handleEdit(row)} title="Editar">
                    <Edit3 size={17} />
                  </button>
                  <button className="icon-button danger" type="button" onClick={() => handleDelete(row.id)} title="Excluir">
                    <Trash2 size={17} />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </StatusMessage>
    </>
  );
}
