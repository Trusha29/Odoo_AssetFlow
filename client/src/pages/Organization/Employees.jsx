import { useMemo, useState } from "react";

const initialEmployees = [
  {
    id: 1,
    name: "Ananya Sharma",
    department: "IT",
    role: "Employee",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    department: "Operations",
    role: "Department Head",
    status: "Active",
  },
  {
    id: 3,
    name: "Raj Singh",
    department: "Facilities",
    role: "Asset Manager",
    status: "Active",
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const departments = useMemo(
    () => ["All", ...new Set(employees.map((item) => item.department))],
    [employees],
  );

  const roles = useMemo(
    () => ["All", ...new Set(employees.map((item) => item.role))],
    [employees],
  );

  const resetForm = () => {
    setName("");
    setDepartment("");
    setRole("");
    setStatus("Active");
    setEditingId(null);
    setError("");
    setMessage("");
  };

  const handleSaveEmployee = (event) => {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !department.trim() || !role.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      id: editingId || Date.now(),
      name: name.trim(),
      department: department.trim(),
      role: role.trim(),
      status,
    };

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId ? payload : employee,
        ),
      );
      setMessage("Employee updated successfully.");
    } else {
      setEmployees([payload, ...employees]);
      setMessage("Employee added successfully.");
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditEmployee = (employee) => {
    setName(employee.name);
    setDepartment(employee.department);
    setRole(employee.role);
    setStatus(employee.status);
    setEditingId(employee.id);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    if (editingId === id) {
      resetForm();
      setShowForm(false);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const query = search.trim().toLowerCase();
    const searchMatch =
      employee.name.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query) ||
      employee.role.toLowerCase().includes(query);

    const matchesDepartment =
      filterDepartment === "All" || employee.department === filterDepartment;
    const matchesRole = filterRole === "All" || employee.role === filterRole;
    const matchesStatus =
      filterStatus === "All" || employee.status === filterStatus;

    return searchMatch && matchesDepartment && matchesRole && matchesStatus;
  });

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
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setError("");
              if (!showForm) resetForm();
            }}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {editingId ? "Edit employee" : "Add employee"}
          </button>
        </div>
        {showForm ? (
          <form
            onSubmit={handleSaveEmployee}
            className="mt-8 space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Department
                <input
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Role
                <input
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                {editingId ? "Update employee" : "Save employee"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
            {error ? (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            ) : null}
            {message ? (
              <p className="text-sm font-medium text-emerald-700">{message}</p>
            ) : null}
          </form>
        ) : null}
      </div>

      <div className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Employee directory
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Search and filter employees by department, role, or status.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-4 sm:w-full">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees"
              className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <select
              value={filterDepartment}
              onChange={(event) => setFilterDepartment(event.target.value)}
              className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {departments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={filterRole}
              onChange={(event) => setFilterRole(event.target.value)}
              className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {roles.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              className="w-full min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEmployees.length ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">{employee.name}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.role}</td>
                    <td className="px-6 py-4">{employee.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditEmployee(employee)}
                          className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
