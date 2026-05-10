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

export const RideSetupSheet = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

  const [highlightMissing, setHighlightMissing] = React.useState(false);
  const triggerHighlight = () => {
    setHighlightMissing(true);
    setTimeout(() => setHighlightMissing(false), 1000);
  };
  return (
    <div className={`absolute inset-0 bg-gray-100 z-40 transition-transform duration-300 flex flex-col ${activeOverlay === 'setup' ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="h-[35%] relative bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] bg-orange-50 pt-safe">
        <div className="absolute top-safe left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer z-10" onClick={() => setActiveOverlay('locationPick')}>
          <ArrowLeft size={20} className="text-gray-800" />
        </div>
        {/* Route summary card — keeps user oriented after confirming a destination */}
        <div className="absolute top-safe left-16 right-4 z-10 bg-white/95 backdrop-blur rounded-2xl shadow-md px-3.5 py-2.5">
          <div className="flex items-stretch gap-2.5">
            <div className="flex flex-col items-center pt-1">
              <div className="w-2.5 h-2.5 bg-[#F26822] rounded-full" />
              <div className="w-0.5 flex-1 bg-gray-300 my-0.5" />
              <MapPin size={11} className="text-[#F26822]" />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <p className="text-gray-400 truncate">Bildungscampus</p>
              <p className="font-bold text-gray-900 truncate">{selectedDestination || 'Select destination'}</p>
            </div>
            <button onClick={() => setActiveOverlay('locationPick')} className="text-[10px] font-bold text-[#F26822] shrink-0 self-center px-2 py-1 rounded-full bg-orange-50 hover:bg-orange-100">Edit</button>
          </div>
        </div>
        <svg className="absolute inset-0 w-full h-full text-[#F26822]" preserveAspectRatio="none">
          <path d="M 100 150 Q 200 100 300 220" stroke="currentColor" strokeWidth="5" fill="none" />
          <circle cx="100" cy="150" r="8" fill="#3B82F6" stroke="white" strokeWidth="3" />
          <circle cx="300" cy="220" r="8" fill="#EF4444" stroke="white" strokeWidth="3" />
        </svg>
      </div>

      <div className="h-[65%] bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex flex-col relative z-20">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2.5 mb-1.5"></div>
        <div className="flex-1 overflow-y-auto px-5">
          <div className="pt-1 pb-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Step 2 of 2</p>
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">Choose your ride</h3>
              <p className="text-[10px] text-gray-500 mb-0.5">No hidden fees.</p>
            </div>
          </div>
          <div className="space-y-2 mb-3 mt-1.5">
            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all cursor-pointer ${rideType === 'solo' ? 'border-[#F26822] bg-orange-50/50' : 'border-transparent hover:bg-gray-50'}`}
              onClick={() => setRideType('solo')}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center"><Car size={20} className="text-[#F26822]" /></div>
                  <div className="absolute -bottom-1 -right-1 bg-[#F26822] text-white text-[8px] font-bold px-1 rounded">PRIVATE</div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <p className="font-bold text-sm text-gray-900">Private ride</p>
                    <p className="text-[10px] text-gray-500 leading-tight">Direct private ride. No shared pickups.</p>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">2 mins away • 10:45 AM</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="font-bold text-sm text-gray-900">€3.50</p>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${rideType === 'solo' ? 'bg-[#F26822] border-[#F26822] text-white' : 'border-gray-300'}`}>
                  {rideType === 'solo' && <Check size={12} />}
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-between p-2.5 rounded-xl border-2 transition-all cursor-pointer ${rideType === 'pool' ? 'border-[#F26822] bg-orange-50/50' : 'border-transparent hover:bg-gray-50'}`}
              onClick={() => setRideType('pool')}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center"><Car size={20} className="text-[#F26822]" /></div>
                  <div className="absolute -bottom-1 -right-1 bg-[#F26822] text-white text-[8px] font-bold px-1 rounded">SHARE</div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <p className="font-bold text-sm text-gray-900">Share ride</p>
                    <p className="text-[10px] text-gray-500 leading-tight">Share your ride. Save money, meet peers!</p>
                  </div>
                  <p className="text-[10px] text-[#F26822] font-medium mt-0.5">Match in &lt; 2 mins</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="font-bold text-sm text-gray-900">€1.50</p>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${rideType === 'pool' ? 'bg-[#F26822] border-[#F26822] text-white' : 'border-gray-300'}`}>
                  {rideType === 'pool' && <Check size={12} />}
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t border-gray-100 py-3 space-y-3 rounded-xl transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
            {paymentConfigured ? (
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setActiveOverlay('paymentPicker')}>
                <div className="flex items-center gap-2.5">
                  {linkedPaymentMethods.length > 0 ? (
                    linkedPaymentMethods[0].type === 'cash' ? <Banknote size={16} className="text-gray-700" /> : 
                    linkedPaymentMethods[0].type === 'momo' ? <Smartphone size={16} className="text-gray-700" /> : 
                    linkedPaymentMethods[0].type === 'zalopay' ? <Wallet size={16} className="text-gray-700" /> : 
                    <CreditCard size={16} className="text-gray-700" />
                  ) : <CreditCard size={16} className="text-gray-700" />}
                  <span className="font-semibold text-gray-800 text-sm">{paymentLabel}</span>
                </div>
                <div className="flex items-center gap-0.5 text-xs font-semibold text-[#F26822] bg-orange-50 px-2.5 py-1 rounded-full">
                  Change <ChevronRight size={14} />
                </div>
              </div>
            ) : (
              <div
                onClick={() => setActiveOverlay('paymentPicker')}
                className="flex items-center justify-between p-2 rounded-xl border-2 border-dashed border-[#F26822] bg-orange-50/50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-orange-200">
                    <Plus size={14} className="text-[#F26822]" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-gray-900">Add a payment method</p>
                    <p className="text-[10px] text-gray-500">Required before booking</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#F26822]" />
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800 text-sm">Same-Gender Only</span>
                <button
                  onClick={() => setShowSameGenderInfo(true)}
                  aria-label="About same-gender matching"
                  className="w-4 h-4 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-[9px] font-bold transition"
                >i</button>
              </div>
              <div
                className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors relative ${sameGender ? 'bg-[#F26822]' : 'bg-gray-300'}`}
                onClick={() => setSameGender(!sameGender)}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform absolute top-[2px] ${sameGender ? 'left-[22px]' : 'left-[2px]'}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 pb-6 bg-white border-t border-gray-100" onClick={() => { if (!paymentConfigured) triggerHighlight(); }}>
          <MuiButton 
            onClick={handleBookRide} 
            disabled={!paymentConfigured} 
            fullWidth 
            className={!paymentConfigured ? 'pointer-events-none' : ''}
            style={{ padding: '10px 0' }}
          >
            {paymentConfigured ? 'Confirm' : 'Add payment method to book'}
          </MuiButton>
        </div>
      </div>
    </div>
  );
};