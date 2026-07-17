import { useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Search() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const search = async () => {

    if (!query.trim()) return;

    try {

      const response = await api.get(
        `/api/dashboard/search/?q=${query}`
      );

      setResults(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Global Search
      </h1>

      <div className="flex gap-3">

        <input
          className="border rounded-lg p-3 flex-1"
          placeholder="Search customers, leads, tasks..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />

        <button
          onClick={search}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Search
        </button>

      </div>

    </Layout>
  );
}

export default Search;