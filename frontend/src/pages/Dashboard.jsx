import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCards from "../components/DashboardCards";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    active_customers: 0,
    inactive_customers: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const response = await api.get("/api/customers/dashboard/");
      setStats(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <DashboardCards
          title="Total Customers"
          value={stats.customers}
          color="bg-blue-500"
        />

        <DashboardCards
          title="Active Customers"
          value={stats.active_customers}
          color="bg-green-500"
        />

        <DashboardCards
          title="Inactive Customers"
          value={stats.inactive_customers}
          color="bg-red-500"
        />

      </div>
    </Layout>
  );
}

export default Dashboard;