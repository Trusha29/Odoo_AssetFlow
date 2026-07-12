import { useState } from "react";

const departments = [
  { name: "IT", head: "Ananya Sharma", status: "Active" },
  { name: "Operations", head: "Priya Patel", status: "Active" },
  { name: "Facilities", head: "Raj Singh", status: "Inactive" },
];

const categories = [
  { name: "Electronics", fields: "Warranty, Brand, Color" },
  { name: "Furniture", fields: "Condition, Location" },
  { name: "Vehicles", fields: "Registration, Fuel Type" },
];

const employees = [
  {
    name: "Ananya Sharma",
    email: "ananya@example.com",
    department: "IT",
    role: "Employee",
  },
  {
    name: "Priya Patel",
    email: "priya@example.com",
    department: "Operations",
    role: "Department Head",
  },
  {
    name: "Raj Singh",
    email: "raj@example.com",
    department: "Facilities",
    role: "Asset Manager",
  },
];

export default function OrganizationSetup() {
  const [tab, setTab] = useState("departments");

  const sections = {
    departments: (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Department Management
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Create/edit departments, assign heads, and manage status.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((dept) => (
            <div
              key={dept.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {dept.name}
              </h3>
              <p className="mt-3 text-sm text-slate-600">Head: {dept.head}</p>
              <p className="mt-1 text-sm text-slate-600">
                Status: {dept.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    categories: (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Asset Category Management
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Define categories and optional custom fields for each type.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {category.name}
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Fields: {category.fields}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    employees: (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Employee Directory
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Promote employees to Department Head or Asset Manager from this
            screen.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employees.map((employee) => (
                <tr key={employee.email} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.role}</td>
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
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Create record
          </button>
        </div>
      </div>

      <div className="card-surface p-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setTab("departments")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === "departments" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Departments
          </button>
          <button
            type="button"
            onClick={() => setTab("categories")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === "categories" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Asset Categories
          </button>
          <button
            type="button"
            onClick={() => setTab("employees")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tab === "employees" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            Employee Directory
          </button>
        </div>

        <div className="mt-8">{sections[tab]}</div>
      </div>
    </div>
  );
}
