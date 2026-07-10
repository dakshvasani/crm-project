import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import { exportToExcel } from "../utils/exportToExcel";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const customersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await api.get("/api/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / customersPerPage)
  );

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/customers/${id}/`);

      alert("Customer Deleted Successfully!");

      getCustomers();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to delete customer.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-center text-xl mt-10">
          Loading Customers...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/customers/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Customer
            </button>

            <button
                onClick={() =>
                  exportToExcel(
                    filteredCustomers,
                    "Customers"
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Export Excel
            </button>
          </div>
      </div>



      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-4">

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-3 rounded-lg flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border p-3 rounded-lg md:w-56"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

      </div>

      <div className="mb-4 text-gray-600">
        Total Customers:{" "}
        <span className="font-bold text-blue-600">
          {filteredCustomers.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b text-center hover:bg-gray-50"
              >
                <td className="p-3">{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.company}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/customers/edit/${customer.id}`)
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  <div className="py-8">
                    <h2 className="text-xl font-semibold">
                      No Customers Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Try changing the search or filter, or add a new customer.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center gap-4 py-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold bg-gray-100 px-4 py-2 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Customers;