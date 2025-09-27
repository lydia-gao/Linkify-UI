interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative";
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  subtitle,
}: StatsCardProps) {
  return (
    <div className="bg-white shadow rounded-md p-4">
      <p className="text-sm font-bold text-gray-800">{title}</p>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <span
            className={`text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            ↑ {change}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
}
