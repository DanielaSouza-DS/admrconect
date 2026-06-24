export default function StatusMessage({ loading, error, empty, children }) {
  if (loading) {
    return <div className="status-box">Carregando dados...</div>;
  }

  if (error) {
    return <div className="status-box error">{error}</div>;
  }

  if (empty) {
    return <div className="status-box">Nenhum registro encontrado.</div>;
  }

  return children;
}
