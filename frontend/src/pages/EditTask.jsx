import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const response = await api.get(`/api/tasks/${id}/`);
      setTask(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/tasks/${id}/`, task);

      toast.success("Task Updated Successfully!");

      navigate("/tasks");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to update task.");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
          />

          <input
            type="date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Update Task
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default EditTask;