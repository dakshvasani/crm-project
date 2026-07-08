function RecentTasks({ tasks }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        Recent Tasks
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">
            <th className="text-left p-2">Title</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>

        </thead>

        <tbody>

          {tasks.slice(0, 5).map((task) => (
            <tr key={task.id} className="border-b">

              <td className="p-2">{task.title}</td>

              <td>{task.status}</td>

              <td>{task.due_date}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentTasks;