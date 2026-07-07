function DashboardCards({ dashboard }) {
  const cards = [
    {
      title: "Customers",
      value: dashboard.customers,
      color: "bg-blue-500",
    },
    {
      title: "Active Customers",
      value: dashboard.active_customers,
      color: "bg-green-500",
    },
    {
      title: "Inactive Customers",
      value: dashboard.inactive_customers,
      color: "bg-red-500",
    },
    {
      title: "Leads",
      value: dashboard.leads,
      color: "bg-purple-500",
    },
    {
      title: "New Leads",
      value: dashboard.new_leads,
      color: "bg-yellow-500",
    },
    {
      title: "Tasks",
      value: dashboard.tasks,
      color: "bg-indigo-500",
    },
    {
      title: "Pending Tasks",
      value: dashboard.pending_tasks,
      color: "bg-orange-500",
    },
    {
      title: "Completed Tasks",
      value: dashboard.completed_tasks,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white rounded-xl shadow-lg p-6 hover:scale-105 transition duration-300`}
        >
          <h2 className="text-lg font-medium">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;