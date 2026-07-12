const departments = [
  { name: "IT", head: "Ananya Sharma", status: "Active" },
  { name: "Operations", head: "Priya Patel", status: "Active" },
  { name: "Facilities", head: "Raj Singh", status: "Active" },
];

export default function Departments() {
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
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            New department
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((dept) => (
          <div key={dept.name} className="card-surface p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {dept.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">Head: {dept.head}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                {dept.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
