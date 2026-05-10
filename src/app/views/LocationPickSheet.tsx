import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MuiButton, Backdrop } from '../components/UI';
import { 
  ArrowLeft, ShieldAlert, Share2, Search,
  Car, User, Star, MessageSquare, 
  MapPin, Clock, CheckCircle, X, AlertTriangle, 
  CreditCard, Plus, Link as LinkIcon, Phone,
  ChevronDown, Calendar, Users, Map as MapIcon,
  Home, Book, History, Hand, ChevronRight, Check,
  Mail, Camera, Shield, Smartphone, Wallet, Banknote, UserPlus, Trash2,
  LocateFixed
} from 'lucide-react';

export const LocationPickSheet = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

  const [highlightMissing, setHighlightMissing] = React.useState(false);
  const triggerHighlight = () => {
    setHighlightMissing(true);
    setTimeout(() => setHighlightMissing(false), 1000);
  };

    // When searching, filter from ALL locations; when browsing, show quick picks only
    const isSearching = searchQuery.trim() !== '';
    const searchResults = isSearching
      ? ALL_SEARCHABLE_LOCATIONS.filter(l =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    const handleMapTap = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      setMapPinPos({ x, y });
      setSelectedDestination('Dropped pin');
      setSearchQuery('');
    };

    const handleSelectQuick = (loc: typeof QUICK_LOCATIONS_DATA[0]) => {
      setMapPinPos({ x: loc.x, y: loc.y });
      setSelectedDestination(loc.name);
      setSearchQuery('');
    };

    const handleSelectSearch = (loc: typeof ALL_SEARCHABLE_LOCATIONS[0]) => {
      setMapPinPos({ x: loc.x, y: loc.y });
      setSelectedDestination(loc.name);
      setSearchQuery('');
    };

    const handleConfirm = () => {
      setActiveOverlay('setup');
    };

    return (
      <div className={`absolute inset-0 bg-white z-40 flex flex-col transition-transform duration-300 ${activeOverlay === 'locationPick' ? 'translate-y-0' : 'translate-y-full'}`}>

        {/* ── Top bar: back + search ── */}
        <div className="pt-safe px-4 pb-3 bg-white z-10 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => { setActiveOverlay(null); setSelectedDestination(''); setSearchQuery(''); }}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <div className={`flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search for a place or address…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); if (e.target.value === '') setSelectedDestination(''); }}
                className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none placeholder-gray-400"
                autoFocus
              />
              {searchQuery !== '' && (
                <X size={14} className="text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => { setSearchQuery(''); }} />
              )}
            </div>
          </div>

          {/* Origin → Destination route summary (H1: system status) */}
          <div className="flex items-stretch gap-3 px-1">
            <div className="flex flex-col items-center gap-0.5 pt-1">
              <div className="w-3 h-3 bg-[#F26822] rounded-full border-2 border-white shadow" />
              <div className="w-0.5 flex-1 bg-gray-300 my-0.5" />
              <MapPin size={14} className="text-[#F26822]" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="bg-gray-100 rounded-xl px-3 py-2 text-xs text-gray-500 font-medium">
                Bildungscampus <span className="text-gray-400">· Current location</span>
              </div>
              <div className={`rounded-xl px-3 py-2 text-xs font-semibold border transition-all ${selectedDestination ? 'border-[#F26822] bg-orange-50 text-gray-800' : 'border-dashed border-gray-300 bg-gray-50 text-gray-400'}`}>
                {selectedDestination || 'No destination selected'}
              </div>
            </div>
          </div>
        </div>

        {/* ── Search results dropdown (overlays map when searching) ── */}
        {isSearching && (
          <div className="bg-white z-20 border-b border-gray-100 max-h-[40%] overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="px-4 py-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
                {searchResults.map(loc => (
                  <div
                    key={loc.name}
                    onClick={() => handleSelectSearch(loc)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <loc.icon size={16} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{loc.name}</p>
                      <p className="text-xs text-gray-400">{loc.sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <Search size={28} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-500">No results for "{searchQuery}"</p>
                <p className="text-xs text-gray-400 mt-1">Try a different name or tap the map to drop a pin</p>
              </div>
            )}
          </div>
        )}

        {/* ── Map area ── */}
        <div
          className="relative overflow-hidden cursor-crosshair"
          style={{ flex: '1 1 0' }}
          onClick={handleMapTap}
        >
          {/* Map background */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#e8f0e8" />
            <rect x="4%" y="4%" width="22%" height="19%" rx="5" fill="#cfe3cf" />
            <rect x="31%" y="4%" width="24%" height="19%" rx="5" fill="#d4e8d4" />
            <rect x="63%" y="4%" width="16%" height="19%" rx="5" fill="#cfe3cf" />
            <rect x="82%" y="4%" width="14%" height="19%" rx="5" fill="#d4e8d4" />
            <rect x="4%" y="32%" width="22%" height="13%" rx="5" fill="#d4e8d4" />
            <rect x="31%" y="32%" width="24%" height="13%" rx="5" fill="#c8ddc8" />
            <rect x="63%" y="32%" width="16%" height="13%" rx="5" fill="#d4e8d4" />
            <rect x="4%" y="54%" width="22%" height="12%" rx="5" fill="#cfe3cf" />
            <rect x="31%" y="54%" width="24%" height="12%" rx="5" fill="#d4e8d4" />
            <rect x="63%" y="54%" width="16%" height="12%" rx="5" fill="#c8ddc8" />
            <rect x="4%" y="75%" width="22%" height="20%" rx="5" fill="#d4e8d4" />
            <rect x="31%" y="75%" width="24%" height="20%" rx="5" fill="#cfe3cf" />
            <rect x="63%" y="75%" width="32%" height="20%" rx="5" fill="#d4e8d4" />
            <rect x="0" y="28%" width="100%" height="3.5%" fill="white" />
            <rect x="0" y="49.5%" width="100%" height="3.5%" fill="white" />
            <rect x="0" y="71.5%" width="100%" height="3.5%" fill="white" />
            <rect x="27%" y="0" width="3%" height="100%" fill="white" />
            <rect x="58%" y="0" width="3.5%" height="100%" fill="white" />
            <rect x="79%" y="0" width="2.5%" height="100%" fill="white" />
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="0" y1="51.5%" x2="100%" y2="51.5%" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="29%" y1="0" x2="29%" y2="100%" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="8 6" />
          </svg>

          {/* Tap hint overlay on empty map (H10: Help) */}
          {!selectedDestination && !isSearching && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/60 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                <MapPin size={14} /> Tap map to drop a pin
              </div>
            </div>
          )}

          {/* Current location pulse */}
          <div className="absolute" style={{ left: '55%', top: '65%', transform: 'translate(-50%,-50%)' }}>
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-40" />
              <div className="w-5 h-5 bg-[#F26822] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>

          {/* Destination pin */}
          {selectedDestination && (
            <div
              className="absolute flex flex-col items-center pointer-events-none"
              style={{ left: `${mapPinPos.x}%`, top: `${mapPinPos.y}%`, transform: 'translate(-50%, -100%)' }}
            >
              <div className="bg-[#F26822] text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-lg whitespace-nowrap mb-1 max-w-[140px] truncate">
                {selectedDestination}
              </div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#F26822] -mt-0.5" />
              <div className="w-3 h-3 bg-[#F26822] rounded-full border-2 border-white shadow-md mt-0.5" />
            </div>
          )}

          {/* Route line */}
          {selectedDestination && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="55%" y1="65%"
                x2={`${mapPinPos.x}%`} y2={`${mapPinPos.y}%`}
                stroke="#F26822" strokeWidth="3" strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Zoom controls removed to simplify UI */}

          {/* My location button */}
          <div className="absolute right-3 bottom-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer active:bg-gray-100" onClick={e => { e.stopPropagation(); setMapPinPos({ x: 55, y: 65 }); }}>
            <LocateFixed size={18} className="text-[#F26822]" />
          </div>
        </div>

        {/* ── Bottom panel: quick picks (only when NOT searching) ── */}
        <div className={`bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)] px-4 pt-3 pb-6 transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
          {!isSearching && (
            <>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Saved places</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {QUICK_LOCATIONS_DATA.map(loc => (
                  <div
                    key={loc.name}
                    onClick={e => { e.stopPropagation(); handleSelectQuick(loc); }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border-2 cursor-pointer transition-all ${selectedDestination === loc.name ? 'border-[#F26822] bg-orange-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${selectedDestination === loc.name ? 'bg-[#F26822]' : 'bg-gray-100'}`}>
                      <loc.icon size={14} className={selectedDestination === loc.name ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${selectedDestination === loc.name ? 'text-[#F26822]' : 'text-gray-800'}`}>{loc.name}</p>
                      <p className="text-[10px] text-gray-400">{loc.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div onClick={() => { if (!selectedDestination) triggerHighlight(); }}>
            <button
              onClick={handleConfirm}
              disabled={!selectedDestination}
              className={`w-full py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${selectedDestination ? 'bg-[#F26822] text-white hover:bg-[#d95d1e] active:scale-[0.98] shadow-sm shadow-[#F26822]/30' : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'}`}
            >
              {selectedDestination ? 'Confirm' : 'Select a destination'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Home View