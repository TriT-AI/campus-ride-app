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

export const OnTripView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

    if (isSosActive) {
      return (
        <div className="relative h-full w-full bg-red-600 flex flex-col items-center justify-center text-white p-6 text-center animate-[pulse_2s_ease-in-out_infinite] rounded-[3.5rem]">
          <ShieldAlert size={80} className="text-white mb-6" />
          <h1 className="text-3xl font-black tracking-widest mb-2">SOS ACTIVE</h1>
          <p className="text-red-100 mb-12">Security team has been dispatched to your location. Stay calm.</p>
          <MuiButton variant="text" onClick={() => setShowSosPinModal(true)} className="bg-white text-red-600 hover:bg-gray-100 w-full">
            Cancel Alert (Requires PIN)
          </MuiButton>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full bg-white flex flex-col pt-safe">
        {/* Top header with back + trip info */}
        <div className="bg-white px-5 py-4 z-20 shadow-sm border-b border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition" onClick={() => setView('home')} aria-label="Minimise to home">
              <ChevronDown size={20} className="text-gray-700" />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Live trip</span>
            </div>
            <div className="text-xs text-gray-400 font-medium">with Lukas</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Drop-off at</p>
              <h2 className="text-3xl font-black text-gray-900 mt-0.5">22:45</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Destination</p>
              <p className="font-bold text-gray-800 mt-1">{selectedDestination || 'Sontheim Dorms'}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-orange-50">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full shadow-lg -ml-5 -mt-5 flex justify-center items-center">
            <Car size={20} color={VGU_ORANGE} />
          </div>
        </div>

        <div className="p-5 pb-10 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
          <h3 className="font-bold text-gray-900 mb-4 text-center">Safety Tools</h3>
          <div className="flex gap-4">
            <MuiButton variant="outlined" onClick={() => setActiveOverlay('share')} className="flex-1">
              <Share2 size={18} /> Share Trip
            </MuiButton>
            <MuiButton variant="danger" onClick={() => setActiveOverlay('sos')} className="flex-1">
              <ShieldAlert size={18} /> SOS Alert
            </MuiButton>
          </div>
        </div>
      </div>
    );
  };