import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function AddCustomer() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/customers/", customer);

      toast.success("Customer Added Successfully!");

      navigate("/customers");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add customer.");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Add Customer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={customer.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={customer.company}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Customer
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default AddCustomer;