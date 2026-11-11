function ActionCard({ data }) {
  const { title, subtitle, icon: Icon } = data;
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center gap-4 hover:shadow-md transition-all cursor-pointer">
      <div className="p-3.5 rounded-full bg-[#0d5c38] text-white text-2xl">
        <Icon />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}

export default ActionCard;
