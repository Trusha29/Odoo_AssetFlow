import { useState } from "react";

const initialDepartments = [
  { id: 1, name: "IT", head: "Ananya Sharma", status: "Active" },
  { id: 2, name: "Operations", head: "Priya Patel", status: "Active" },
  { id: 3, name: "Facilities", head: "Raj Singh", status: "Active" },
];

export default function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [status, setStatus] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setHead("");
    setStatus("Active");
    setEditingId(null);
    setError("");
  };

  const handleSaveDepartment = (event) => {
    event.preventDefault();
    if (!name.trim() || !head.trim()) {
      setError("Please enter both department name and head.");
      return;
    }

    const payload = {
      id: editingId || Date.now(),
      name: name.trim(),
      head: head.trim(),
      status,
    };

    if (editingId) {
      setDepartments(
        departments.map((dept) => (dept.id === editingId ? payload : dept)),
      );
    } else {
      setDepartments([payload, ...departments]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditDepartment = (dept) => {
    setName(dept.name);
    setHead(dept.head);
    setStatus(dept.status);
    setEditingId(dept.id);
    setShowForm(true);
    setError("");
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
    if (editingId === id) {
      resetForm();
      setShowForm(false);
    }
  };

  const handleToggleStatus = (id) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? {
              ...dept,
              status: dept.status === "Active" ? "Inactive" : "Active",
            }
          : dept,
      ),
    );
  };

  const filteredDepartments = departments.filter((dept) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      dept.name.toLowerCase().includes(query) ||
      dept.head.toLowerCase().includes(query) ||
      dept.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8">
      <div className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Departments
            </h1>
            <p className="mt-2 text-slate-500">
              Manage department structure and heads.
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
            New department
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
          <label className="relative block text-sm font-medium text-slate-700">
            <span className="sr-only">Search departments</span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search departments…"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>

        {showForm ? (
          <form onSubmit={handleSaveDepartment} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Department name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Head
                <input
                  value={head}
                  onChange={(event) => setHead(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <div className="flex items-end gap-4">
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {editingId ? "Update" : "Save"}
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
            </div>
            {error ? (
              <p className="text-sm font-medium text-rose-600">{error}</p>
            ) : null}
          </form>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((dept) => (
            <div key={dept.id} className="card-surface p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {dept.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Head: {dept.head}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    dept.status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {dept.status}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleEditDepartment(dept)}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteDepartment(dept.id)}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(dept.id)}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Toggle status
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card-surface p-6 text-slate-600">
            No departments match your search.
          </div>
        )}
      </div>
    </div>
  );
}
