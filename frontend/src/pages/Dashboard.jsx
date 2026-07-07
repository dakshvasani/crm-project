import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
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

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <DashboardCards dashboard={dashboard} />
      {/* recent customers  */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              Recent Customers
            </h2>

            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recent_customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="p-2">{customer.name}</td>
                    <td className="p-2">{customer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* recent leads */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              Recent Leads
            </h2>

            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recent_leads.map((lead) => (
                  <tr key={lead.id} className="border-b">
                    <td className="p-2">{lead.name}</td>
                    <td className="p-2">{lead.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* recent tasks */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              Upcoming Tasks
            </h2>

            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-2">Title</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Due Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.upcoming_tasks.map((task) => (
                  <tr key={task.id} className="border-b">
                    <td className="p-2">{task.title}</td>
                    <td className="p-2">{task.status}</td>
                    <td className="p-2">{task.due_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>          
    </Layout>
  );
}

export default Dashboard;