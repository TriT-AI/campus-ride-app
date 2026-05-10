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

export const SameGenderInfoModal = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className={`absolute inset-0 z-[55] flex items-end sm:items-center justify-center p-5 transition-opacity ${showSameGenderInfo ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setShowSameGenderInfo(false)} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[85%] overflow-y-auto">
        <div className="p-5 border-b border-gray-100 flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
            <Users size={18} className="text-[#F26822]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-lg">Same-Gender Matching</h3>
            <p className="text-xs text-gray-500 mt-0.5">Ride with people who share your gender identity</p>
          </div>
          <X size={20} className="text-gray-400 cursor-pointer" onClick={() => setShowSameGenderInfo(false)} />
        </div>
        <div className="p-5 space-y-3 text-sm text-gray-700">
          <p className="text-[13px] text-gray-600 mb-4">Travel safely with drivers and co-riders who share your verified gender. Tap sections below for details.</p>
          
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">What it does</h4>
              <p className="text-gray-600 text-[13px] leading-relaxed">
                Matches you only with users sharing your verified gender for Pool and Solo rides.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Why we offer it</h4>
              <p className="text-gray-600 text-[13px] leading-relaxed">
                For enhanced peace of mind, especially at night. Similar to women-only modes on other major apps.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Good to know</h4>
              <ul className="list-disc pl-5 text-gray-600 text-[13px] leading-relaxed space-y-1">
                <li>Matching may take slightly longer.</li>
                <li>Based on your profile settings.</li>
                <li>Non-binary riders have flexible options.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 flex gap-2 mt-2">
            <Shield size={14} className="text-gray-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-relaxed">All users are verified via university email. We never sell your data.</p>
          </div>
        </div>
        <div className="p-5 pt-0">
          <MuiButton onClick={() => setShowSameGenderInfo(false)} fullWidth>Got it</MuiButton>
        </div>
      </div>
    </div>
  );

  // Payment method picker — used when user skipped payment setup OR wants to change
};