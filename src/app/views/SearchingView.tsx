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

export const SearchingView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className="flex flex-col h-full bg-white pt-safe px-5 relative overflow-hidden">
      <div className="absolute top-safe left-4 w-10 h-10 flex items-center justify-center cursor-pointer z-10" onClick={() => setView('home')}>
        <ChevronDown size={28} className="text-gray-800" />
      </div>

      <div className="mt-safe flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">We're finding a driver</h2>
          <p className="text-sm text-gray-500">Scanning nearby campus drivers…</p>
        </div>
      </div>

      {/* Animated radar — clear system-status feedback (H1) */}
      <div className="relative mx-auto w-44 h-44 mb-6">
        <div className="absolute inset-0 rounded-full bg-orange-100/70 animate-ping" />
        <div className="absolute inset-3 rounded-full bg-orange-200/70 animate-ping" style={{ animationDelay: '400ms' }} />
        <div className="absolute inset-6 rounded-full bg-orange-300/60 animate-ping" style={{ animationDelay: '800ms' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border border-orange-100">
            <Car size={32} color={VGU_ORANGE} className="animate-bounce" />
          </div>
        </div>
      </div>

      {/* Progress bar shimmer */}
      <div className="relative h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-[#F26822] rounded-full animate-[slide_1.6s_ease-in-out_infinite]"
             style={{ animation: 'searchSlide 1.6s ease-in-out infinite' }} />
        <style>{`@keyframes searchSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }`}</style>
      </div>
      <p className="text-center text-xs text-gray-500 mb-6 animate-pulse">Usually takes under 2 minutes</p>

      <div className="border border-gray-200 rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-5">If plans change</h3>
        <div className="flex gap-4 mb-5">
          <Hand size={20} className="text-orange-500 shrink-0" />
          <div>
            <p className="font-bold text-sm text-gray-900">Prioritized rematching</p>
            <p className="text-xs text-gray-500 mt-1">Your ride will be prioritized even if a driver has to cancel for any reason.</p>
          </div>
        </div>
        <div className="flex gap-4 mb-5">
          <Clock size={20} className="text-[#F26822] shrink-0" />
          <div>
            <p className="font-bold text-sm text-gray-900">Cancel for free up to 1 minute before</p>
            <p className="text-xs text-gray-500 mt-1">If you cancel after 1 minute, you'll be charged a small penalty fee.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <MessageSquare size={20} className="text-purple-500 shrink-0" />
          <div>
            <p className="font-bold text-sm text-gray-900">Need to connect with your driver?</p>
            <p className="text-xs text-gray-500 mt-1">Chat opens immediately after match.</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl p-4 flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          {linkedPaymentMethods.length > 0 && (
            linkedPaymentMethods[0].type === 'cash' ? <Banknote size={16} className="text-green-600" /> :
            linkedPaymentMethods[0].type === 'momo' ? <Smartphone size={16} className="text-pink-600" /> :
            linkedPaymentMethods[0].type === 'zalopay' ? <Wallet size={16} className="text-[#F26822]" /> :
            <CreditCard size={16} className="text-[#F26822]" />
          )}
          <span className="font-semibold text-gray-800 text-sm">{paymentLabel}</span>
        </div>
        <p className="font-bold text-gray-900">{rideType === 'solo' ? '€3.50' : '€1.50'}</p>
      </div>

      <div className="mt-auto pb-8">
        <MuiButton variant="text" onClick={handleCancelConfirm} fullWidth className="text-gray-500 bg-gray-100 hover:bg-gray-200">
          Cancel Booking
        </MuiButton>
      </div>
    </div>
  );
};