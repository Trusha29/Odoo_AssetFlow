const requests = [
  {
    id: "MR-011",
    asset: "Laptop AF-0001",
    priority: "High",
    status: "Pending Approval",
    requestedBy: "Ananya Sharma",
  },
  {
    id: "MR-019",
    asset: "Projector P1",
    priority: "Medium",
    status: "Approved",
    requestedBy: "Priya Patel",
  },
  {
    id: "MR-024",
    asset: "Vehicle V3",
    priority: "Low",
    status: "In Progress",
    requestedBy: "Raj Singh",
  },
];

export default function Maintenance() {
  return (
    <div className="space-y-8">
      <section className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Maintenance
            </h1>
            <p className="mt-2 text-slate-500">
              Track repair requests, approval workflow, and asset condition.
            </p>
          </div>
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Raise request
          </button>
        </div>
      </section>

      <section className="card-surface p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Active maintenance requests
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Review current requests and next actions.
            </p>
          </div>
          <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            3 requests
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {request.asset}
                  </p>
                  <p className="text-sm text-slate-600">
                    Requested by {request.requestedBy}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                    {request.priority}
                  </span>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
