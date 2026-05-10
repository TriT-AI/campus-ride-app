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

export const AuthView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
    <div className="flex flex-col h-full bg-white pt-safe">
      <div className="px-4 pt-2 pb-1 flex items-center gap-3">
        <ArrowLeft onClick={() => setView('sso')} className="cursor-pointer text-gray-800 hover:bg-gray-100 p-1 rounded-full" size={24} />
      </div>
      <div className="flex-1 px-5 pb-4 flex flex-col items-center">
        {/* App Identity + Account - condensed */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
            <Car size={24} color={VGU_ORANGE} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Campus Ride</h2>
            <p className="text-gray-400 text-xs">campusride.edu.vn</p>
          </div>
        </div>

        {/* Account pill */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full mb-3">
          <div className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">M</div>
          <span className="text-xs font-medium text-gray-700">mia.nguyen@student.edu.vn</span>
        </div>

        <p className="text-sm text-gray-800 text-center mb-1 px-2">
          {/* Sign in text removed */}
        </p>
        <p className="text-xs text-gray-500 text-center mb-3 px-2">
          {/* Review text removed */}
        </p>

        {/* Permissions List - expandable (tap to see detail) */}
        <div className="w-full border border-gray-200 rounded-xl overflow-hidden mb-3">
          {[
            {
              icon: User, color: 'text-[#F26822]', bg: 'bg-orange-50',
              text: 'See your personal info, including any personal info you\'ve made publicly available',
              sub: 'Name, profile picture, locale',
              detail: 'Campus Ride will be able to view basic profile information associated with your Google Account: your full name, profile photo, and preferred language. Your co-riders and drivers see this information so they can recognise you at pickup.',
            },
            {
              icon: Mail, color: 'text-purple-500', bg: 'bg-purple-50',
              text: 'See your primary Google Account email address',
              sub: 'Used to verify campus affiliation',
              detail: 'Campus Ride will read the primary email address linked to your Google Account (e.g. your .edu.vn address). This email is used only to confirm you are enrolled at a partner university. It is never shown to other riders or sold to third parties.',
            },
            {
              icon: Shield, color: 'text-green-500', bg: 'bg-green-50',
              text: 'Associate you with your personal info on Google',
              sub: 'Verifies student status on sign-in',
              detail: 'Campus Ride uses your Google ID to keep your Campus Ride account linked to the same Google Account each time you sign in, so your ride history and saved places stay available across devices.',
            },
          ].map(({ icon: Icon, color, bg, text, sub, detail }, i) => {
            const open = expandedPermission === i;
            return (
              <div key={i} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => setExpandedPermission(open ? null : i)}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left hover:bg-gray-50 transition"
                  aria-expanded={open}
                >
                  <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center shrink-0`}>
                    <Icon size={14} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 leading-snug">{text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && (
                  <div className="px-3 pb-3 pl-[52px]">
                    <p className="text-[11px] text-gray-600 leading-relaxed">{detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-500 text-center mb-2 px-2 leading-relaxed">
          You can review or revoke access at any time in your Google Account. Before using this app, you can review Campus Ride's <span className="text-[#F26822] underline cursor-pointer" onClick={() => setToastMessage('Privacy policy is coming soon')}>privacy policy</span> and <span className="text-[#F26822] underline cursor-pointer" onClick={() => setToastMessage('Terms of service is coming soon')}>terms of service</span>.
        </p>

        <div className="w-full flex gap-3 mt-auto pt-2">
          <MuiButton variant="text" onClick={() => setView('sso')} className="flex-1 !text-[#F26822]">Cancel</MuiButton>
          <MuiButton onClick={handleAuthAllow} className="flex-1 !bg-[#F26822] hover:!bg-[#d95d1e]">Continue</MuiButton>
        </div>
      </div>
    </div>
  );

  // Multi-step Profile Setup
};