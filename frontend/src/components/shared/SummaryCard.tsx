interface SummaryCardProps {
  title: string;
  value: string;
}

export default function SummaryCard({
  title,
  value,
}: SummaryCardProps): JSX.Element {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body text-center">
        <h6 className="text-uppercase text-muted fw-semibold mb-2">{title}</h6>
        <h3 className="fw-bold text-primary">{value}</h3>
      </div>
    </div>
  );
}
