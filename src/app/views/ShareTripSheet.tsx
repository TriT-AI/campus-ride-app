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
import { AddEmergencyContactForm } from '../components/AddEmergencyContactForm';

export const ShareTripSheet = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

    const handleToggleContact = (contact: string) => {
      setSelectedContacts(prev =>
        prev.includes(contact) ? prev.filter(c => c !== contact) : [...prev, contact]
      );
    };
    const isShareDisabled = selectedContacts.length === 0 && customContact.trim() === '';

    return (
      <div className={`absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-50 transition-transform duration-300 flex flex-col max-h-[85%] ${activeOverlay === 'share' ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Share Live Location</h2>
          <X size={24} className="text-gray-400 cursor-pointer" onClick={() => setActiveOverlay(null)} />
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-500 mb-4">Pick from your saved emergency contacts, or add someone new. They'll get a link with your live GPS location.</p>

          {setupEmergencyContacts.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 mb-4">
              You haven't saved any emergency contacts yet. Add one below so you can quickly share rides with them.
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your emergency contacts</p>
              {setupEmergencyContacts.map((c) => {
                const key = `${c.name} (${c.relation})`;
                const selected = selectedContacts.includes(key);
                return (
                  <div
                    key={key}
                    onClick={() => handleToggleContact(key)}
                    className={`flex items-center justify-between p-3.5 border-2 rounded-xl cursor-pointer transition-colors ${selected ? 'border-[#F26822] bg-orange-50/50' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${selected ? 'bg-[#F26822] text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {c.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-semibold truncate ${selected ? 'text-gray-900' : 'text-gray-700'}`}>{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.phone} · {c.relation}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${selected ? 'bg-[#F26822] border-[#F26822] text-white' : 'border-gray-300'}`}>
                      {selected && <Check size={14} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inline add-new or manage */}
          {(setupEmergencyContacts.length === 0 || ecShowAdd) ? (
            <AddEmergencyContactForm
              onSuccess={(name, relation) => {
                setEcShowAdd(false);
                setSelectedContacts(prev => [...prev, `${name} (${relation})`]);
              }}
              onCancel={setupEmergencyContacts.length > 0 ? () => setEcShowAdd(false) : undefined}
            />
          ) : (
            <button
              onClick={() => { setEcShowAdd(true); setNewEcName(''); setNewEcPhone(''); setNewEcRelation(''); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#F26822]/40 text-[#F26822] bg-orange-50/40 text-xs font-bold hover:bg-orange-50 transition-all mb-5 active:scale-[0.98]"
            >
              <UserPlus size={16} /> Add New Emergency Contact
            </button>
          )}

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Share with someone else</p>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Other phone number..."
              value={customContact}
              onChange={(e) => setCustomContact(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26822] text-gray-800 text-sm bg-gray-50"
            />
          </div>

          <div className="flex items-center gap-2 py-3 text-[#F26822] cursor-pointer rounded-xl transition mt-1 mb-5" onClick={() => setToastMessage('Link copied to clipboard')}>
            <LinkIcon size={16} />
            <span className="font-bold text-xs">Copy link manually</span>
          </div>

          <MuiButton onClick={handleSendLink} disabled={isShareDisabled} fullWidth>Send Live Link</MuiButton>
        </div>
      </div>
    );
  };