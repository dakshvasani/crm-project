function DashboardCards({ title, value, color }) {
  return (
    <div className={`${color} text-white rounded-xl shadow-lg p-6`}>
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCards;