import { useState } from "react";
import { User, Mail, Phone, Ticket } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace("3000", "8000");

export default function BookingForm({ selectedDate, selectedSlot, onBooked }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
    darshan_type: "Sarva Darshan",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = selectedDate && selectedSlot && form.name && form.email && form.phone;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, slot: selectedSlot, tickets: Number(form.tickets) }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Failed to book" }));
        throw new Error(err.detail || "Failed to book");
      }
      const data = await res.json();
      onBooked({ booking_id: data.booking_id, ...form, date: selectedDate, slot: selectedSlot });
      setForm({ name: "", email: "", phone: "", tickets: 1, darshan_type: "Sarva Darshan" });
    } catch (e) {
      setError(e.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 mt-8">
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-amber-200 p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Devotee Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Full Name</label>
            <div className="relative">
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 pr-9 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="e.g., Raghav Sharma"
                required
              />
              <User className="w-4 h-4 text-amber-600 absolute right-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 pr-9 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="you@example.com"
                required
              />
              <Mail className="w-4 h-4 text-amber-600 absolute right-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Phone</label>
            <div className="relative">
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 pr-9 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="10-digit number"
                required
              />
              <Phone className="w-4 h-4 text-amber-600 absolute right-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Tickets</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={10}
                value={form.tickets}
                onChange={(e) => setForm((f) => ({ ...f, tickets: e.target.value }))}
                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 pr-9 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
              <Ticket className="w-4 h-4 text-amber-600 absolute right-3 top-2.5" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-amber-900 mb-1">Darshan Type</label>
            <select
              value={form.darshan_type}
              onChange={(e) => setForm((f) => ({ ...f, darshan_type: e.target.value }))}
              className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option>Sarva Darshan</option>
              <option>Special Entry</option>
              <option>VIP</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-sm text-amber-800/80">
            {selectedDate && selectedSlot ? (
              <span>
                Booking for <span className="font-semibold">{selectedDate}</span> • <span className="font-semibold">{selectedSlot}</span>
              </span>
            ) : (
              <span>Please select a date and time slot above.</span>
            )}
          </div>
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white shadow-sm transition-colors ${
              canSubmit && !loading ? "bg-amber-600 hover:bg-amber-700" : "bg-amber-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    </section>
  );
}
