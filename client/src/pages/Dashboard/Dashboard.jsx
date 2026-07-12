import {
  FiChevronRight,
  FiClock,
  FiPackage,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

const stats = [
  {
    label: "Assets Available",
    value: 184,
    icon: FiPackage,
    color: "bg-slate-800",
  },
  {
    label: "Assets Allocated",
    value: 62,
    icon: FiShield,
    color: "bg-indigo-600",
  },
  { label: "Active Bookings", value: 18, icon: FiClock, color: "bg-slate-700" },
  {
    label: "Pending Transfers",
    value: 9,
    icon: FiTrendingUp,
    color: "bg-slate-900",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Overview
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Dashboard
            </h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Quick actions <FiChevronRight />
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-[2rem] ${stat.color} p-6 text-white shadow-xl`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200/80">
                    {stat.label}
                  </p>
                  <Icon className="h-5 w-5 text-slate-200/90" />
                </div>
                <p className="mt-8 text-4xl font-semibold">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Notifications
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                Urgent operational alerts
              </h2>
            </div>
            <span className="rounded-2xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800">
              3 overdue
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Overdue return alert
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Laptop AF-0114 is past expected return date. Contact Priya
                immediately.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                Booking conflict
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Room B2 is double-booked for 9:30–10:30. Review overlap
                validation.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Today
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                Maintenance & check-ins
              </h2>
            </div>
            <button className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200">
              View schedule
            </button>
          </div>

          <ul className="mt-8 space-y-4">
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">
                AC filter replacement
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Asset AF-0079 scheduled for approval review.
              </p>
            </li>
            <li className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-semibold text-slate-900">Audit cycle begins</p>
              <p className="mt-2 text-sm text-slate-600">
                Department inventory audit starts at 2:00 PM.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
