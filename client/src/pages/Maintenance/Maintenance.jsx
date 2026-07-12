import { useMemo, useState } from "react";

const initialRequests = [
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

const priorities = ["Low", "Medium", "High"];
const statuses = ["Pending Approval", "Approved", "In Progress", "Cancelled"];

export default function Maintenance() {
  const [requests, setRequests] = useState(initialRequests);
  const [showForm, setShowForm] = useState(false);
  const [asset, setAsset] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending Approval");
  const [requestedBy, setRequestedBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const filteredRequests = useMemo(
    () =>
      requests.filter((request) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return (
          request.asset.toLowerCase().includes(query) ||
          request.requestedBy.toLowerCase().includes(query) ||
          request.priority.toLowerCase().includes(query) ||
          request.status.toLowerCase().includes(query)
        );
      }),
    [requests, searchQuery],
  );

  const resetForm = () => {
    setAsset("");
    setPriority("Medium");
    setStatus("Pending Approval");
    setRequestedBy("");
    setEditingId(null);
    setError("");
    setMessage("");
  };

  const handleSaveRequest = (event) => {
    event.preventDefault();
    setMessage("");

    if (!asset.trim() || !requestedBy.trim()) {
      setError("Please enter the asset and requester name.");
      return;
    }

    const payload = {
      id: editingId || `MR-${Math.floor(Math.random() * 900 + 100)}`,
      asset: asset.trim(),
      priority,
      status,
      requestedBy: requestedBy.trim(),
    };

    if (editingId) {
      setRequests(
        requests.map((request) =>
          request.id === editingId ? payload : request,
        ),
      );
      setMessage("Maintenance request updated.");
    } else {
      setRequests([payload, ...requests]);
      setMessage("Maintenance request submitted.");
    }

    resetForm();
    setShowForm(false);
  };

  const handleEditRequest = (request) => {
    setAsset(request.asset);
    setPriority(request.priority);
    setStatus(request.status);
    setRequestedBy(request.requestedBy);
    setEditingId(request.id);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    if (editingId === id) {
      resetForm();
      setShowForm(false);
    }
    setMessage("Request removed.");
  };

  const handleCancelRequest = (id) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Cancelled" } : request,
      ),
    );
    setMessage("Request cancelled.");
  };

  return (
    <div className="space-y-8">
      <section className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Maintenance
            </h1>
            <p className="mt-2 text-slate-500">
              Track repair requests, approvals, and asset condition.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) resetForm();
            }}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {showForm ? "Close request form" : "Raise request"}
          </button>
        </div>
      </section>

      {showForm ? (
        <section className="card-surface p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {editingId
                  ? "Edit maintenance request"
                  : "New maintenance request"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Capture request details and submit a review flow.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveRequest} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Asset
                <input
                  value={asset}
                  onChange={(event) => setAsset(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Requested by
                <input
                  value={requestedBy}
                  onChange={(event) => setRequestedBy(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Priority
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {priorities.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {statuses.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                {editingId ? "Update request" : "Submit request"}
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
        </section>
      ) : null}

      <section className="card-surface p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Active maintenance requests
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Review current requests and manage the approval workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search requests"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-72"
            />
            <span className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              {filteredRequests.length} requests
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {request.asset}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Requested by {request.requestedBy}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    request.status === "Approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : request.status === "In Progress"
                        ? "bg-sky-100 text-sky-800"
                        : request.status === "Cancelled"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {request.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{request.priority} priority</span>
                <span>ID: {request.id}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleEditRequest(request)}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleCancelRequest(request.id)}
                  className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRequest(request.id)}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
