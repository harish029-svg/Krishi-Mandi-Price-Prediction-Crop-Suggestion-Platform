export default function StatCard({ data }) {
  const {
    title,
    value,
    unit,
    subtitle,
    icon: Icon,
    colorText,
    colorBg,
    colorBorder,
    iconBg,
  } = data;
  return (
    <div
      className={`p-5 rounded-2xl border ${colorBorder} ${colorBg} flex flex-col gap-3`}
    >
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-full ${iconBg} ${colorText} shadow-sm`}>
          <Icon className="text-lg" />
        </div>
        <span className={`text-sm font-semibold ${colorText}`}>{title}</span>
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {unit && (
          <span className="text-sm font-medium text-gray-600">{unit}</span>
        )}
      </div>
      <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
    </div>
  );
}
