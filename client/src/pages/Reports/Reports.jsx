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

const data = {
  labels: ["Available", "Allocated", "Maintenance", "Reserved"],
  datasets: [
    {
      label: "Asset count",
      data: [184, 62, 18, 24],
      backgroundColor: ["#4f46e5", "#2563eb", "#0f766e", "#f59e0b"],
      borderRadius: 16,
    },
  ],
};

const options = {
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
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Export summary
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_0.95fr]">
        <div className="card-surface p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Asset status distribution
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Current inventory state across the platform.
          </p>
          <div className="mt-8">
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Most active
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              Facilities
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Highest booking and maintenance request volume this month.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Upcoming
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              Scheduled audit cycle
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Next audit for IT department starts Apr 12.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
