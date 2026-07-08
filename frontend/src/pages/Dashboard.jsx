import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await api.get("/api/dashboard/");
      setDashboard(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (!dashboard) {
    return (
      <Layout>
        <h2 className="text-center text-xl mt-10">
          Loading Dashboard...
        </h2>
      </Layout>
    );
  }

  const colors = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Customers
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {dashboard.total_customers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Leads
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {dashboard.total_leads}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Tasks
          </h3>

          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {dashboard.total_tasks}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {/* Customer Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">
            Customer Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={dashboard.customer_chart}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {dashboard.customer_chart.map(
                  (item, index) => (
                    <Cell
                      key={index}
                      fill={colors[index]}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">
            Lead Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={dashboard.lead_chart}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-4">
            Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={dashboard.task_chart}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {dashboard.task_chart.map(
                  (item, index) => (
                    <Cell
                      key={index}
                      fill={colors[index]}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Customers + Leads */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Recent Customers
          </h2>

          {dashboard.recent_customers.map(
            (customer) => (
              <div
                key={customer.id}
                className="border-b py-3"
              >
                <p className="font-semibold">
                  {customer.name}
                </p>

                <p className="text-gray-500">
                  {customer.email}
                </p>

                <span className="text-sm text-blue-600">
                  {customer.status}
                </span>
              </div>
            )
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Recent Leads
          </h2>

          {dashboard.recent_leads.map(
            (lead) => (
              <div
                key={lead.id}
                className="border-b py-3"
              >
                <p className="font-semibold">
                  {lead.name}
                </p>

                <p className="text-gray-500">
                  {lead.email}
                </p>

                <span className="text-sm text-green-600">
                  {lead.status}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Upcoming Tasks
        </h2>

        {dashboard.upcoming_tasks.map(
          (task) => (
            <div
              key={task.id}
              className="border-b py-3"
            >
              <p className="font-semibold">
                {task.title}
              </p>

              <p className="text-gray-500">
                Due: {task.due_date}
              </p>

              <span className="text-sm text-blue-600">
                {task.status}
              </span>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;