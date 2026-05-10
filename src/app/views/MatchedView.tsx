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

export const MatchedView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className="relative h-full w-full bg-gray-100 flex flex-col">
      <div className="bg-white shadow-sm z-20 px-5 py-4 rounded-b-3xl absolute top-0 inset-x-0 flex items-center justify-between pt-safe">
        <div>
          <p className="text-xs text-[#F26822] font-bold uppercase tracking-wider mb-0.5">Driver Found</p>
          <h2 className="text-2xl font-black text-gray-900">ETA: 4 min</h2>
        </div>
        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center border border-orange-100">
          <Car size={24} color={VGU_ORANGE} />
        </div>
      </div>

      <div className="h-1/2 mt-16 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-50 relative">
        <svg className="absolute inset-0 w-full h-full text-[#F26822]" preserveAspectRatio="none">
          <path d="M 50 150 Q 150 150 200 250 T 350 300" stroke="currentColor" strokeWidth="5" fill="none" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="bg-white flex-1 rounded-t-[2rem] shadow-[0_-10px_20px_rgba(0,0,0,0.05)] p-6 z-10 flex flex-col -mt-6">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

        <div className="border border-gray-100 bg-gray-50 rounded-2xl p-4 flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-[#F26822] text-white rounded-full flex items-center justify-center font-bold text-xl border-2 border-white shadow-sm shrink-0">L</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-lg">Lukas (IT)</h3>
              <div className="flex items-center text-gray-600 text-xs font-bold bg-white px-1.5 py-0.5 rounded-full border border-gray-200">
                <Star size={10} fill="#f59e0b" className="text-amber-500 mr-1" /> 4.9
              </div>
            </div>
            <p className="text-sm text-gray-500">VW Golf Black • HN-VX 123</p>
          </div>
          <div
            onClick={() => setActiveOverlay('chat')}
            className="w-10 h-10 bg-orange-100 text-[#F26822] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition"
          >
            <MessageSquare size={18} fill="currentColor" className="text-orange-600" />
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mb-4 animate-pulse">Your driver is on the way…</p>

        <div className="mt-auto flex flex-col gap-3 pb-4">
          <MuiButton variant="text" onClick={() => setActiveOverlay('cancel')} fullWidth className="text-gray-500 bg-gray-100">Cancel Ride</MuiButton>
        </div>
      </div>
    </div>
  );

  // Driver Arrived View — blue theme, Board Car button appears
};