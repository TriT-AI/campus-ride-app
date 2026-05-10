import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { MuiButton } from "../components/UI";
import {
  Car,
  Star,
  MessageSquare,
  Phone,
  Navigation,
  Clock,
  MapPin,
} from "lucide-react";

type Phase = "arrived" | "starting";

export const DriverArrivedView = () => {
  const {
    setView,
    setActiveOverlay,
    setHasActiveRide,
    setToastMessage,
    selectedDestination,
  } = useAppContext();

  const [phase, setPhase] = useState<Phase>("arrived");

  // Auto-transition to "starting" after a few seconds
  useEffect(() => {
    if (phase !== "arrived") return;
    const t = setTimeout(() => setPhase("starting"), 5000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "starting") return;
    const t = setTimeout(() => {
      setHasActiveRide(true);
      setView("ontrip");
    }, 1200);
    return () => clearTimeout(t);
  }, [phase, setHasActiveRide, setView]);

  // --- "Ride Starting" quick transition ---
  if (phase === "starting") {
    return (
      <div className="relative h-full w-full bg-[#F26822] flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]" />
        <div className="relative z-10 flex flex-col items-center animate-[fadeInUp_0.4s_ease-out]">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Car size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Ride Starting
          </h1>
          <p className="text-orange-100 text-sm font-medium">
            On your way to {selectedDestination || "your destination"}
          </p>
          <div className="mt-8 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main "Driver Arrived" view ---
  return (
    <div className="relative h-full w-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Header — in flow, not absolute */}
      <div className="bg-[#F26822] shadow-sm z-20 px-5 py-3 rounded-b-3xl flex items-center justify-between pt-safe shrink-0">
        <div>
          <p className="text-[10px] text-orange-200 font-bold uppercase tracking-wider mb-0.5">
            Your driver is here
          </p>
          <h2 className="text-xl font-black text-white">Meet your driver</h2>
        </div>
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
          <Navigation size={18} className="text-white" />
        </div>
      </div>

      {/* Map area — flexible, shrinks on small screens */}
      <div className="flex-1 min-h-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-50 relative">
        <svg
          className="absolute inset-0 w-full h-full text-[#F26822]"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 150 Q 150 150 200 250 T 350 300"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeDasharray="8 8"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -ml-3.5 -mt-3.5">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-40" />
            <div className="w-7 h-7 bg-[#F26822] rounded-full border-3 border-white shadow-lg" />
          </div>
        </div>
      </div>

      {/* Bottom sheet — fixed to content height, never pushed off */}
      <div className="bg-white rounded-t-[2rem] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] px-4 pt-3 pb-3 z-10 flex flex-col shrink-0 -mt-6">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2" />

        {/* Wait-time notice */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1.5 mb-2">
          <Clock size={14} className="text-amber-600 shrink-0" />
          <p className="text-[11px] text-amber-700 font-medium">
            Driver will wait up to <span className="font-bold">15 min</span>.
            Please head to pickup now.
          </p>
        </div>

        {/* Driver card */}
        <div className="border border-gray-100 bg-gray-50 rounded-2xl p-3 flex items-center gap-3 mb-2">
          <div className="w-11 h-11 bg-[#F26822] text-white rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm shrink-0">
            L
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-gray-900 text-sm truncate">
                Lukas
              </h3>
              <div className="flex items-center text-gray-600 text-[10px] font-bold bg-white px-1.5 py-0.5 rounded-full border border-gray-200">
                <Star
                  size={9}
                  fill="#f59e0b"
                  className="text-amber-500 mr-0.5"
                />{" "}
                4.9
              </div>
            </div>
            <p className="text-xs text-gray-500 truncate">
              VW Golf Black &bull; HN-VX 123
            </p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => setActiveOverlay("chat")}
              className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center border border-orange-200 hover:bg-orange-100 transition"
              aria-label="Chat with driver"
            >
              <MessageSquare size={16} className="text-[#F26822]" />
            </button>
            <button
              onClick={() => setToastMessage("Call driver is coming soon")}
              className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center border border-green-200 hover:bg-green-100 transition"
              aria-label="Call driver"
            >
              <Phone size={16} className="text-green-600" />
            </button>
          </div>
        </div>

        {/* Pickup location hint */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2.5 py-2 mb-2">
          <MapPin size={14} className="text-[#F26822] shrink-0" />
          <p className="text-[11px] text-gray-500">
            <span className="font-bold text-gray-700">Pickup:</span> Near
            Building E entrance.
          </p>
        </div>

        <MuiButton
          variant="text"
          onClick={() => setActiveOverlay("cancel")}
          fullWidth
          className="text-gray-500 bg-gray-100"
        >
          Cancel Ride
        </MuiButton>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
