import { useMemo, useState } from "react";

const initialBookings = [
  {
    id: 1,
    resource: "Room B2",
    startTime: "09:00",
    endTime: "10:00",
    bookedBy: "Priya Patel",
    status: "Confirmed",
  },
  {
    id: 2,
    resource: "Vehicle V3",
    startTime: "10:30",
    endTime: "12:00",
    bookedBy: "Raj Singh",
    status: "Upcoming",
  },
  {
    id: 3,
    resource: "Projector P1",
    startTime: "14:00",
    endTime: "15:00",
    bookedBy: "Ananya Sharma",
    status: "Pending",
  },
];

const resources = ["Room B2", "Vehicle V3", "Projector P1"];
const statusOptions = ["Confirmed", "Upcoming", "Pending", "Cancelled"];

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function overlaps(a, b) {
  return (
    a.resource === b.resource &&
    timeToMinutes(a.startTime) < timeToMinutes(b.endTime) &&
    timeToMinutes(b.startTime) < timeToMinutes(a.endTime)
  );
}

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [resource, setResource] = useState(resources[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [bookedBy, setBookedBy] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterResource, setFilterResource] = useState("All");

  const resetForm = () => {
    setResource(resources[0]);
    setStartTime("09:00");
    setEndTime("10:00");
    setBookedBy("");
    setStatus(statusOptions[0]);
    setError("");
    setMessage("");
    setEditingId(null);
  };

  const handleSaveBooking = (event) => {
    event.preventDefault();
    setMessage("");

    if (!bookedBy.trim()) {
      setError("Please enter a booking name.");
      return;
    }

    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      setError("End time must be later than start time.");
      return;
    }

    const bookingPayload = {
      id: editingId || Date.now(),
      resource,
      startTime,
      endTime,
      bookedBy: bookedBy.trim(),
      status,
    };

    const conflicting = bookings.some(
      (existing) =>
        existing.id !== bookingPayload.id && overlaps(existing, bookingPayload),
    );

    if (conflicting) {
      setError(
        "This booking overlaps an existing booking for the same resource.",
      );
      return;
    }

    if (editingId) {
      setBookings(
        bookings.map((booking) =>
          booking.id === editingId ? bookingPayload : booking,
        ),
      );
      setMessage("Booking updated successfully.");
    } else {
      setBookings([bookingPayload, ...bookings]);
      setMessage("Booking added successfully.");
    }

    resetForm();
  };

  const handleEditBooking = (booking) => {
    setResource(booking.resource);
    setStartTime(booking.startTime);
    setEndTime(booking.endTime);
    setBookedBy(booking.bookedBy);
    setStatus(booking.status);
    setEditingId(booking.id);
    setShowForm(true);
    setError("");
    setMessage("");
  };

  const handleCancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
    if (editingId === id) {
      resetForm();
      setShowForm(false);
    }
  };

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.resource.toLowerCase().includes(query) ||
        booking.bookedBy.toLowerCase().includes(query) ||
        `${booking.startTime} - ${booking.endTime}`
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        filterStatus === "All" || booking.status === filterStatus;
      const matchesResource =
        filterResource === "All" || booking.resource === filterResource;

      return matchesSearch && matchesStatus && matchesResource;
    });
  }, [bookings, search, filterStatus, filterResource]);

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
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              setError("");
              if (!showForm) resetForm();
            }}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {showForm ? "Hide booking form" : "New booking"}
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
          {showForm ? (
            <form className="mt-8 space-y-5" onSubmit={handleSaveBooking}>
              <label className="block text-sm font-medium text-slate-700">
                Resource
                <select
                  value={resource}
                  onChange={(event) => setResource(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {resources.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
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
              <label className="block text-sm font-medium text-slate-700">
                Booked by
                <input
                  value={bookedBy}
                  onChange={(event) => setBookedBy(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {editingId ? "Update booking" : "Request booking"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
              {error ? (
                <p className="text-sm font-medium text-rose-600">{error}</p>
              ) : null}
              {message ? (
                <p className="text-sm font-medium text-emerald-700">
                  {message}
                </p>
              ) : null}
            </form>
          ) : null}
        </section>

        <section className="card-surface p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Upcoming bookings
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Review your current reservations and conflict status.
              </p>
            </div>
            <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {bookings.length} total
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search bookings"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <select
              value={filterResource}
              onChange={(event) => setFilterResource(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All resources</option>
              {resources.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="All">All statuses</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-8 space-y-4">
            {filteredBookings.length ? (
              filteredBookings.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {item.resource}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.bookedBy} · {item.startTime} - {item.endTime}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" : item.status === "Upcoming" ? "bg-sky-100 text-sky-800" : item.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-700"}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditBooking(item)}
                      className="rounded-2xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(item.id)}
                      className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                No bookings found.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
