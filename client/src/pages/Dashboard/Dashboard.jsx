import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronRight,
  FiClock,
  FiPackage,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

const initialAssets = [
  {
    id: 1,
    name: "Laptop AF-0001",
    category: "Electronics",
    status: "Available",
  },
  {
    id: 2,
    name: "Projector AF-0014",
    category: "Shared Equipment",
    status: "Reserved",
  },
  {
    id: 3,
    name: "Workstation AF-0032",
    category: "Furniture",
    status: "Allocated",
  },
];

const initialBookings = [
  {
    id: 1,
    resource: "Room B2",
    startTime: "09:00",
    endTime: "10:00",
    status: "Confirmed",
  },
  {
    id: 2,
    resource: "Vehicle V3",
    startTime: "10:30",
    endTime: "12:00",
    status: "Upcoming",
  },
  {
    id: 3,
    resource: "Projector P1",
    startTime: "14:00",
    endTime: "15:00",
    status: "Pending",
  },
];

const initialTransfers = [
  { id: 1, asset: "Laptop AF-0001", status: "Pending" },
  { id: 2, asset: "Projector AF-0014", status: "Complete" },
  { id: 3, asset: "Vehicle V3", status: "Pending" },
];

const initialNotifications = [
  {
    id: 1,
    title: "Overdue return alert",
    body: "Laptop AF-0114 is past expected return date.",
    type: "Overdue",
    badge: "3 overdue",
  },
  {
    id: 2,
    title: "Booking conflict",
    body: "Room B2 is double-booked for 9:30–10:30.",
    type: "Booking",
    badge: "Review",
  },
];

const initialSchedule = [
  {
    id: 1,
    title: "AC filter replacement",
    detail: "Asset AF-0079 scheduled for approval review.",
  },
  {
    id: 2,
    title: "Audit cycle begins",
    detail: "Department inventory audit starts at 2:00 PM.",
  },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState(initialAssets);
  const [bookings, setBookings] = useState(initialBookings);
  const [transfers, setTransfers] = useState(initialTransfers);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [stats, setStats] = useState([]);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const navigate = useNavigate();
  const quickActionsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    setStats([
      {
        label: "Total Assets",
        value: assets.length,
        icon: FiPackage,
        color: "bg-slate-800",
      },
      {
        label: "Allocated Assets",
        value: assets.filter((asset) => asset.status === "Allocated").length,
        icon: FiShield,
        color: "bg-indigo-600",
      },
      {
        label: "Active Bookings",
        value: bookings.filter((booking) => booking.status !== "Cancelled")
          .length,
        icon: FiClock,
        color: "bg-slate-700",
      },
      {
        label: "Pending Transfers",
        value: transfers.filter((transfer) => transfer.status === "Pending")
          .length,
        icon: FiTrendingUp,
        color: "bg-slate-900",
      },
    ]);
  }, [assets, bookings, transfers]);

  const upcomingNotifications = useMemo(
    () => notifications.slice(0, 2),
    [notifications],
  );

  const quickActions = [
    { label: "Register Asset", path: "/assets" },
    { label: "Add Employee", path: "/employees" },
    { label: "Create Booking", path: "/bookings" },
    { label: "Raise Maintenance Request", path: "/maintenance" },
    { label: "Start Audit Cycle", path: "/audit" },
    { label: "Add Department", path: "/departments" },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        quickActionsRef.current &&
        !quickActionsRef.current.contains(event.target)
      ) {
        setIsQuickActionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  const handleActionClick = (path) => {
    setIsQuickActionsOpen(false);
    navigate(path);
  };

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
          <div ref={quickActionsRef} className="relative">
            <button
              type="button"
              onClick={() => setIsQuickActionsOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Quick actions <FiChevronRight />
            </button>

            <div
              className={`absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-900/5 transition-all duration-200 ease-out ${
                isQuickActionsOpen
                  ? "visible opacity-100 scale-100"
                  : "invisible opacity-0 scale-95"
              }`}
            >
              <div className="space-y-1 p-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => handleActionClick(action.path)}
                    className="flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <span>{action.label}</span>
                    <FiChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
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
              {notifications.filter((item) => item.type === "Overdue").length}{" "}
              overdue
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {upcomingNotifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {notification.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {notification.body}
                </p>
              </div>
            ))}
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
            {schedule.map((item) => (
              <li
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
