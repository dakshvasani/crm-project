import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";
import { exportToExcel } from "../utils/exportToExcel";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const tasksPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await api.get("/api/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = filteredTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage)
  );

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/tasks/${id}/`);

      alert("Task Deleted Successfully!");

      setCurrentPage(1);
      getTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to delete task.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold animate-pulse">
            Loading Tasks...
          </div>
        </div>
      </Layout>
    );
  }

return (
  <Layout>
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Tasks
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/tasks/add")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </button>

        <button
          onClick={() =>
            exportToExcel(filteredTasks, "Tasks")
          }
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Export Excel
        </button>
      </div>
    </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        <input
          type="text"
          placeholder="Search Task..."
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
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      <div className="mb-4">
        <span className="text-gray-600">
          Total Tasks :
        </span>{" "}
        <span className="font-bold text-blue-600 text-lg">
          {filteredTasks.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b text-center hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">
                  {task.title}
                </td>

                <td className="max-w-xs truncate px-2">
                  {task.description}
                </td>

                <td>{task.due_date}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : task.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/tasks/edit/${task.id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredTasks.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-700">
                      No Tasks Found
                    </h2>

                    <p className="text-gray-500">
                      Try changing the search/filter or add a
                      new task.
                    </p>

                    <button
                      onClick={() =>
                        navigate("/tasks/add")
                      }
                      className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      + Add First Task
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
              {currentTasks.length}
            </span>{" "}
            of{" "}
            <span className="font-bold">
              {filteredTasks.length}
            </span>{" "}
            tasks
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

export default Tasks;            