function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-gray-500">{title}</h3>

      <h1 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

export default StatCard;