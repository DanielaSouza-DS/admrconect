import { ChevronsRight, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { api, endpoints } from "../api/client";
import DataTable from "../components/DataTable";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { label, ORIGENS_VENDA } from "../data/options";
import { useApiData } from "../hooks/useApiData";

const initialForm = {
  clienteId: "",
  vendedorId: "",
  origemVenda: "LIGACAO",
};

export default function Pedidos() {
  const pedidos = useApiData(endpoints.pedidos);
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
      origemVenda: form.origemVenda,
      status: "EM_ANDAMENTO",
    };

    try {
      await api.post(endpoints.pedidos, body);
      setForm(initialForm);
      await pedidos.reload();
    } catch (err) {
      setFeedback(err.message);
    }
  }

  async function handleAdvance(id) {
    await api.put(`${endpoints.pedidos}/${id}/avancar-status`);
    await pedidos.reload();
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este pedido?")) return;
    await api.delete(`${endpoints.pedidos}/${id}`);
    await pedidos.reload();
  }

  return (
    <>
      <PageHeader title="Pedidos" subtitle="Registro de vendas e acompanhamento do status." />

      <section className="form-panel">
        <form onSubmit={handleSubmit} className="entity-form compact">
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
          <Field label="Origem">
            <select value={form.origemVenda} onChange={(event) => updateField("origemVenda", event.target.value)}>
              {ORIGENS_VENDA.map((origem) => (
                <option key={origem} value={origem}>{label(origem)}</option>
              ))}
            </select>
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
        loading={pedidos.loading || clientes.loading || usuarios.loading}
        error={pedidos.error || clientes.error || usuarios.error}
        empty={pedidos.data.length === 0}
      >
        <DataTable
          rows={pedidos.data}
          columns={[
            { key: "id", header: "ID" },
            { key: "cliente", header: "Cliente", render: (row) => row.cliente?.nome || "-" },
            { key: "vendedor", header: "Vendedor", render: (row) => row.vendedor?.nome || "-" },
            { key: "origemVenda", header: "Origem", render: (row) => label(row.origemVenda) },
            { key: "status", header: "Status", render: (row) => <span className="badge">{label(row.status)}</span> },
            {
              key: "acoes",
              header: "Acoes",
              render: (row) => (
                <div className="row-actions">
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => handleAdvance(row.id)}
                    disabled={row.status === "ENTREGUE"}
                    title="Avancar status"
                  >
                    <ChevronsRight size={17} />
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
