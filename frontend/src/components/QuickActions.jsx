import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="flex gap-4 flex-wrap">

        <button
          onClick={() => navigate("/customers/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Customer
        </button>

        <button
          onClick={() => navigate("/leads/add")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Lead
        </button>

        <button
          onClick={() => navigate("/tasks/add")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          + Task
        </button>

      </div>

    </div>
  );
}

export default QuickActions;