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

export const SSOView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className="flex flex-col h-full bg-white pt-safe">
      <div className="p-4 flex items-center gap-3">
        <ArrowLeft onClick={() => setView('login')} className="cursor-pointer text-gray-800 hover:bg-gray-100 p-1 rounded-full" size={28} />
      </div>
      <div className="flex-1 p-6 flex flex-col items-center pt-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose an account</h2>
          <p className="text-gray-500">to continue to Campus Ride</p>
        </div>
        <div className="w-full border border-gray-200 hover:border-[#F26822]/40 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300" onClick={handleAuthorize}>
          <div className="p-4 flex items-center gap-4 border-b border-gray-100 bg-white">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-sm">M</div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">Mia Nguyen</p>
              <p className="text-sm text-gray-500">mia.nguyen@student.edu.vn</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex items-center gap-4 hover:bg-[#F26822]/5 transition-colors group">
            <div className="w-12 h-12 flex items-center justify-center text-gray-500 group-hover:text-[#F26822] transition-colors">
              <User size={24} />
            </div>
            <p className="font-semibold text-gray-600 group-hover:text-[#F26822] transition-colors">Use another account</p>
          </div>
        </div>
      </div>
    </div>
  );

  // OAuth Authorization Screen
};