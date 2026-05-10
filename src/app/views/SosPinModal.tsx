import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MuiButton } from '../components/UI';
import { ArrowLeft } from 'lucide-react';

export const SosPinModal = () => {
  const { sosPinInput, setSosPinInput, setIsSosActive, setShowSosPinModal, setToastMessage, sosPin } = useAppContext();

  const [highlightMissing, setHighlightMissing] = React.useState(false);
  const triggerHighlight = () => {
    setHighlightMissing(true);
    setTimeout(() => setHighlightMissing(false), 1000);
  };

  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] shadow-2xl p-6 w-full max-w-sm text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Cancellation PIN</h3>
        <p className="text-sm text-gray-500 mb-6">Please enter your 4-digit security PIN to cancel the SOS alert.</p>
        
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold text-gray-900 bg-gray-50 transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50 border-red-500' : 'border-gray-200'}`}>
              {sosPinInput[i] ? '•' : ''}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button key={n} onClick={() => setSosPinInput((p: string) => p.length < 4 ? p + n : p)} className="h-12 rounded-xl bg-gray-100 font-bold text-lg text-gray-800 hover:bg-gray-200 active:bg-gray-300">{n}</button>
          ))}
          <button onClick={() => setShowSosPinModal(false)} className="h-12 rounded-xl bg-gray-100 font-bold text-sm text-gray-500 hover:bg-gray-200">Cancel</button>
          <button onClick={() => setSosPinInput((p: string) => p.length < 4 ? p + '0' : p)} className="h-12 rounded-xl bg-gray-100 font-bold text-lg text-gray-800 hover:bg-gray-200 active:bg-gray-300">0</button>
          <button onClick={() => setSosPinInput((p: string) => p.slice(0, -1))} className="h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
            <ArrowLeft size={18} className="transform rotate-180" />
          </button>
        </div>

        <div onClick={() => { if (sosPinInput.length !== 4) triggerHighlight(); }}>
          <MuiButton 
            onClick={() => {
              if (sosPinInput === sosPin) { 
                setIsSosActive(false);
                setShowSosPinModal(false);
                setSosPinInput('');
                setToastMessage('SOS Alert Cancelled');
              } else {
                setSosPinInput('');
                setToastMessage('Incorrect PIN. Please try again.');
              }
            }}
            disabled={sosPinInput.length !== 4}
            className={sosPinInput.length !== 4 ? 'pointer-events-none' : ''}
            fullWidth
          >
            Confirm
          </MuiButton>
        </div>
      </div>
    </div>
  );
};
