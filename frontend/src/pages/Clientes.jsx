import { Edit3, Save, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { api, endpoints } from "../api/client";
import DataTable from "../components/DataTable";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { useApiData } from "../hooks/useApiData";

const initialForm = {
  nome: "",
  telefone: "",
  empresa: "",
  freqRecompraDias: 30,
  classificacao: "",
  vendedorId: "",
};

export default function Clientes() {
  const clientes = useApiData(endpoints.clientes);
  const usuarios = useApiData(endpoints.usuarios);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState("");

  const vendedores = useMemo(() => usuarios.data.filter((usuario) => usuario.tipoUsuario === "VENDEDOR"), [usuarios.data]);
  const visibleClientes = clientes.data.filter((cliente) => cliente.nome?.toLowerCase().includes(search.toLowerCase()));

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    const body = {
      nome: form.nome,
      telefone: form.telefone,
      empresa: form.empresa,
      freqRecompraDias: Number(form.freqRecompraDias),
      classificacao: form.classificacao,
      vendedor: { id: Number(form.vendedorId) },
    };

    try {
      if (editing) {
        await api.put(`${endpoints.clientes}/${editing}`, body);
      } else {
        await api.post(endpoints.clientes, body);
      }
      setForm(initialForm);
      setEditing(null);
      await clientes.reload();
    } catch (err) {
      setFeedback(err.message);
    }
  }

  function handleEdit(cliente) {
    setEditing(cliente.id);
    setForm({
      nome: cliente.nome || "",
      telefone: cliente.telefone || "",
      empresa: cliente.empresa || "",
      freqRecompraDias: cliente.freqRecompraDias || 30,
      classificacao: cliente.classificacao || "",
      vendedorId: cliente.vendedor?.id || "",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este cliente?")) return;
    await api.delete(`${endpoints.clientes}/${id}`);
    await clientes.reload();
  }

  return (
    <>
      <PageHeader title="Clientes" subtitle="Carteira comercial com vendedor responsavel e frequencia de recompra." />

      <section className="form-panel">
        <form onSubmit={handleSubmit} className="entity-form">
          <Field label="Nome">
            <input value={form.nome} onChange={(event) => updateField("nome", event.target.value)} required />
          </Field>
          <Field label="Telefone">
            <input value={form.telefone} onChange={(event) => updateField("telefone", event.target.value)} required />
          </Field>
          <Field label="Empresa">
            <input value={form.empresa} onChange={(event) => updateField("empresa", event.target.value)} />
          </Field>
          <Field label="Recompra em dias">
            <input type="number" min="0" value={form.freqRecompraDias} onChange={(event) => updateField("freqRecompraDias", event.target.value)} />
          </Field>
          <Field label="Classificacao">
            <input value={form.classificacao} onChange={(event) => updateField("classificacao", event.target.value)} />
          </Field>
          <Field label="Vendedor">
            <select value={form.vendedorId} onChange={(event) => updateField("vendedorId", event.target.value)} required>
              <option value="">Selecione</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>{vendedor.nome}</option>
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

      <div className="toolbar">
        <Search size={18} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente" />
      </div>

      <StatusMessage loading={clientes.loading || usuarios.loading} error={clientes.error || usuarios.error} empty={visibleClientes.length === 0}>
        <DataTable
          rows={visibleClientes}
          columns={[
            { key: "nome", header: "Nome" },
            { key: "telefone", header: "Telefone" },
            { key: "empresa", header: "Empresa", render: (row) => row.empresa || "-" },
            { key: "vendedor", header: "Vendedor", render: (row) => row.vendedor?.nome || "-" },
            { key: "freqRecompraDias", header: "Recompra" },
            {
              key: "acoes",
              header: "Acoes",
              render: (row) => (
                <div className="row-actions">
                  <button className="icon-button" type="button" onClick={() => handleEdit(row)} title="Editar"><Edit3 size={17} /></button>
                  <button className="icon-button danger" type="button" onClick={() => handleDelete(row.id)} title="Excluir"><Trash2 size={17} /></button>
                </div>
              ),
            },
          ]}
        />
      </StatusMessage>
    </>
  );
}
