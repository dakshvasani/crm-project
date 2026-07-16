import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;

    setQuery(value);

    if (!value.trim()) {
      setResults(null);
      return;
    }

    try {
      const response = await api.get(
        `/api/search/?q=${value}`
      );

      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="🔍 Search..."
        value={query}
        onChange={handleSearch}
        className="w-full border rounded-lg p-3"
      />

      {results && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">

          <div className="p-3 font-bold bg-gray-100">
            Customers
          </div>

          {results.customers.length ? (
            results.customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => navigate("/customers")}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold">
                  {customer.name}
                </div>

                <div className="text-sm text-gray-500">
                  {customer.email}
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              No Customers
            </div>
          )}

          <div className="p-3 font-bold bg-gray-100">
            Leads
          </div>

          {results.leads.length ? (
            results.leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => navigate("/leads")}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold">
                  {lead.name}
                </div>

                <div className="text-sm text-gray-500">
                  {lead.email}
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              No Leads
            </div>
          )}

          <div className="p-3 font-bold bg-gray-100">
            Tasks
          </div>

          {results.tasks.length ? (
            results.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate("/tasks")}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold">
                  {task.title}
                </div>

                <div className="text-sm text-gray-500">
                  {task.status}
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              No Tasks
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default SearchBar;