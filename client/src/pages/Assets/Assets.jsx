import { useState } from "react";

const categories = ["Electronics", "Furniture", "Vehicles", "Shared Equipment"];
const sampleAssets = [
  {
    tag: "AF-0001",
    name: "Laptop",
    status: "Available",
    location: "HQ",
    category: "Electronics",
  },
  {
    tag: "AF-0014",
    name: "Projector",
    status: "Reserved",
    location: "Conference Room",
    category: "Shared Equipment",
  },
  {
    tag: "AF-0032",
    name: "Workstation",
    status: "Allocated",
    location: "IT Dept.",
    category: "Furniture",
  },
];

export default function Assets() {
  const [assetName, setAssetName] = useState("");
  const [serial, setSerial] = useState("");
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="space-y-8">
      <div className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Assets</h1>
            <p className="mt-2 text-slate-500">
              Register and browse assets across the organization.
            </p>
          </div>
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Register new asset
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="card-surface p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Asset registration
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Capture key asset details and bookable status.
          </p>

          <form className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Asset name
                <input
                  value={assetName}
                  onChange={(event) => setAssetName(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Serial number
                <input
                  value={serial}
                  onChange={(event) => setSerial(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Category
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Location
                <input
                  placeholder="e.g. Warehouse 1"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Save asset
              </button>
              <p className="text-sm text-slate-500">
                Fields are currently mock-only until backend integration is
                added.
              </p>
            </div>
          </form>
        </div>

        <div className="card-surface p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Asset inventory
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Search and filter by status, category, or location.
              </p>
            </div>
            <button className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700 hover:bg-slate-200">
              View all assets
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {sampleAssets.map((asset) => (
              <div
                key={asset.tag}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {asset.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {asset.category} · {asset.location}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${asset.status === "Available" ? "bg-emerald-100 text-emerald-800" : asset.status === "Allocated" ? "bg-sky-100 text-sky-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {asset.status}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span>Tag {asset.tag}</span>
                  <span>Serial {asset.serial || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
