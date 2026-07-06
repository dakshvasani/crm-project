import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/tasks/", task);

      alert("Task Added Successfully!");

      navigate("/tasks");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to add task.");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Add Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
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
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Task
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default AddTask;