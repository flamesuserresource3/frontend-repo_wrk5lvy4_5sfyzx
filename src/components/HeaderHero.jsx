import Spline from "@splinetool/react-spline";
import { Calendar, Star, Ticket, Heart } from "lucide-react";

export default function HeaderHero() {
  return (
    <section className="relative w-full">
      <div className="relative h-[64vh] md:h-[72vh] w-full overflow-hidden">
        <Spline
          scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent)]" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto w-full px-6">
            <div className="backdrop-blur-[1px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 shadow-sm text-amber-200 ring-1 ring-white/20">
                <Star className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium">Sri Venkateswara Swami Temple</span>
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Tirupati Balaji Darshan Booking
              </h1>
              <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                Reserve your tickets for a peaceful darshan. Choose a date and time slot
                with a devotional interface designed for serenity.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-white/90">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 ring-1 ring-white/20">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Daily time slots</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 ring-1 ring-white/20">
                  <Ticket className="w-4 h-4" />
                  <span className="text-sm">Limited seats</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 ring-1 ring-white/20">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Devotional design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
