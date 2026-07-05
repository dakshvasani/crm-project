import Layout from "../components/Layout";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Cards
      </h1>

      <DashboardCards />
    </Layout>
  );
}

export default Dashboard;