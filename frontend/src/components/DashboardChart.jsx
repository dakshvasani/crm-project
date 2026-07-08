import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DashboardChart({ stats }) {
  const data = [
    {
      name: "Customers",
      value: stats.customers,
    },
    {
      name: "Leads",
      value: stats.leads,
    },
    {
      name: "Tasks",
      value: stats.tasks,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        CRM Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default DashboardChart;