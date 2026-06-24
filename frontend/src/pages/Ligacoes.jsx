import { Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { api, endpoints } from "../api/client";
import DataTable from "../components/DataTable";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { label, ORIGENS_VENDA, RESULTADOS_LIGACAO } from "../data/options";
import { useApiData } from "../hooks/useApiData";

const initialForm = {
  clienteId: "",
  vendedorId: "",
  resultado: "PEDIDO_REALIZADO",
  origem: "LIGACAO",
  observacao: "",
};

export default function Ligacoes() {
  const ligacoes = useApiData(endpoints.ligacoes);
  const clientes = useApiData(endpoints.clientes);
  const usuarios = useApiData(endpoints.usuarios);
  const [form, setForm] = useState(initialForm);
  const [feedback, setFeedback] = useState("");

  const vendedores = useMemo(() => usuarios.data.filter((usuario) => usuario.tipoUsuario === "VENDEDOR"), [usuarios.data]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    const body = {
      cliente: { id: Number(form.clienteId) },
      vendedor: { id: Number(form.vendedorId) },
      resultado: form.resultado,
      origem: form.origem,
      observacao: form.observacao,
    };

    try {
      await api.post(endpoints.ligacoes, body);
      setForm(initialForm);
      await ligacoes.reload();
    } catch (err) {
      setFeedback(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir esta ligacao?")) return;
    await api.delete(`${endpoints.ligacoes}/${id}`);
    await ligacoes.reload();
  }

  return (
    <>
      <PageHeader title="Ligacoes" subtitle="Historico de contatos feitos com clientes." />

      <section className="form-panel">
        <form onSubmit={handleSubmit} className="entity-form">
          <Field label="Cliente">
            <select value={form.clienteId} onChange={(event) => updateField("clienteId", event.target.value)} required>
              <option value="">Selecione</option>
              {clientes.data.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
          </Field>
          <Field label="Vendedor">
            <select value={form.vendedorId} onChange={(event) => updateField("vendedorId", event.target.value)} required>
              <option value="">Selecione</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>{vendedor.nome}</option>
              ))}
            </select>
          </Field>
          <Field label="Resultado">
            <select value={form.resultado} onChange={(event) => updateField("resultado", event.target.value)}>
              {RESULTADOS_LIGACAO.map((resultado) => (
                <option key={resultado} value={resultado}>{label(resultado)}</option>
              ))}
            </select>
          </Field>
          <Field label="Origem">
            <select value={form.origem} onChange={(event) => updateField("origem", event.target.value)}>
              {ORIGENS_VENDA.map((origem) => (
                <option key={origem} value={origem}>{label(origem)}</option>
              ))}
            </select>
          </Field>
          <Field label="Observacao">
            <textarea value={form.observacao} onChange={(event) => updateField("observacao", event.target.value)} rows="3" />
          </Field>
          <div className="form-actions">
            <button className="button primary" type="submit">
              <Save size={18} /> Cadastrar
            </button>
          </div>
        </form>
        {feedback && <div className="inline-error">{feedback}</div>}
      </section>

      <StatusMessage
        loading={ligacoes.loading || clientes.loading || usuarios.loading}
        error={ligacoes.error || clientes.error || usuarios.error}
        empty={ligacoes.data.length === 0}
      >
        <DataTable
          rows={ligacoes.data}
          columns={[
            { key: "cliente", header: "Cliente", render: (row) => row.cliente?.nome || "-" },
            { key: "vendedor", header: "Vendedor", render: (row) => row.vendedor?.nome || "-" },
            { key: "resultado", header: "Resultado", render: (row) => label(row.resultado) },
            { key: "origem", header: "Origem", render: (row) => label(row.origem) },
            { key: "observacao", header: "Observacao", render: (row) => row.observacao || "-" },
            {
              key: "acoes",
              header: "Acoes",
              render: (row) => (
                <div className="row-actions">
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
