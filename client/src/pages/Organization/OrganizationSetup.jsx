import { useEffect, useState } from "react";

const initialDepartments = [
  { id: 1, name: "IT", head: "Ananya Sharma", status: "Active" },
  { id: 2, name: "Operations", head: "Priya Patel", status: "Active" },
  { id: 3, name: "Facilities", head: "Raj Singh", status: "Inactive" },
];

const initialCategories = [
  { id: 1, name: "Electronics", fields: "Warranty, Brand, Color" },
  { id: 2, name: "Furniture", fields: "Condition, Location" },
  { id: 3, name: "Vehicles", fields: "Registration, Fuel Type" },
];

const initialEmployees = [
  {
    id: 1,
    name: "Ananya Sharma",
    email: "ananya@example.com",
    department: "IT",
    role: "Employee",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    department: "Operations",
    role: "Department Head",
  },
  {
    id: 3,
    name: "Raj Singh",
    email: "raj@example.com",
    department: "Facilities",
    role: "Asset Manager",
  },
];

const recordTypes = [
  { id: "departments", label: "Department" },
  { id: "categories", label: "Asset Category" },
  { id: "employees", label: "Employee" },
];

const defaultForm = {
  name: "",
  head: "",
  status: "Active",
  fields: "",
  email: "",
  department: "IT",
  role: "Employee",
};

export default function OrganizationSetup() {
  const [tab, setTab] = useState("departments");
  const [departments, setDepartments] = useState(initialDepartments);
  const [categories, setCategories] = useState(initialCategories);
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordType, setRecordType] = useState("departments");
  const [formData, setFormData] = useState(defaultForm);
  const [editingRecord, setEditingRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) return;
    const timer = window.setTimeout(() => setSuccessMessage(""), 3000);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  const resetForm = () => {
    setFormData(defaultForm);
    setErrorMessage("");
  };

  const openModal = (type, record = null) => {
    setRecordType(type);
    setEditingRecord(record ? { type, id: record.id } : null);
    if (record) {
      setFormData({
        name: record.name || "",
        head: record.head || "",
        status: record.status || "Active",
        fields: record.fields || "",
        email: record.email || "",
        department: record.department || "IT",
        role: record.role || "Employee",
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    resetForm();
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required.");
      return false;
    }

    if (recordType === "departments") {
      if (!formData.head.trim()) {
        setErrorMessage("Department head is required.");
        return false;
      }
      if (!formData.status.trim()) {
        setErrorMessage("Status is required.");
        return false;
      }
    }

    if (recordType === "categories") {
      if (!formData.fields.trim()) {
        setErrorMessage("Fields description is required.");
        return false;
      }
    }

    if (recordType === "employees") {
      if (!formData.email.trim()) {
        setErrorMessage("Email is required.");
        return false;
      }
      if (!formData.department.trim()) {
        setErrorMessage("Department is required.");
        return false;
      }
      if (!formData.role.trim()) {
        setErrorMessage("Role is required.");
        return false;
      }
    }

    setErrorMessage("");
    return true;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = {
      id: editingRecord ? editingRecord.id : Date.now(),
      name: formData.name.trim(),
    };

    if (recordType === "departments") {
      payload.head = formData.head.trim();
      payload.status = formData.status;
      if (editingRecord) {
        setDepartments((current) =>
          current.map((item) =>
            item.id === editingRecord.id ? { ...item, ...payload } : item,
          ),
        );
        setSuccessMessage("Department updated successfully.");
      } else {
        setDepartments((current) => [{ ...payload }, ...current]);
        setSuccessMessage("Department created successfully.");
      }
    }

    if (recordType === "categories") {
      payload.fields = formData.fields.trim();
      if (editingRecord) {
        setCategories((current) =>
          current.map((item) =>
            item.id === editingRecord.id ? { ...item, ...payload } : item,
          ),
        );
        setSuccessMessage("Category updated successfully.");
      } else {
        setCategories((current) => [{ ...payload }, ...current]);
        setSuccessMessage("Category created successfully.");
      }
    }

    if (recordType === "employees") {
      payload.email = formData.email.trim();
      payload.department = formData.department.trim();
      payload.role = formData.role;
      if (editingRecord) {
        setEmployees((current) =>
          current.map((item) =>
            item.id === editingRecord.id ? { ...item, ...payload } : item,
          ),
        );
        setSuccessMessage("Employee updated successfully.");
      } else {
        setEmployees((current) => [{ ...payload }, ...current]);
        setSuccessMessage("Employee created successfully.");
      }
    }

    closeModal();
  };

  const handleDelete = (type, id) => {
    if (type === "departments") {
      setDepartments((current) => current.filter((item) => item.id !== id));
      setSuccessMessage("Department deleted successfully.");
      return;
    }
    if (type === "categories") {
      setCategories((current) => current.filter((item) => item.id !== id));
      setSuccessMessage("Category deleted successfully.");
      return;
    }
    if (type === "employees") {
      setEmployees((current) => current.filter((item) => item.id !== id));
      setSuccessMessage("Employee deleted successfully.");
    }
  };

  const sections = {
    departments: (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Department Management
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Create/edit departments, assign heads, and manage status.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {dept.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    Head: {dept.head}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Status: {dept.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openModal("departments", dept)}
                    className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete("departments", dept.id)}
                    className="rounded-2xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    categories: (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Asset Category Management
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Define categories and optional custom fields for each type.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    Fields: {category.fields}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openModal("categories", category)}
                    className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete("categories", category.id)}
                    className="rounded-2xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    employees: (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Employee Directory
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Promote employees to Department Head or Asset Manager from this
                screen.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openModal("employees", employee)}
                        className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete("employees", employee.id)}
                        className="rounded-2xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-8">
      <div className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Organization Setup
            </h1>
            <p className="mt-2 text-slate-500">
              Maintain master data for departments, categories, and employee
              roles.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal(tab)}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Create record
          </button>
        </div>
        {successMessage ? (
          <p className="mt-4 text-sm font-medium text-emerald-700">
            {successMessage}
          </p>
        ) : null}
      </div>

      <div className="card-surface p-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setTab("departments")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "departments"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Departments
          </button>
          <button
            type="button"
            onClick={() => setTab("categories")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "categories"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Asset Categories
          </button>
          <button
            type="button"
            onClick={() => setTab("employees")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "employees"
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Employee Directory
          </button>
        </div>

        <div className="mt-8">{sections[tab]}</div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {editingRecord ? "Edit Record" : "Create Record"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {editingRecord
                    ? "Update the selected record details."
                    : "Choose a type and provide required information."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {recordTypes.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setRecordType(option.id);
                    setErrorMessage("");
                    if (!editingRecord) resetForm();
                  }}
                  className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                    recordType === option.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Name
                  <input
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
                {recordType === "employees" ? (
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Email
                    <input
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                ) : null}
              </div>

              {recordType === "departments" ? (
                <div className="grid gap-5 sm:grid-cols-3">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Department Head
                    <input
                      value={formData.head}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          head: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Status
                    <select
                      value={formData.status}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </label>
                </div>
              ) : null}

              {recordType === "categories" ? (
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Category fields
                  <input
                    value={formData.fields}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        fields: event.target.value,
                      }))
                    }
                    placeholder="E.g. Warranty, Brand, Color"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
              ) : null}

              {recordType === "employees" ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Department
                    <input
                      value={formData.department}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          department: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-slate-700">
                    Role
                    <select
                      value={formData.role}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          role: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Employee">Employee</option>
                      <option value="Department Head">Department Head</option>
                      <option value="Asset Manager">Asset Manager</option>
                    </select>
                  </label>
                </div>
              ) : null}

              {errorMessage ? (
                <p className="text-sm font-medium text-rose-600">
                  {errorMessage}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {editingRecord ? "Save changes" : "Create record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
