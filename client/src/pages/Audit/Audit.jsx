import { useMemo, useState } from "react";

const initialCycles = [
  {
    id: "AC-09",
    auditName: "Infrastructure Review",
    department: "IT Department",
    startDate: "2026-04-12",
    endDate: "2026-04-18",
    assignedAuditor: "Ananya Sharma",
    status: "Open",
  },
  {
    id: "AC-10",
    auditName: "Facility Safety Check",
    department: "Facilities",
    startDate: "2026-04-20",
    endDate: "2026-04-24",
    assignedAuditor: "Priya Patel",
    status: "Planned",
  },
  {
    id: "AC-08",
    auditName: "Operations Audit",
    department: "Operations",
    startDate: "2026-03-28",
    endDate: "2026-04-02",
    assignedAuditor: "Raj Singh",
    status: "Closed",
  },
];

const statusOptions = ["Open", "Planned", "Closed"];
const departmentOptions = ["IT Department", "Facilities", "Operations"];

function formatRange(startDate, endDate) {
  return `${startDate} - ${endDate}`;
}

export default function Audit() {
  const [cycles, setCycles] = useState(initialCycles);
  const [activeTab, setActiveTab] = useState("open");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [auditName, setAuditName] = useState("");
  const [department, setDepartment] = useState(departmentOptions[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignedAuditor, setAssignedAuditor] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const filteredCycles = useMemo(
    () =>
      cycles.filter((cycle) => {
        if (activeTab === "open") return cycle.status === "Open";
        if (activeTab === "planned") return cycle.status === "Planned";
        return cycle.status === "Closed";
      }),
    [cycles, activeTab],
  );

  const openModal = () => {
    setEditingId(null);
    setAuditName("");
    setDepartment(departmentOptions[0]);
    setStartDate("");
    setEndDate("");
    setAssignedAuditor("");
    setStatus(statusOptions[0]);
    setError("");
    setIsModalOpen(true);
  };

  const handleCreateAudit = () => {
    openModal();
  };

  const handleEditAudit = (cycle) => {
    setEditingId(cycle.id);
    setAuditName(cycle.auditName);
    setDepartment(cycle.department);
    setStartDate(cycle.startDate);
    setEndDate(cycle.endDate);
    setAssignedAuditor(cycle.assignedAuditor);
    setStatus(cycle.status);
    setError("");
    setIsModalOpen(true);
  };

  const handleDeleteAudit = (id) => {
    setCycles(cycles.filter((cycle) => cycle.id !== id));
    setMessage("Audit cycle deleted.");
    window.setTimeout(() => setMessage(""), 2500);
  };

  const handleSaveAudit = (event) => {
    event.preventDefault();
    if (
      !auditName.trim() ||
      !department.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !assignedAuditor.trim() ||
      !status.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const payload = {
      id: editingId || `AC-${Math.floor(Math.random() * 900 + 10)}`,
      auditName: auditName.trim(),
      department: department.trim(),
      startDate,
      endDate,
      assignedAuditor: assignedAuditor.trim(),
      status,
    };

    if (editingId) {
      setCycles(
        cycles.map((cycle) => (cycle.id === editingId ? payload : cycle)),
      );
      setMessage("Audit cycle updated.");
    } else {
      setCycles([payload, ...cycles]);
      setMessage("Audit cycle created.");
    }

    setIsModalOpen(false);
    setEditingId(null);
    setError("");
    window.setTimeout(() => setMessage(""), 2500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  return (
    <div className="space-y-8">
      <section className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Audit cycles
            </h1>
            <p className="mt-2 text-slate-500">
              Create, assign, and close audit cycles with discrepancy tracking.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCreateAudit}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            New audit cycle
          </button>
        </div>
        {message ? (
          <p className="mt-4 text-sm font-medium text-emerald-700">{message}</p>
        ) : null}
      </section>

      <section className="card-surface p-6">
        <div className="flex flex-wrap gap-3">
          {["open", "planned", "closed"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {tab === "open"
                ? "Open"
                : tab === "planned"
                  ? "Planned"
                  : "Closed"}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredCycles.length > 0 ? (
            filteredCycles.map((cycle) => (
              <div
                key={cycle.id}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {cycle.auditName}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatRange(cycle.startDate, cycle.endDate)}
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                    {cycle.status}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Department: {cycle.department}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Assigned auditor: {cycle.assignedAuditor}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleEditAudit(cycle)}
                    className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteAudit(cycle.id)}
                    className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
              No audit cycles found.
            </div>
          )}
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {editingId ? "Edit audit cycle" : "New audit cycle"}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Provide audit details and save to the cycle list.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveAudit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Audit Name
                  <input
                    value={auditName}
                    onChange={(event) => setAuditName(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Department
                  <select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {departmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Start Date
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  End Date
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Assigned Auditor
                  <input
                    value={assignedAuditor}
                    onChange={(event) => setAssignedAuditor(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Status
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {statusOptions.map((option) => (
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
                  Save audit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
              {error ? (
                <p className="text-sm font-medium text-rose-600">{error}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
