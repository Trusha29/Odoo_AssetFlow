import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 py-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Welcome back,</p>
          <h2 className="text-xl font-semibold text-slate-900">
            {user?.name || "AssetFlow User"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/organization"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Organization Setup
          </Link>
          <button
            type="button"
            onClick={logout}
            className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
