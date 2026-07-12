import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const reportTypes = [
  { id: "status", label: "Asset Status" },
  { id: "maintenance", label: "Maintenance" },
  { id: "bookings", label: "Bookings" },
];

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
  { id: 4, name: "Vehicle V3", category: "Vehicles", status: "Maintenance" },
  {
    id: 5,
    name: "Monitor AF-0021",
    category: "Electronics",
    status: "Available",
  },
];

const categoryOptions = [
  "All",
  "Electronics",
  "Furniture",
  "Vehicles",
  "Shared Equipment",
];
const statusOptions = [
  "All",
  "Available",
  "Allocated",
  "Reserved",
  "Maintenance",
];

const initialReportState = {
  status: {
    labels: ["Available", "Allocated", "Maintenance", "Reserved"],
    values: [0, 0, 0, 0],
    description: "Current inventory state across the platform.",
  },
  maintenance: {
    labels: ["Electronics", "Furniture", "Vehicles", "Shared Equipment"],
    values: [0, 0, 0, 0],
    description: "Maintenance request flow across asset categories.",
  },
  bookings: {
    labels: ["Available", "Allocated", "Reserved", "Maintenance"],
    values: [0, 0, 0, 0],
    description: "Booking status distribution for shared assets.",
  },
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

export default function Reports() {
  const [activeReport, setActiveReport] = useState("status");
  const [assets, setAssets] = useState(initialAssets);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reports, setReports] = useState(initialReportState);
  const [exportMessage, setExportMessage] = useState("");

  const filteredAssets = useMemo(
    () =>
      assets.filter((asset) => {
        const matchesCategory =
          categoryFilter === "All" || asset.category === categoryFilter;
        const matchesStatus =
          statusFilter === "All" || asset.status === statusFilter;
        return matchesCategory && matchesStatus;
      }),
    [assets, categoryFilter, statusFilter],
  );

  useEffect(() => {
    const statusLabels = ["Available", "Allocated", "Maintenance", "Reserved"];
    const newStatusValues = statusLabels.map(
      (status) =>
        filteredAssets.filter((asset) => asset.status === status).length,
    );

    const maintenanceLabels = [
      "Electronics",
      "Furniture",
      "Vehicles",
      "Shared Equipment",
    ];
    const newMaintenanceValues = maintenanceLabels.map(
      (category) =>
        filteredAssets.filter(
          (asset) =>
            asset.category === category && asset.status === "Maintenance",
        ).length,
    );

    const bookingLabels = ["Available", "Allocated", "Reserved", "Maintenance"];
    const newBookingValues = bookingLabels.map(
      (status) =>
        filteredAssets.filter((asset) => asset.status === status).length,
    );

    setReports((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        labels: statusLabels,
        values: newStatusValues,
      },
      maintenance: {
        ...prev.maintenance,
        values: newMaintenanceValues,
      },
      bookings: {
        ...prev.bookings,
        values: newBookingValues,
      },
    }));
  }, [filteredAssets]);

  const totalAssets = filteredAssets.length;
  const availableCount = filteredAssets.filter(
    (asset) => asset.status === "Available",
  ).length;
  const allocatedCount = filteredAssets.filter(
    (asset) => asset.status === "Allocated",
  ).length;
  const reservedCount = filteredAssets.filter(
    (asset) => asset.status === "Reserved",
  ).length;
  const maintenanceCount = filteredAssets.filter(
    (asset) => asset.status === "Maintenance",
  ).length;

  const chartConfig = useMemo(() => {
    const report = reports[activeReport];
    return {
      labels: report.labels,
      datasets: [
        {
          label: "Count",
          data: report.values,
          backgroundColor: ["#4f46e5", "#2563eb", "#0f766e", "#f59e0b"],
          borderRadius: 16,
        },
      ],
    };
  }, [activeReport, reports]);

  const hasChartData = chartConfig.datasets[0].data.some((value) => value > 0);

  const summaryItems = useMemo(() => {
    switch (activeReport) {
      case "maintenance":
        return [
          { label: "Total Assets", value: totalAssets },
          { label: "Maintenance", value: maintenanceCount },
          { label: "Available", value: availableCount },
        ];
      case "bookings":
        return [
          { label: "Total Assets", value: totalAssets },
          { label: "Allocated", value: allocatedCount },
          { label: "Reserved", value: reservedCount },
        ];
      default:
        return [
          { label: "Total Assets", value: totalAssets },
          { label: "Available", value: availableCount },
          { label: "Allocated", value: allocatedCount },
        ];
    }
  }, [
    activeReport,
    totalAssets,
    availableCount,
    allocatedCount,
    reservedCount,
    maintenanceCount,
  ]);

  const handleExportSummary = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Assets", totalAssets],
      ["Available", availableCount],
      ["Allocated", allocatedCount],
      ["Reserved", reservedCount],
      ["Maintenance", maintenanceCount],
    ];
    const csvContent = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report-summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportMessage("Report summary exported.");
    window.setTimeout(() => setExportMessage(""), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
            <p className="mt-2 text-slate-500">
              Analyze asset utilization, maintenance frequency, and booking
              activity.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleExportSummary}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Export summary
            </button>
            {exportMessage ? (
              <p className="text-sm font-medium text-emerald-700">
                {exportMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_0.95fr]">
        <div className="card-surface p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {
                  reportTypes.find((report) => report.id === activeReport)
                    ?.label
                }
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {reports[activeReport].description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  onClick={() => setActiveReport(report.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeReport === report.id
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {report.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Category
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Status
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
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

          <div className="mt-8">
            {hasChartData ? (
              <Bar data={chartConfig} options={chartOptions} />
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
                No Data Available
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Insights
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              {activeReport === "maintenance"
                ? "Maintenance backlog is steady."
                : activeReport === "bookings"
                  ? "Resource utilization remains high."
                  : "Most assets remain available."}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {activeReport === "maintenance"
                ? "Focus on approvals to reduce pending repair cycles."
                : activeReport === "bookings"
                  ? "Confirm pending reservations to avoid delays."
                  : "Review reserved assets to improve allocation speed."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
