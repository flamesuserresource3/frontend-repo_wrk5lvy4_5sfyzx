import { useState } from "react";
import { Search, Calendar, Clock, Mail } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace("3000", "8000");

export default function MyBookings() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchBookings() {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 mt-8 mb-12">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-amber-200 p-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              placeholder="Enter your email to view bookings"
              className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 pr-9 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Mail className="w-4 h-4 text-amber-600 absolute right-3 top-2.5" />
          </div>
          <button
            onClick={fetchBookings}
            disabled={!email || loading}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white shadow-sm ${
              email && !loading ? "bg-amber-600 hover:bg-amber-700" : "bg-amber-300 cursor-not-allowed"
            }`}
          >
            <Search className="w-4 h-4" />
            {loading ? "Loading" : "Find Bookings"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((b) => (
            <div key={b._id} className="rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-amber-700/80">{b.darshan_type}</div>
              <div className="mt-1 font-semibold text-amber-900">{b.name}</div>
              <div className="mt-2 flex items-center gap-2 text-amber-900/90">
                <Calendar className="w-4 h-4" />
                <span>{b.date}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-amber-900/90">
                <Clock className="w-4 h-4" />
                <span>{b.slot}</span>
              </div>
              <div className="mt-1 text-amber-900/90">Tickets: {b.tickets}</div>
              <div className="mt-3 text-xs text-amber-700/70 break-all">ID: {b._id}</div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-amber-800/80">No bookings yet. Enter your email and search.</div>
          )}
        </div>
      </div>
    </section>
  );
}
