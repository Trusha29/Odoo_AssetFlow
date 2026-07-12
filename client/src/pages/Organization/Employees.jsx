const employees = [
  {
    name: "Ananya Sharma",
    department: "IT",
    role: "Employee",
    status: "Active",
  },
  {
    name: "Priya Patel",
    department: "Operations",
    role: "Department Head",
    status: "Active",
  },
  {
    name: "Raj Singh",
    department: "Facilities",
    role: "Asset Manager",
    status: "Active",
  },
];

export default function Employees() {
  return (
    <div className="space-y-8">
      <div className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Employees</h1>
            <p className="mt-2 text-slate-500">
              View the employee directory and role assignments.
            </p>
          </div>
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Add employee
          </button>
        </div>
      </div>

      <div className="card-surface p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employees.map((employee) => (
                <tr key={employee.name} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
