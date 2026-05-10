import React from 'react';
import { useAppContext } from '../context/AppContext';
import { User, X, ArrowLeft } from 'lucide-react';

export const ChatOverlay = () => {
  const { chatMessages, setChatMessages, chatInput, setChatInput, setActiveOverlay } = useAppContext();

  return (
    <div className="absolute inset-x-0 bottom-0 top-1/4 bg-white rounded-t-3xl z-50 shadow-2xl flex flex-col">
      <div className="p-4 border-b flex justify-between items-center bg-[#F26822] text-white rounded-t-3xl pt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><User size={20} /></div>
          <div>
            <h3 className="font-bold text-lg">Lukas</h3>
            <p className="text-xs text-orange-100">VW Golf Black • HN-VX 123</p>
          </div>
        </div>
        <X onClick={() => setActiveOverlay(null)} className="cursor-pointer" size={28} />
      </div>
      <div className="flex-1 bg-gray-50 p-5 overflow-y-auto flex flex-col gap-3">
        {chatMessages.map((m: any, i: number) => (
          <div
            key={i}
            className={`max-w-[75%] p-3.5 rounded-2xl text-sm shadow-sm ${m.from === 'driver'
              ? 'bg-gray-200 text-gray-800 rounded-tl-none self-start'
              : 'bg-[#F26822] text-white rounded-tr-none self-end'}`}
          >
            {m.text}
          </div>
        ))}
        {/* Quick replies */}
        <div className="flex gap-2 flex-wrap mt-1">
          {["On my way!", "I'm here", "Running 2 min late"].map(q => (
            <button
              key={q}
              onClick={() => {
                setChatMessages((prev: any) => [...prev, { from: 'me', text: q }]);
                setTimeout(() => setChatMessages((prev: any) => [...prev, { from: 'driver', text: 'Got it 👍' }]), 900);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            >{q}</button>
          ))}
        </div>
      </div>
      <div className="p-3 border-t bg-white pb-6">
        <form
          onSubmit={e => {
            e.preventDefault();
            const v = chatInput.trim();
            if (!v) return;
            setChatMessages((prev: any) => [...prev, { from: 'me', text: v }]);
            setChatInput('');
            setTimeout(() => setChatMessages((prev: any) => [...prev, { from: 'driver', text: 'Got it 👍' }]), 1200);
          }}
          className="bg-gray-100 rounded-full pl-5 pr-1.5 py-1.5 flex items-center gap-2"
        >
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none placeholder-gray-400 py-2"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition ${chatInput.trim() ? 'bg-[#F26822] text-white hover:bg-[#d95d1e] shadow-md shadow-[#F26822]/30' : 'bg-gray-300 text-gray-400 cursor-not-allowed'}`}
            aria-label="Send"
          >
            <ArrowLeft className="transform rotate-180" size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
