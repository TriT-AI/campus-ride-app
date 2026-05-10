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

export const SosModal = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center p-5 transition-opacity ${activeOverlay === 'sos' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="bg-white rounded-[2rem] shadow-2xl p-6 w-full max-w-sm text-center border-t-8 border-red-600 relative overflow-hidden">
        <AlertTriangle size={56} className="text-red-600 mx-auto mb-4 relative z-10" />
        <h3 className="text-2xl font-black text-gray-900 mb-2 relative z-10">Emergency Alert</h3>
        <p className="text-sm text-gray-500 mb-8 relative z-10">This action will immediately dispatch campus security to your live GPS location.</p>

        <div className="relative h-16 bg-red-50 rounded-full flex items-center p-1 border border-red-200 mb-4 z-10">
          <div className="absolute inset-0 flex items-center justify-center text-red-800/60 font-bold uppercase tracking-widest text-sm pointer-events-none select-none z-0">
            Swipe to Alert
          </div>
          <input
            type="range"
            min="0" max="100"
            value={swipeProgress}
            onChange={(e) => setSwipeProgress(Number(e.target.value))}
            onMouseUp={handleReleaseSOS}
            onTouchEnd={handleReleaseSOS}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 touch-none"
          />
          <div className="relative w-full h-full pointer-events-none z-10 flex items-center">
            <div
              className="absolute h-14 w-14 bg-red-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0 transition-all duration-75"
              style={{ left: `${swipeProgress}%`, transform: `translateX(-${swipeProgress}%)` }}
            >
              <ArrowLeft className="text-white transform rotate-180" size={24} />
            </div>
          </div>
          <div className="absolute left-1 top-1 bottom-1 bg-red-600/20 z-0 pointer-events-none rounded-full transition-all duration-75" style={{ width: `${swipeProgress}%` }}></div>
        </div>

        <MuiButton variant="text" onClick={() => setActiveOverlay(null)} className="w-full text-gray-500 bg-gray-100 relative z-10 mt-2">
          Cancel
        </MuiButton>
      </div>
    </div>
  );
};