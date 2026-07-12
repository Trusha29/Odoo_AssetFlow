const alerts = [
  {
    message: "Asset AF-0114 return overdue",
    type: "Overdue",
    timestamp: "10 mins ago",
  },
  {
    message: "Booking request for Room B2 pending",
    type: "Booking",
    timestamp: "30 mins ago",
  },
  {
    message: "Maintenance request MR-024 approved",
    type: "Maintenance",
    timestamp: "1 hour ago",
  },
  {
    message: "Audit cycle AC-09 requires verification",
    type: "Audit",
    timestamp: "2 hours ago",
  },
];

export default function Notifications() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Notifications
            </h1>
            <p className="mt-2 text-slate-500">
              Track alerts, reminders, and workflow updates for AssetFlow.
            </p>
          </div>
          <button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200">
            Mark all read
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.message}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-slate-900">{alert.message}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {alert.type}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{alert.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
