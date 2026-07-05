import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const menuClass = ({ isActive }) =>
    `block p-2 rounded-lg ${
      isActive
        ? "bg-blue-900 text-white"
        : "hover:bg-blue-600"
    }`;

  return (
    <div className="w-64 hidden md:block bg-blue-700 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">CRM</h1>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={menuClass}>
          Dashboard
        </NavLink>

        <NavLink to="/customers" className={menuClass}>
          Customers
        </NavLink>
        

        <NavLink to="/leads" className={menuClass}>
          Leads
        </NavLink>

        <NavLink to="/tasks" className={menuClass}>
          Tasks
        </NavLink>

        <button
          onClick={logout}
          className="w-full text-left p-2 rounded-lg hover:bg-red-600 mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;