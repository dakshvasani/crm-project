import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Reports() {
  const [report, setReport] = useState(null);

  const getReport = useCallback(async () => {
  try {
    const response = await api.get("/api/reports/");
    setReport(response.data.summary);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}, []);

  useEffect(() => {
  getReport();
}, [getReport]);

  if (!report) {
    return (
      <Layout>
        <h2 className="text-center text-2xl mt-10">
          Loading Reports...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">
        Reports & Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Customers</h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {report.customers}
          </p>

          <div className="mt-5 text-sm">
            <p>✅ Active : {report.active_customers}</p>
            <p>❌ Inactive : {report.inactive_customers}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Leads</h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {report.leads}
          </p>

          <div className="mt-5 text-sm">
            <p>🆕 New : {report.new_leads}</p>
            <p>📞 Contacted : {report.contacted_leads}</p>
            <p>⭐ Qualified : {report.qualified_leads}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Tasks</h3>

          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {report.tasks}
          </p>

          <div className="mt-5 text-sm">
            <p>✅ Completed : {report.completed_tasks}</p>
            <p>⏳ Pending : {report.pending_tasks}</p>
            <p>🚀 In Progress : {report.in_progress_tasks}</p>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Reports;