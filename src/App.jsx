import { useState } from "react";
import HeaderHero from "./components/HeaderHero";
import SlotPicker from "./components/SlotPicker";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";

function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [justBooked, setJustBooked] = useState(null);

  return (
    <div className="min-h-screen bg-[conic-gradient(at_10%_10%,#fff7ed, #fffbeb, #fff7ed)]">
      <HeaderHero />
      <SlotPicker
        selectedDate={selectedDate}
        onDateChange={(d) => {
          setSelectedDate(d);
          setSelectedSlot("");
        }}
        selectedSlot={selectedSlot}
        onSlotChange={setSelectedSlot}
      />
      <BookingForm selectedDate={selectedDate} selectedSlot={selectedSlot} onBooked={setJustBooked} />

      {justBooked && (
        <div className="max-w-6xl mx-auto px-6 mt-4">
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-900">
            <div className="font-semibold">Booking Confirmed!</div>
            <div className="text-sm mt-1">
              Your booking ID is <span className="font-mono">{justBooked.booking_id}</span>. An email confirmation may follow.
            </div>
          </div>
        </div>
      )}

      <MyBookings />

      <footer className="py-8 text-center text-amber-900/70">
        Om Namo Venkatesaya • Wishing you a blessed darshan
      </footer>
    </div>
  );
}

export default App;
