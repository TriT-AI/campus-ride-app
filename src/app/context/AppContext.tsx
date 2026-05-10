import React, { createContext, useContext, useState, useEffect } from 'react';
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

const AppContext = createContext<any>(null);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
const [view, setView] = useState('login'); // login, sso, auth, profileSetup, home, searching, matched, driverArrived, ontrip
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [hasActiveRide, setHasActiveRide] = useState(false);
  
  // Form States
  const [rideType, setRideType] = useState('pool');
  const [sameGender, setSameGender] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Profile Setup States
  const [profileStep, setProfileStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState('');
  
  // Payment methods state
  const [selectedPaymentMethodType, setSelectedPaymentMethodType] = useState('cash'); // Just for the form UI
  const [linkedPaymentMethods, setLinkedPaymentMethods] = useState<{ type: string; details: any }[]>([{ type: 'cash', details: null }]);
  const [setupEmergencyContacts, setSetupEmergencyContacts] = useState<{ name: string; phone: string; relation: string }[]>([]);
  const [newEcName, setNewEcName] = useState('');
  const [newEcPhone, setNewEcPhone] = useState('');
  const [newEcRelation, setNewEcRelation] = useState('');

  // Feature States
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [customContact, setCustomContact] = useState('');
  const [isSosActive, setIsSosActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Location pick states
  const [selectedDestination, setSelectedDestination] = useState('');
  const [mapPinPos, setMapPinPos] = useState({ x: 68, y: 38 });
  const [searchQuery, setSearchQuery] = useState('');

  // Completion flags driven by onboarding
  const [paymentConfigured, setPaymentConfigured] = useState(true);
  const [paymentLabel, setPaymentLabel] = useState('Cash');

  // Auth/OAuth UI
  const [expandedPermission, setExpandedPermission] = useState<number | null>(null);

  // Same-gender info modal
  const [showSameGenderInfo, setShowSameGenderInfo] = useState(false);

  // Chat
  const [chatMessages, setChatMessages] = useState<{ from: 'driver' | 'me'; text: string }[]>([
    { from: 'driver', text: "I'm parked near Building E." },
    { from: 'me', text: "Got it, walking there now!" },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Emergency contact editing
  const [editingContactIdx, setEditingContactIdx] = useState<number | null>(null);
  const [ecShowAdd, setEcShowAdd] = useState(false);

  // Bug fix states
  const [displayName, setDisplayName] = useState('Mia Nguyen');
  const [cancelReason, setCancelReason] = useState('');
  const [sosPinInput, setSosPinInput] = useState('');
  const [showSosPinModal, setShowSosPinModal] = useState(false);
  const [sosPin, setSosPin] = useState('');


  const VGU_ORANGE = "#F26822";

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (swipeProgress >= 90) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSosActive(true);
      setActiveOverlay(null);
      setTimeout(() => setSwipeProgress(0), 100);
    }
  }, [swipeProgress]);

  // Auto-transition: matched (driver found) → driverArrived after 8s
  useEffect(() => {
    if (view === 'matched') {
      const timer = setTimeout(() => {
         
        setView('driverArrived');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleReleaseSOS = () => {
    if (swipeProgress < 90) setSwipeProgress(0);
  };

  // Flow Triggers
  const handleLogin = () => setView('sso');
  const handleAuthorize = () => setView('auth');
  const handleAuthAllow = () => {
    setProfileStep(1);
    setView('profileSetup');
  };
  const handleFinishSetup = () => setView('home');
  // openRideSetup not used
  // const openRideSetup = () => setActiveOverlay('setup');
  const QUICK_LOCATIONS_PRESETS: Record<string, { x: number; y: number }> = {
    'Home': { x: 72, y: 28 },
    'Campus Library': { x: 42, y: 58 },
    'VGU Main Gate': { x: 55, y: 68 },
    'Heilbronn HBF': { x: 22, y: 32 },
  };
  const openLocationPick = (destName = '') => {
    setSearchQuery(''); // Always start with empty search (H3: User control)
    if (destName) {
      const preset = QUICK_LOCATIONS_PRESETS[destName];
      if (preset) setMapPinPos(preset);
      setSelectedDestination(destName);
    } else {
      setSelectedDestination('');
    }
    setActiveOverlay('locationPick');
  };
  
  // Timer state for search cancellation
  const [searchTimer, setSearchTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleBookRide = () => {
    setActiveOverlay(null);
    setView('searching');
    const timer = setTimeout(() => {
      setView('matched');
      setSearchTimer(null);
    }, 4000);
    setSearchTimer(timer);
  };
  const handleCancelConfirm = () => {
    if (searchTimer) {
      clearTimeout(searchTimer);
      setSearchTimer(null);
    }
    setActiveOverlay(null);
    setHasActiveRide(false);
    setCancelReason('');
    setView('home'); 
  };
  const handleBoardCar = () => { setHasActiveRide(true); setView('ontrip'); };

  const handleSendLink = () => {
    setToastMessage('Live tracking link shared successfully!');
    setActiveOverlay(null);
  };

  const handleLogout = () => {
    setView('login');
    setActiveOverlay(null);
    setHasActiveRide(false);
    setRideType('pool');
    setSameGender(false);
    setSwipeProgress(0);
    setProfileStep(1);
    setSelectedGender('');
    setSelectedPaymentMethodType('cash');
    setLinkedPaymentMethods([{ type: 'cash', details: null }]);
    setSetupEmergencyContacts([]);
    setSelectedContacts([]);
    setCustomContact('');
    setIsSosActive(false);
    setToastMessage('');
    setSelectedDestination('');
    setSearchQuery('');
    setPaymentConfigured(true);
    setPaymentLabel('Cash');
    setChatMessages([
      { from: 'driver', text: "I'm parked near Building E." },
      { from: 'me', text: "Got it, walking there now!" },
    ]);
    setChatInput('');
    setDisplayName('Mia Nguyen');
    setCancelReason('');
    setNewEcName('');
    setNewEcPhone('');
    setNewEcRelation('');
    setSosPinInput('');
    setShowSosPinModal(false);
  };

  const isValidPhone = (p: string) => /^[+]?[\d\s\-()]{7,}$/.test(p.trim()) && (p.match(/\d/g) || []).length >= 7;
  const isValidEcInput = newEcName.trim().length >= 1 && isValidPhone(newEcPhone);
  const handleAddEmergencyContact = () => {
    if (!isValidEcInput) {
      setToastMessage('Please enter a valid name and phone number');
      return;
    }
    setSetupEmergencyContacts(prev => [...prev, { name: newEcName.trim(), phone: newEcPhone.trim(), relation: newEcRelation || 'Contact' }]);
    setNewEcName('');
    setNewEcPhone('');
    setNewEcRelation('');
  };

  
  const QUICK_LOCATIONS_DATA = [
    { name: 'Home', sub: 'Sontheim Dorms', icon: Home, x: 72, y: 28 },
    { name: 'Campus Library', sub: 'University building', icon: Book, x: 42, y: 58 },
    { name: 'VGU Main Gate', sub: 'Meeting point', icon: MapPin, x: 55, y: 68 },
    { name: 'Heilbronn HBF', sub: 'Train station', icon: MapPin, x: 22, y: 32 },
  ];

  const ALL_SEARCHABLE_LOCATIONS = [
    ...QUICK_LOCATIONS_DATA,
    { name: 'Experimenta Science Center', sub: 'Museum', icon: MapPin, x: 35, y: 22 },
    { name: 'Heilbronn University (HHN)', sub: 'Education', icon: Book, x: 48, y: 42 },
    { name: 'Stadtgalerie Heilbronn', sub: 'Shopping Mall', icon: MapPin, x: 18, y: 55 },
    { name: 'BUGA Park Heilbronn', sub: 'Park', icon: MapPin, x: 30, y: 15 },
    { name: 'Harmonie Kino', sub: 'Cinema', icon: MapPin, x: 25, y: 70 },
    { name: 'Lidl HQ Neckarsulm', sub: 'Corporate', icon: MapPin, x: 80, y: 20 },
    { name: 'Hohenlohe Dorms', sub: 'Student Housing', icon: Home, x: 85, y: 45 },
  ];

  return (
    <AppContext.Provider value={{ view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, sosPin, setSosPin, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS }}>
      {children}
    </AppContext.Provider>
  );
};
