import { Edit3, Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import { api, endpoints } from "../api/client";
import DataTable from "../components/DataTable";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { useApiData } from "../hooks/useApiData";

const initialForm = {
  nome: "",
  codigo: "",
  descricao: "",
  precoUnitario: "",
  quantidade: 0,
  alertaMinimo: 30,
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Produtos() {
  const { data, loading, error, reload } = useApiData(endpoints.produtos);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [feedback, setFeedback] = useState("");

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    const body = {
      ...form,
      precoUnitario: Number(form.precoUnitario),
      quantidade: Number(form.quantidade),
      alertaMinimo: Number(form.alertaMinimo),
    };

    try {
      if (editing) {
        await api.put(`${endpoints.produtos}/${editing}`, body);
      } else {
        await api.post(endpoints.produtos, body);
      }
      setForm(initialForm);
      setEditing(null);
      await reload();
    } catch (err) {
      setFeedback(err.message);
    }
  }

  function handleEdit(produto) {
    setEditing(produto.id);
    setForm({
      nome: produto.nome || "",
      codigo: produto.codigo || "",
      descricao: produto.descricao || "",
      precoUnitario: produto.precoUnitario || "",
      quantidade: produto.quantidade ?? 0,
      alertaMinimo: produto.alertaMinimo ?? 30,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este produto?")) return;
    await api.delete(`${endpoints.produtos}/${id}`);
    await reload();
  }

  return (
    <>
      <PageHeader title="Produtos" subtitle="Catalogo, precos e controle simples de estoque." />

      <section className="form-panel">
        <form onSubmit={handleSubmit} className="entity-form">
          <Field label="Nome">
            <input value={form.nome} onChange={(event) => updateField("nome", event.target.value)} required />
          </Field>
          <Field label="Codigo">
            <input value={form.codigo} onChange={(event) => updateField("codigo", event.target.value)} required disabled={Boolean(editing)} />
          </Field>
          <Field label="Preco unitario">
            <input type="number" min="0" step="0.01" value={form.precoUnitario} onChange={(event) => updateField("precoUnitario", event.target.value)} required />
          </Field>
          <Field label="Quantidade">
            <input type="number" min="0" value={form.quantidade} onChange={(event) => updateField("quantidade", event.target.value)} />
          </Field>
          <Field label="Alerta minimo">
            <input type="number" min="0" value={form.alertaMinimo} onChange={(event) => updateField("alertaMinimo", event.target.value)} />
          </Field>
          <Field label="Descricao">
            <textarea value={form.descricao} onChange={(event) => updateField("descricao", event.target.value)} rows="3" />
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
            { key: "codigo", header: "Codigo" },
            { key: "nome", header: "Produto" },
            { key: "precoUnitario", header: "Preco", render: (row) => currency.format(row.precoUnitario || 0) },
            { key: "quantidade", header: "Qtd." },
            { key: "alertaMinimo", header: "Minimo" },
            {
              key: "estoque",
              header: "Estoque",
              render: (row) => (
                <span className={`badge ${row.quantidade < row.alertaMinimo ? "danger" : "success"}`}>
                  {row.quantidade < row.alertaMinimo ? "Baixo" : "OK"}
                </span>
              ),
            },
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
