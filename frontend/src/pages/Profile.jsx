import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "Admin",
  });

  useEffect(() => {
    const username =
      localStorage.getItem("username") || "Admin";

    setUser({
      username,
      email: "admin@gmail.com",
      role: "Administrator",
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.username}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>

            <p className="text-blue-600 font-semibold">
              {user.role}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="border rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2">
              Username
            </h3>

            <p>{user.username}</p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2">
              Email
            </h3>

            <p>{user.email}</p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2">
              Role
            </h3>

            <p>{user.role}</p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2">
              Status
            </h3>

            <p className="text-green-600 font-semibold">
              Active
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;