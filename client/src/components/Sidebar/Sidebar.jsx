import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiGrid,
  FiHome,
  FiLayers,
  FiMenu,
  FiShield,
  FiTool,
  FiUsers,
  FiX,
} from "react-icons/fi";

const menuItems = [
  { label: "Dashboard", icon: FiHome, path: "/dashboard" },
  { label: "Assets", icon: FiLayers, path: "/assets" },
  { label: "Employees", icon: FiUsers, path: "/employees" },
  { label: "Departments", icon: FiGrid, path: "/departments" },
  { label: "Bookings", icon: FiCalendar, path: "/bookings" },
  { label: "Maintenance", icon: FiTool, path: "/maintenance" },
  { label: "Audit", icon: FiShield, path: "/audit" },
  { label: "Reports", icon: FiBarChart2, path: "/reports" },
  { label: "Notifications", icon: FiBell, path: "/notifications" },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-slate-100 shadow-lg ring-1 ring-slate-200/10 transition hover:bg-slate-900"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 transform overflow-hidden bg-slate-950 text-slate-100 shadow-2xl transition-transform duration-300 md:static md:translate-x-0 md:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5 md:py-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Enterprise
            </p>
            <h1 className="text-2xl font-semibold text-white">AssetFlow</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-300 transition hover:bg-slate-800 md:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-800 text-white shadow-inner"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-slate-800 px-5 py-5 text-sm text-slate-400">
          <p className="mb-2">
            AssetFlow provides real-time asset tracking, bookings, audit, and
            reporting for modern enterprises.
          </p>
          <p className="text-xs text-slate-500">
            Responsive sidebar built with React and Tailwind CSS.
          </p>
        </div>
      </div>

      {isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/60 md:hidden"
          aria-label="Close overlay"
        />
      ) : null}
    </>
  );
}

export default Sidebar;
