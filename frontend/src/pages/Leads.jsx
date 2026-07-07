import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const leadsPerPage = 5;

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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = (lead.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    const matchesSource =
      sourceFilter === "All" ||
      lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const sources = [
    "All",
    ...new Set(
      leads
        .map((lead) => lead.source)
        .filter(Boolean)
    ),
  ];

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const currentLeads = filteredLeads.slice(
    indexOfFirstLead,
    indexOfLastLead
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / leadsPerPage)
  );

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/leads/${id}/`);

      alert("Lead Deleted Successfully!");

      setCurrentPage(1);
      getLeads();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to delete lead.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold animate-pulse">
            Loading Leads...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Leads
        </h1>

        <button
          onClick={() => navigate("/leads/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

        <input
          type="text"
          placeholder="Search Lead..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-3"
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => {
            setSourceFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg p-3"
        >
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>

      </div>

      <div className="mb-4">
        <span className="text-gray-600">
          Total Leads :
        </span>{" "}
        <span className="font-bold text-blue-600 text-lg">
          {filteredLeads.length}
        </span>
      </div>

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
              {currentLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b text-center hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{lead.name}</td>

                <td>{lead.email}</td>

                <td>{lead.phone}</td>

                <td>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {lead.source}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      lead.status === "New"
                        ? "bg-yellow-100 text-yellow-700"
                        : lead.status === "Contacted"
                        ? "bg-blue-100 text-blue-700"
                        : lead.status === "Qualified"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/leads/edit/${lead.id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-700">
                      No Leads Found
                    </h2>

                    <p className="text-gray-500">
                      Try changing the search/filter or add a
                      new lead.
                    </p>

                    <button
                      onClick={() =>
                        navigate("/leads/add")
                      }
                      className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      + Add First Lead
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-5 border-t">

          <div className="text-gray-600">
            Showing{" "}
            <span className="font-bold">
              {currentLeads.length}
            </span>{" "}
            of{" "}
            <span className="font-bold">
              {filteredLeads.length}
            </span>{" "}
            leads
          </div>

          <div className="flex items-center gap-4">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
            >
              Previous
            </button>

            <span className="font-semibold bg-blue-100 text-blue-700 px-5 py-2 rounded-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Next
            </button>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Leads;