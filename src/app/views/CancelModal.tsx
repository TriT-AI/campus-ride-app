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

export const CancelModal = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

  const [highlightMissing, setHighlightMissing] = React.useState(false);
  const triggerHighlight = () => {
    setHighlightMissing(true);
    setTimeout(() => setHighlightMissing(false), 1000);
  };

  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center p-5 transition-opacity ${activeOverlay === 'cancel' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={() => setActiveOverlay(null)} />
      <div className="bg-white rounded-[2rem] shadow-2xl p-6 w-full max-w-sm relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Ride?</h3>
        <p className="text-sm text-gray-500 mb-6">Please select a reason for cancellation. This helps us improve the matching engine.</p>
        <div className={`space-y-3 mb-8 rounded-2xl transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
          {['Wait time too long', 'Driver unresponsive', 'Found another way'].map(reason => (
            <label key={reason} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition ${cancelReason === reason ? 'border-[#F26822] bg-orange-50/50' : 'border-gray-200'}`}>
              <input type="radio" name="cancel_reason" value={reason} checked={cancelReason === reason} onChange={() => setCancelReason(reason)} className="text-[#F26822] focus:ring-[#F26822] h-4 w-4 accent-[#F26822]" />
              <span className="text-sm font-medium text-gray-800">{reason}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          <MuiButton variant="text" onClick={() => setActiveOverlay(null)} className="flex-1 bg-gray-100 text-gray-700">Back</MuiButton>
          <div className="flex-1" onClick={() => { if (!cancelReason) triggerHighlight(); }}>
            <MuiButton 
              variant="danger" 
              onClick={handleCancelConfirm} 
              disabled={!cancelReason}
              className={`w-full ${!cancelReason ? 'pointer-events-none' : ''}`}
            >
              Confirm
            </MuiButton>
          </div>
        </div>
      </div>
    </div>
  );
};