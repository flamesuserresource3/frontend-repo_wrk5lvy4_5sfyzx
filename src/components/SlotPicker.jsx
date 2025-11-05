import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || window.location.origin.replace("3000", "8000");

export default function SlotPicker({ selectedDate, onDateChange, selectedSlot, onSlotChange }) {
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAvailability() {
      if (!selectedDate) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/availability?date=${selectedDate}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response");
        setAvailability(data);
      } catch (e) {
        setError("Failed to load availability");
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, [selectedDate]);

  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 10);

  return (
    <section className="max-w-6xl mx-auto px-6 mt-8">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-amber-200 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-amber-900 mb-2">Choose Date</label>
            <div className="relative">
              <input
                type="date"
                min={formattedToday}
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-amber-200 bg-white px-3 py-2 text-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Calendar className="w-4 h-4 text-amber-600 absolute right-3 top-2.5" />
            </div>
            <p className="text-xs text-amber-700/70 mt-2">Availability refreshes automatically for the selected date.</p>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-amber-900 mb-2">Select Slot</label>
            {loading ? (
              <div className="text-amber-700">Loading slots...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {availability.map((s) => {
                  const disabled = s.remaining <= 0;
                  const active = selectedSlot === s.slot;
                  return (
                    <button
                      key={s.slot}
                      onClick={() => !disabled && onSlotChange(s.slot)}
                      className={`text-left rounded-xl border px-4 py-3 transition-all shadow-sm flex items-center gap-3 ${
                        active
                          ? "border-amber-500 ring-2 ring-amber-300 bg-amber-50"
                          : "border-amber-200 hover:border-amber-300 bg-white"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <Clock className="w-4 h-4 text-amber-700" />
                      <div>
                        <div className="font-semibold text-amber-900">{s.slot}</div>
                        <div className="text-xs text-amber-700/80">
                          {s.remaining} of {s.capacity} available
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
