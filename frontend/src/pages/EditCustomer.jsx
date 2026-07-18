import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
  });

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    try {
      const response = await api.get(`/api/customers/${id}/`);
      setCustomer(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/customers/${id}/`, customer);

      toast.success("Customer Updated Successfully!");

      navigate("/customers");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Customer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="company"
            value={customer.company}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            Update Customer
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default EditCustomer;