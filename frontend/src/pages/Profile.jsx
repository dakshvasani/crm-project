import Layout from "../components/Layout";

function Profile() {
  const username = localStorage.getItem("username");

  return (
    <Layout>
      <div className="bg-white p-8 rounded-xl shadow max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Username</p>
            <p className="font-semibold text-lg">
              {username || "Admin"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-semibold text-lg">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;