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

export const PaymentPickerSheet = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

  const [highlightMissing, setHighlightMissing] = React.useState(false);
  const triggerHighlight = () => {
    setHighlightMissing(true);
    setTimeout(() => setHighlightMissing(false), 1000);
  };

    const opts = [
      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', color: 'text-[#F26822]', bg: 'bg-orange-50' },
      { id: 'momo', icon: Smartphone, label: 'MoMo Wallet', color: 'text-pink-600', bg: 'bg-pink-50' },
      { id: 'zalopay', icon: Wallet, label: 'ZaloPay', color: 'text-[#F26822]', bg: 'bg-sky-50' },
      { id: 'cash', icon: Banknote, label: 'Cash', color: 'text-green-600', bg: 'bg-green-50' },
    ];
    const labels: Record<string, string> = { card: 'VISA •••• 1234', momo: 'MoMo Wallet', zalopay: 'ZaloPay', cash: 'Cash' };
    return (
      <div className={`absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-[55] transition-transform duration-300 flex flex-col max-h-[90%] ${activeOverlay === 'paymentPicker' ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Payment method</h3>
            <p className="text-xs text-gray-500">Select or add one to continue.</p>
          </div>
          <X size={22} className="text-gray-400 cursor-pointer" onClick={() => setActiveOverlay('setup')} />
        </div>
        <div className={`p-5 overflow-y-auto space-y-2 rounded-b-3xl transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
          {opts.map(opt => {
            const isLinked = linkedPaymentMethods.some(pm => pm.type === opt.id);
            const isSelectedToLink = selectedPaymentMethodType === opt.id;
            const isSelectedForRide = linkedPaymentMethods.length > 0 && linkedPaymentMethods[0].type === opt.id;
            
            return (
            <React.Fragment key={opt.id}>
              <div
                onClick={() => {
                   if (!isLinked) {
                     setSelectedPaymentMethodType(isSelectedToLink ? '' : opt.id);
                   } else {
                     setLinkedPaymentMethods(prev => {
                       const clicked = prev.find(pm => pm.type === opt.id);
                       const others = prev.filter(pm => pm.type !== opt.id);
                       return clicked ? [clicked, ...others] : prev;
                     });
                     setPaymentLabel(labels[opt.id] || opt.label);
                     setPaymentConfigured(true);
                     setActiveOverlay('setup');
                   }
                 }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${isSelectedForRide ? 'border-[#F26822] bg-orange-50/40' : (isSelectedToLink ? 'border-[#F26822] bg-orange-50/40' : 'border-gray-200 hover:border-gray-300 bg-white')}`}
              >
                <div className={`w-10 h-10 ${opt.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <opt.icon size={18} className={opt.color} />
                </div>
                <span className={`flex-1 font-semibold text-sm ${(isSelectedForRide || isSelectedToLink) ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</span>
                
                {isLinked && !isSelectedForRide && opt.id !== 'cash' && (
                  <div className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold shrink-0">
                     Added
                  </div>
                )}
                {isSelectedForRide && (
                  <div className="px-2.5 py-1 rounded-full bg-orange-100 text-[#F26822] text-xs font-bold shrink-0">
                     Selected
                  </div>
                )}
              </div>

              {isSelectedToLink && !isLinked && opt.id === 'card' && (
                <div className="ml-2 bg-gray-50 border border-gray-200 rounded-b-2xl p-4 space-y-2 -mt-1 pt-4">
                  <input type="text" placeholder="Cardholder name" defaultValue="MIA NGUYEN" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#F26822] text-sm bg-white" />
                  <input type="text" placeholder="Card number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#F26822] text-sm bg-white" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="MM / YY" className="w-1/2 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#F26822] text-sm bg-white" />
                    <input type="text" placeholder="CVV" className="w-1/2 border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#F26822] text-sm bg-white" />
                  </div>
                  <button 
                    onClick={() => {
                      setLinkedPaymentMethods(prev => [{ type: 'card', details: 'card' }, ...prev]);
                      setSelectedPaymentMethodType('');
                      setPaymentLabel(labels['card']);
                      setPaymentConfigured(true);
                      setActiveOverlay('setup');
                    }}
                    className={`w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md bg-[#F26822] hover:bg-[#d95d1e] shadow-[#F26822]/30`}
                  >
                    Link Card
                  </button>
                </div>
              )}
              {isSelectedToLink && !isLinked && (opt.id === 'momo' || opt.id === 'zalopay') && (
                <div className="ml-2 bg-gray-50 border border-gray-200 rounded-b-2xl p-4 -mt-1 pt-4">
                  <p className="text-sm text-gray-600 mb-3">You will be redirected to the {opt.id === 'momo' ? 'MoMo' : 'ZaloPay'} app to authorize the connection.</p>
                  <button 
                    onClick={() => {
                      setLinkedPaymentMethods(prev => [{ type: opt.id, details: 'wallet' }, ...prev]);
                      setSelectedPaymentMethodType('');
                      setPaymentLabel(labels[opt.id]);
                      setPaymentConfigured(true);
                      setActiveOverlay('setup');
                    }}
                    className={`w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition ${opt.id === 'momo' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-sky-500 hover:bg-sky-600'}`}
                  >
                    <>{opt.id === 'momo' ? <Smartphone size={16} /> : <Wallet size={16} />} Open {opt.id === 'momo' ? 'MoMo' : 'ZaloPay'} App</>
                  </button>
                </div>
              )}
              {opt.id === 'cash' && isSelectedToLink && !isLinked && (
                <div className="ml-2 bg-gray-50 border border-gray-200 rounded-b-2xl p-4 -mt-1 pt-4 space-y-3">
                  <div className="text-xs text-gray-600">
                    You'll settle with the driver in cash at the end of each ride.
                  </div>
                  <button 
                    onClick={() => {
                      setLinkedPaymentMethods(prev => [{ type: 'cash', details: 'cash' }, ...prev]);
                      setSelectedPaymentMethodType('');
                      setPaymentLabel(labels['cash']);
                      setPaymentConfigured(true);
                      setActiveOverlay('setup');
                    }}
                    className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md bg-green-500 hover:bg-green-600"
                  >
                    Select Cash
                  </button>
                </div>
              )}
            </React.Fragment>
          )})}
        </div>
        <div className="p-5 border-t border-gray-100 bg-white" onClick={() => { if (linkedPaymentMethods.length === 0) triggerHighlight(); }}>
          <MuiButton
            disabled={linkedPaymentMethods.length === 0}
            className={linkedPaymentMethods.length === 0 ? 'pointer-events-none' : ''}
            onClick={() => { 
                setPaymentConfigured(true); 
                if(linkedPaymentMethods.length > 0) {
                    setPaymentLabel(labels[linkedPaymentMethods[0].type] || 'Payment method');
                }
                setActiveOverlay('setup'); 
                setToastMessage('Payment method saved'); 
            }}
            fullWidth
          >Confirm</MuiButton>
        </div>
      </div>
    );
  };