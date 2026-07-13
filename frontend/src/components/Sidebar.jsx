import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "Admin";

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    `block p-3 rounded-lg transition ${
      isActive
        ? "bg-blue-900 text-white"
        : "hover:bg-blue-600"
    }`;

  return (
    <div className="w-64 hidden md:flex flex-col bg-blue-700 text-white min-h-screen">

      {/* Profile Section */}
      <div className="p-6 border-b border-blue-600">
        <div className="w-16 h-16 rounded-full bg-white text-blue-700 flex items-center justify-center text-2xl font-bold mx-auto">
          {username.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-center mt-3 text-lg font-semibold">
          {username}
        </h2>

        <p className="text-center text-blue-200 text-sm">
          CRM Administrator
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-5 space-y-3">
        <NavLink to="/profile" className={menuClass}>
          👤 Profile
        </NavLink>

        <NavLink to="/dashboard" className={menuClass}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          👥 Customers
        </NavLink>

        <NavLink to="/leads" className={menuClass}>
          🎯 Leads
        </NavLink>

        <NavLink to="/tasks" className={menuClass}>
          ✅ Tasks
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-blue-600">
        <button
          onClick={logout}
          className="w-full p-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;