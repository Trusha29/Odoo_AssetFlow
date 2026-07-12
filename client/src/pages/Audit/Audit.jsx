import { useState } from "react";

const cycles = [
  {
    id: "AC-09",
    scope: "IT Department",
    range: "Apr 12 - Apr 18",
    status: "Open",
    auditors: 2,
  },
  {
    id: "AC-10",
    scope: "Facilities",
    range: "Apr 20 - Apr 24",
    status: "Planned",
    auditors: 1,
  },
  {
    id: "AC-08",
    scope: "Operations",
    range: "Mar 28 - Apr 02",
    status: "Closed",
    auditors: 3,
  },
];

export default function Audit() {
  const [activeTab, setActiveTab] = useState("open");

  const filteredCycles = cycles.filter((cycle) => {
    if (activeTab === "open") return cycle.status === "Open";
    if (activeTab === "planned") return cycle.status === "Planned";
    return cycle.status === "Closed";
  });

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
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            New audit cycle
          </button>
        </div>
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
          {filteredCycles.map((cycle) => (
            <div
              key={cycle.id}
              className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {cycle.scope}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{cycle.range}</p>
                </div>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                  {cycle.status}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Assigned auditors: {cycle.auditors}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
