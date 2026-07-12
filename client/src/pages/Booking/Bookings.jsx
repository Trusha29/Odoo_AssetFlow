import { useState } from "react";

const resources = [
  {
    name: "Room B2",
    time: "09:00 - 10:00",
    bookedBy: "Priya Patel",
    status: "Confirmed",
  },
  {
    name: "Vehicle V3",
    time: "10:30 - 12:00",
    bookedBy: "Raj Singh",
    status: "Upcoming",
  },
  {
    name: "Projector P1",
    time: "14:00 - 15:00",
    bookedBy: "Ananya Sharma",
    status: "Pending",
  },
];

export default function Bookings() {
  const [resource, setResource] = useState("Room B2");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  return (
    <div className="space-y-8">
      <section className="card-surface p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Bookings</h1>
            <p className="mt-2 text-slate-500">
              Manage shared resource bookings and avoid scheduling conflicts.
            </p>
          </div>
          <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            New booking
          </button>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="card-surface p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Create booking
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Reserve a room, vehicle, or equipment slot with overlap validation.
          </p>
          <form className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-700">
              Resource
              <select
                value={resource}
                onChange={(event) => setResource(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option>Room B2</option>
                <option>Vehicle V3</option>
                <option>Projector P1</option>
              </select>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Start time
                <input
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                End time
                <input
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>
            <button
              type="button"
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Request booking
            </button>
          </form>
        </section>

        <section className="card-surface p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Upcoming bookings
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Review your current reservations and conflict status.
              </p>
            </div>
            <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              3 total
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {resources.map((item) => (
              <div
                key={item.name + item.time}
                className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {item.bookedBy} · {item.time}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" : item.status === "Upcoming" ? "bg-sky-100 text-sky-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
