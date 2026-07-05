function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg p-2 w-80"
      />

      <div className="flex items-center gap-4">
        <span>🔔</span>
        <span>👤 Admin</span>
      </div>
    </div>
  );
}

export default Navbar;