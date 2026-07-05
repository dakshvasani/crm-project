function DashboardCards() {
  const cards = [
    { title: "Customers", value: 0 },
    { title: "Leads", value: 0 },
    { title: "Tasks", value: 0 },
    { title: "Revenue", value: "$0" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-gray-500">{card.title}</h2>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;