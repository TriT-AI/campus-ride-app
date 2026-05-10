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

export const HomeView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className="flex flex-col h-full bg-[#F3F4F6] relative">
      {/* Active ride — persistent top status bar (H1: Visibility of system status) */}
      {hasActiveRide && (
        <div
          onClick={() => setView('ontrip')}
          className="bg-[#1a1a2e] text-white px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-[#16213e] transition-colors z-30 pt-safe"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Car size={20} className="text-green-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse border border-[#1a1a2e]" />
            </div>
            <div>
              <p className="font-bold text-sm">Ride in progress</p>
              <p className="text-[11px] text-gray-400">ETA 22:45 · Sontheim Dorms · Tap to view</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-green-400 shrink-0" />
        </div>
      )}

      <div className={`bg-orange-100 rounded-b-[2.5rem] px-5 ${hasActiveRide ? 'pt-3' : 'pt-4 mt-safe'} pb-12 relative overflow-hidden`}>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
          <Car size={150} color={VGU_ORANGE} />
        </div>
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div onClick={() => setActiveOverlay('profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer" aria-label="Open profile">
            <User size={20} className="text-gray-800" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Transport</h1>
          <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm font-semibold text-sm cursor-pointer" onClick={() => setToastMessage('Map view coming soon')}>
            <MapIcon size={16} /> Map
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10 w-2/3">Wherever you're going, let's get you there!</h2>
      </div>

      <div className="px-5 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-md p-2 flex items-center h-16">
          <div className="flex items-center flex-1 pl-3 cursor-text" onClick={() => openLocationPick()}>
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 ring-4 ring-red-100"></div>
            <span className="text-gray-500 font-semibold text-[15px]">{selectedDestination || 'Where to?'}</span>
          </div>
          <div className="border-l border-gray-200 h-8 mx-2"></div>
          <div className="flex items-center gap-1.5 px-3 cursor-pointer hover:bg-gray-50 rounded-lg py-2" onClick={() => setToastMessage('Booking in advance or with time is coming soon')}>
            <Calendar size={16} className="text-gray-600" />
            <span className="font-bold text-sm text-gray-800">Now</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Saved places</p>
        <div className="space-y-3">
          {QUICK_LOCATIONS_DATA.map(({ name, sub, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center justify-between cursor-pointer bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
              onClick={() => openLocationPick(name)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#F26822]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{name}</p>
                  <p className="text-xs text-gray-400 truncate w-44">{sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom menu bar removed to simplify UI and prevent dead clicks */}
    </div>
  );

  // Ride Setup Sheet
};