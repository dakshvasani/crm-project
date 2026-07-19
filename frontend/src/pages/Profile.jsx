import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await api.get("/api/accounts/profile/");
      setProfile(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  if (!profile) {
    return (
      <Layout>
        <h2 className="text-center mt-10 text-xl">
          Loading Profile...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {profile.first_name} {profile.last_name}
              </h1>

              <p className="text-gray-500">
                @{profile.username}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold">
                Username
              </label>

              <div className="mt-2 p-3 rounded bg-gray-100">
                {profile.username}
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Email
              </label>

              <div className="mt-2 p-3 rounded bg-gray-100">
                {profile.email}
              </div>
            </div>

            <div>
              <label className="font-semibold">
                First Name
              </label>

              <div className="mt-2 p-3 rounded bg-gray-100">
                {profile.first_name || "-"}
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Last Name
              </label>

              <div className="mt-2 p-3 rounded bg-gray-100">
                {profile.last_name || "-"}
              </div>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;