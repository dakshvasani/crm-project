import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
  });

  useEffect(() => {
    getLead();
  }, []);

  const getLead = async () => {
    try {
      const response = await api.get(`/api/leads/${id}/`);
      setLead(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/leads/${id}/`, lead);

      toast.success("Lead Updated Successfully!");

      navigate("/leads");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to update lead.");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Lead
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={lead.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={lead.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={lead.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="source"
            placeholder="Lead Source"
            value={lead.source}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="status"
            value={lead.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>

          <button
            type="submit"
            className="bg-yellow-500 text-white px-5 py-3 rounded-lg hover:bg-yellow-600"
          >
            Update Lead
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default EditLead;