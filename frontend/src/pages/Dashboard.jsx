import { AlertTriangle, Boxes, ClipboardList, ContactRound, PhoneCall, UsersRound } from "lucide-react";
import { endpoints } from "../api/client";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import StatusMessage from "../components/StatusMessage";
import DataTable from "../components/DataTable";
import { label } from "../data/options";
import { useApiData } from "../hooks/useApiData";

export default function Dashboard() {
  const usuarios = useApiData(endpoints.usuarios);
  const clientes = useApiData(endpoints.clientes);
  const produtos = useApiData(endpoints.produtos);
  const estoqueBaixo = useApiData(endpoints.estoqueBaixo);
  const pedidos = useApiData(endpoints.pedidos);
  const ligacoes = useApiData(endpoints.ligacoes);

  const loading = [usuarios, clientes, produtos, estoqueBaixo, pedidos, ligacoes].some((item) => item.loading);
  const error = [usuarios, clientes, produtos, estoqueBaixo, pedidos, ligacoes].find((item) => item.error)?.error;

  const recentes = pedidos.data.slice(-5).reverse();

  return (
    <>
      <PageHeader title="Pneus Continental" subtitle="Resumo das operacoes comerciais, clientes, pedidos e estoque." />

      <StatusMessage loading={loading} error={error}>
        <section className="stats-grid">
          <StatCard icon={UsersRound} label="Usuarios" value={usuarios.data.length} />
          <StatCard icon={ContactRound} label="Clientes" value={clientes.data.length} />
          <StatCard icon={Boxes} label="Produtos" value={produtos.data.length} />
          <StatCard icon={AlertTriangle} label="Estoque baixo" value={estoqueBaixo.data.length} tone="warning" />
          <StatCard icon={ClipboardList} label="Pedidos" value={pedidos.data.length} />
          <StatCard icon={PhoneCall} label="Ligacoes" value={ligacoes.data.length} />
        </section>

        <section className="section-block">
          <div className="section-title">
            <h2>Pedidos recentes</h2>
          </div>
          <StatusMessage empty={recentes.length === 0}>
            <DataTable
              rows={recentes}
              columns={[
                { key: "id", header: "ID" },
                { key: "cliente", header: "Cliente", render: (row) => row.cliente?.nome || "-" },
                { key: "vendedor", header: "Vendedor", render: (row) => row.vendedor?.nome || "-" },
                { key: "origemVenda", header: "Origem", render: (row) => label(row.origemVenda) },
                { key: "status", header: "Status", render: (row) => <span className="badge">{label(row.status)}</span> },
              ]}
            />
          </StatusMessage>
        </section>
      </StatusMessage>
    </>
  );
}
