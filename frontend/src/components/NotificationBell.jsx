import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import api from "../services/api";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getNotifications = async () => {
    try {
      const response = await api.get("/api/notifications/");
      setNotifications(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/notifications/${id}/`);
      getNotifications();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        <FaBell />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
          <h2 className="font-bold p-4 border-b">
            Notifications
          </h2>

          {notifications.length === 0 ? (
            <p className="p-4 text-gray-500">
              No notifications
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  item.is_read ? "" : "bg-blue-50"
                }`}
              >
                <p className="font-medium">
                  {item.message}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;