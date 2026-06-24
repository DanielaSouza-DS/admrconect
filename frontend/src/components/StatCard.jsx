export default function StatCard({ icon: Icon, label, value, tone = "default" }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div className="stat-icon">{Icon && <Icon size={22} />}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
