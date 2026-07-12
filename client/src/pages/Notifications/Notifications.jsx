import { useMemo, useState } from "react";

const initialAlerts = [
  {
    id: 1,
    message: "Asset AF-0114 return overdue",
    type: "Overdue",
    timestamp: "10 mins ago",
    read: false,
  },
  {
    id: 2,
    message: "Booking request for Room B2 pending",
    type: "Booking",
    timestamp: "30 mins ago",
    read: false,
  },
  {
    id: 3,
    message: "Maintenance request MR-024 approved",
    type: "Maintenance",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    message: "Audit cycle AC-09 requires verification",
    type: "Audit",
    timestamp: "2 hours ago",
    read: false,
  },
];

const filterOptions = [
  "All",
  "Unread",
  "Overdue",
  "Booking",
  "Maintenance",
  "Audit",
];

export default function Notifications() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "Unread") return !alert.read;
      return alert.type === activeFilter;
    });
  }, [alerts, activeFilter]);

  const unreadCount = alerts.filter((alert) => !alert.read).length;

  const markAllRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })));
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const toggleRead = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, read: !alert.read } : alert,
      ),
    );
  };

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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-800">
              {unreadCount} unread
            </span>
            <button
              type="button"
              onClick={markAllRead}
              className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            >
              Mark all read
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveFilter(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === option
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-3xl border p-5 ${
                  alert.read
                    ? "border-slate-200 bg-slate-50"
                    : "border-indigo-200 bg-white"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {alert.message}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {alert.timestamp}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      {alert.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleRead(alert.id)}
                      className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      {alert.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAlert(alert.id)}
                      className="rounded-2xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
              No notifications match this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
