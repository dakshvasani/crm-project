import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        {/* Top Navbar */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-700">
            CRM Dashboard
          </h1>

          <div className="flex items-center gap-4">

            <SearchBar />

            <NotificationBell />

            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>

          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;