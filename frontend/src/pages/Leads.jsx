import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getLeads();
  }, []);

  const getLeads = async () => {
    try {
      const response = await api.get("/api/leads/");
      setLeads(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/leads/${id}/`);

      alert("Lead Deleted Successfully!");

      getLeads();
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert("Failed to delete lead.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-center text-xl mt-10">
          Loading Leads...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leads</h1>

        <button
          onClick={() => navigate("/leads/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Lead
        </button>
      </div>

      <input
        type="text"
        placeholder="Search lead..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6"
      />

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b text-center"
              >
                <td className="p-3">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => navigate(`/leads/edit/${lead.id}`)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  <div className="py-8">
                    <h2 className="text-xl font-semibold">
                      No Leads Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Click "Add Lead" to create your first lead.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Leads;