import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await api.get("/api/users/profile/");

      setProfile(response.data);

      setFormData({
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        email: response.data.email || "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        "/api/users/profile/",
        formData
      );

      setProfile(response.data);

      alert("Profile updated successfully.");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Unable to update profile.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-center text-xl mt-10">
          Loading Profile...
        </h2>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-36"></div>

          <div className="px-8 pb-8">

            {/* Avatar */}
            <div className="-mt-16 flex flex-col md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-6">

                <div className="w-32 h-32 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center">

                  <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">

                    {profile.username.charAt(0).toUpperCase()}

                  </div>

                </div>

                <div>

                  <h1 className="text-3xl font-bold text-gray-800">

                    {profile.first_name || "User"}{" "}
                    {profile.last_name}

                  </h1>

                  <p className="text-gray-500 mt-1">

                    @{profile.username}

                  </p>

                </div>

              </div>

            </div>

            {/* Form */}

            <form
              onSubmit={updateProfile}
              className="grid md:grid-cols-2 gap-6 mt-10"
            >

              <div>

                <label className="block font-semibold mb-2">
                  Username
                </label>

                <input
                  value={profile.username}
                  disabled
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block font-semibold mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div className="md:col-span-2 flex justify-end">

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Profile;