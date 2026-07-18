import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await api.get("/api/dashboard/");
    
      setDashboard(response.data);
    
      // Add this line
      setActivities(response.data.recent_activity || []);
    
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

        <div
          onClick={() => navigate("/customers")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
        >
          <h3 className="text-gray-500">Customers</h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {dashboard.total_customers}
          </p>

          <p className="text-sm text-gray-400 mt-3">
            Click to manage customers →
          </p>
        </div>

        <div
          onClick={() => navigate("/leads")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
        >
          <h3 className="text-gray-500">Leads</h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {dashboard.total_leads}
          </p>

          <p className="text-sm text-gray-400 mt-3">
            Click to manage leads →
          </p>
        </div>

        <div
          onClick={() => navigate("/tasks")}
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
        >
          <h3 className="text-gray-500">Tasks</h3>

          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {dashboard.total_tasks}
          </p>

          <p className="text-sm text-gray-400 mt-3">
            Click to manage tasks →
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
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Recent Customers
          </h2>

          <button
            onClick={() => navigate("/customers")}
            className="text-blue-600 hover:underline"
          >
            View All
          </button>

        </div>

        {dashboard.recent_customers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => navigate(`/customers/edit/${customer.id}`)}
            className="border-b py-3 cursor-pointer hover:bg-gray-50 px-2 rounded transition"
          >
            <p className="font-semibold">{customer.name}</p>
        
            <p className="text-gray-500">
              {customer.email}
            </p>
        
            <span className="text-sm text-blue-600">
              {customer.status}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Recent Leads
          </h2>

          <button
            onClick={() => navigate("/leads")}
            className="text-green-600 hover:underline"
          >
            View All
          </button>

        </div>

        {dashboard.recent_leads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => navigate(`/leads/edit/${lead.id}`)}
            className="border-b py-3 cursor-pointer hover:bg-gray-50 px-2 rounded transition"
          >
            <p className="font-semibold">{lead.name}</p>
        
            <p className="text-gray-500">
              {lead.email}
            </p>
        
            <span className="text-sm text-green-600">
              {lead.status}
            </span>
          </div>
        ))}
      </div>


      {/* Upcoming Tasks */}
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Upcoming Tasks
          </h2>

          <button
            onClick={() => navigate("/tasks")}
            className="text-yellow-600 hover:underline"
          >
            View All
          </button>

        </div>

        {dashboard.upcoming_tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => navigate(`/tasks/edit/${task.id}`)}
            className="border-b py-3 cursor-pointer hover:bg-gray-50 px-2 rounded transition"
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
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border-b pb-3"
            >
              <p className="font-medium">
                {activity.message}
              </p>
          
              <p className="text-sm text-gray-500">
                {new Date(
                  activity.date
                ).toLocaleString()}
              </p>
            </div>
          ))}

          {activities.length === 0 && (
            <p className="text-gray-500">
              No recent activity.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;