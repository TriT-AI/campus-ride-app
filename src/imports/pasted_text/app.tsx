import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, ArrowLeft, ShieldAlert, Share2, 
  Car, User, Navigation2, Star, MessageSquare, 
  MapPin, Clock, CheckCircle, X, AlertTriangle, 
  CreditCard, Plus, Link as LinkIcon, Phone,
  ChevronDown, Calendar, Users, Map as MapIcon,
  Home, Book, Briefcase, History, Hand, ChevronRight, Check, Activity
} from 'lucide-react';

export default function App() {
  // Application State Machine
  const [view, setView] = useState('login'); // login, sso, profileSetup, home, searching, matched, ontrip
  const [activeOverlay, setActiveOverlay] = useState(null); // setup, cancel, chat, share, sos, profile
  
  // Form States
  const [rideType, setRideType] = useState('pool'); // 'solo' or 'pool'
  const [sameGender, setSameGender] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  
  // Feature States
  const [selectedContacts, setSelectedContacts] = useState(['Roommate (Anna)']);
  const [customContact, setCustomContact] = useState('');
  const [isSosActive, setIsSosActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const VGU_ORANGE = "#F26822";

  // Toast Notification Logic
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Logic for Swipe-to-Alert
  useEffect(() => {
    if (swipeProgress >= 90) {
      setIsSosActive(true);
      setActiveOverlay(null);
      setTimeout(() => setSwipeProgress(0), 100);
    }
  }, [swipeProgress]);

  const handleReleaseSOS = () => {
    if (swipeProgress < 90) setSwipeProgress(0);
  };

  // Flow Triggers
  const handleLogin = () => setView('sso');
  const handleAuthorize = () => setView('profileSetup');
  const handleFinishSetup = () => setView('home');
  const openRideSetup = () => setActiveOverlay('setup');
  
  const handleBookRide = () => {
    setActiveOverlay(null);
    setView('searching');
    setTimeout(() => setView('matched'), 4000); // 4 seconds of searching
  };
  const handleCancelConfirm = () => {
    setActiveOverlay(null);
    setView('home'); 
  };
  const handleBoardCar = () => setView('ontrip');

  const handleSendLink = () => {
    setToastMessage('Live tracking link shared successfully!');
    setActiveOverlay(null);
  };

  // --- VGU INSPIRED MATERIAL COMPONENTS ---
  const MuiButton = ({ variant = 'contained', fullWidth, onClick, disabled, children, className = '' }) => {
    const baseStyle = "text-[15px] font-bold rounded-xl px-4 py-3.5 transition-all duration-200 flex items-center justify-center gap-2";
    const disabledStyle = "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 shadow-none";
    
    let variants = {};
    if (!disabled) {
      variants = {
        contained: 'bg-[#F26822] text-white hover:bg-[#d95514] active:scale-[0.98] shadow-sm',
        outlined: 'border-2 border-[#F26822] text-[#F26822] hover:bg-orange-50 active:scale-[0.98]',
        text: 'text-[#F26822] hover:bg-orange-50 active:scale-[0.98]',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-sm',
      };
    }

    return (
      <button 
        onClick={disabled ? undefined : onClick} 
        disabled={disabled}
        className={`${baseStyle} ${disabled ? disabledStyle : variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {children}
      </button>
    );
  };

  const Backdrop = ({ open, onClick, zIndex = 'z-40' }) => (
    <div 
      className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${zIndex} ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} 
      onClick={onClick}
    />
  );

  // --- VIEWS ---

  const LoginView = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white">
      <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
        <Car size={48} color={VGU_ORANGE} />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Campus Ride</h1>
      <p className="text-gray-500 text-center mb-12 text-sm">Secure, peer-to-peer ridesharing exclusively for verified university students and staff.</p>
      
      <MuiButton onClick={handleLogin} fullWidth variant="outlined" className="mb-4 bg-white border-gray-300 !text-gray-700 hover:bg-gray-50 border-[1px]">
        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
        Continue with Google
      </MuiButton>
    </div>
  );

  const SSOView = () => (
    <div className="flex flex-col h-full bg-white pt-14">
      <div className="p-4 flex items-center gap-3">
        <ArrowLeft onClick={() => setView('login')} className="cursor-pointer text-gray-800 hover:bg-gray-100 p-1 rounded-full" size={28} />
      </div>
      <div className="flex-1 p-6 flex flex-col items-center pt-6">
        <div className="text-center mb-8">
           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose an account</h2>
           <p className="text-gray-500">to continue to Campus Ride</p>
        </div>
        
        <div className="w-full border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:bg-gray-50 transition" onClick={handleAuthorize}>
          <div className="p-4 flex items-center gap-4 border-b border-gray-200">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
              M
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">Mia Nguyen</p>
              <p className="text-sm text-gray-500">mia.nguyen@student.edu.vn</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex items-center gap-4 hover:bg-gray-100 transition">
            <div className="w-12 h-12 flex items-center justify-center text-gray-600">
               <User size={24} />
            </div>
            <p className="font-semibold text-gray-700">Use another account</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileSetupView = () => (
    <div className="flex flex-col h-full bg-white pt-14">
      <div className="p-4 flex items-center gap-3">
        <ArrowLeft onClick={() => setView('login')} className="cursor-pointer text-gray-800" size={24}/>
        <span className="font-bold text-gray-900 text-lg">Initial Setup</span>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Mia!</h2>
          <p className="text-gray-500">Add a payment method for splitting ride costs before your first trip.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 mb-6 shadow-sm">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><CreditCard size={18} color={VGU_ORANGE}/> Payment Method</h3>
           <input type="text" defaultValue="MIA NGUYEN" className="w-full mb-4 border-b border-gray-300 py-2 focus:outline-none focus:border-[#F26822] text-gray-800 font-medium"/>
           <input type="text" placeholder="Card Number" className="w-full mb-4 border-b border-gray-300 py-2 focus:outline-none focus:border-[#F26822] text-gray-800"/>
           <div className="flex gap-4">
             <input type="text" placeholder="MM/YY" className="w-1/2 border-b border-gray-300 py-2 focus:outline-none focus:border-[#F26822] text-gray-800"/>
             <input type="text" placeholder="CVV" className="w-1/2 border-b border-gray-300 py-2 focus:outline-none focus:border-[#F26822] text-gray-800"/>
           </div>
        </div>
        
        <MuiButton onClick={handleFinishSetup} fullWidth>Complete Setup</MuiButton>
        <MuiButton variant="text" onClick={handleFinishSetup} fullWidth className="mt-2 text-gray-500">Skip for now</MuiButton>
      </div>
    </div>
  );

  // Home View
  const HomeView = () => (
    <div className="flex flex-col h-full bg-[#F3F4F6] relative pt-12">
      {/* Top Graphic Header */}
      <div className="bg-orange-100 rounded-b-[2.5rem] px-5 pt-4 pb-12 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
          <Car size={150} color={VGU_ORANGE} />
        </div>
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div onClick={() => setActiveOverlay('profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer">
             <User size={20} className="text-gray-800" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Transport</h1>
          <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm font-semibold text-sm cursor-pointer">
            <MapIcon size={16} /> Map
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10 w-2/3">Wherever you're going, let's get you there!</h2>
      </div>

      {/* Floating "Where to?" Card */}
      <div className="px-5 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-md p-2 flex items-center h-16">
          <div className="flex items-center flex-1 pl-3 cursor-text" onClick={openRideSetup}>
             <div className="w-2 h-2 bg-red-500 rounded-full mr-3 ring-4 ring-red-100"></div>
             <span className="text-gray-500 font-semibold text-[15px]">Where to?</span>
          </div>
          <div className="border-l border-gray-200 h-8 mx-2"></div>
          <div className="flex items-center gap-1.5 px-3 cursor-pointer hover:bg-gray-50 rounded-lg py-2" onClick={openRideSetup}>
             <Calendar size={16} className="text-gray-600"/>
             <span className="font-bold text-sm text-gray-800">Now</span>
             <ChevronDown size={16} className="text-gray-500"/>
          </div>
        </div>
      </div>

      {/* Saved Places List */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between cursor-pointer" onClick={openRideSetup}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"><Home size={20}/></div>
              <div>
                <p className="font-bold text-gray-900 text-base">Home</p>
                <p className="text-xs text-gray-500 truncate w-48">12km • Sontheim Dorms, Heilbronn</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">€1.50</p>
          </div>

          <div className="flex items-center justify-between cursor-pointer" onClick={openRideSetup}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600"><Book size={20}/></div>
              <div>
                <p className="font-bold text-gray-900 text-base">Campus Library</p>
                <p className="text-xs text-gray-500 truncate w-48">2km • LIV Bildungscampus</p>
              </div>
            </div>
            <p className="font-semibold text-gray-800">€1.00</p>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mt-10 mb-4 text-lg">More ways to travel</h3>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 cursor-pointer" onClick={openRideSetup}>
           <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar size={24} color={VGU_ORANGE}/>
           </div>
           <p className="font-bold text-gray-900 text-base">Make an Advance Booking</p>
        </div>
      </div>

      {/* Fake Bottom Navigation */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 pb-8 flex justify-between items-center rounded-b-[2.5rem]">
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <Home size={24} color={VGU_ORANGE} className="fill-current"/>
          <span className="text-[10px] font-bold text-[#F26822]">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-gray-600">
          <History size={24} />
          <span className="text-[10px] font-semibold">Activity</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-gray-600">
          <MessageSquare size={24} />
          <span className="text-[10px] font-semibold">Messages</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer hover:text-gray-600">
          <User size={24} />
          <span className="text-[10px] font-semibold">Account</span>
        </div>
      </div>
    </div>
  );

  // Full Screen Ride Setup Overlay (Map + Bottom Sheet)
  const RideSetupSheet = () => (
    <div className={`absolute inset-0 bg-gray-100 z-40 transition-transform duration-300 flex flex-col ${activeOverlay === 'setup' ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Map Half */}
      <div className="h-[45%] relative bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] bg-blue-50 pt-14">
        {/* Back Button */}
        <div className="absolute top-14 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer z-10" onClick={() => setActiveOverlay(null)}>
          <ArrowLeft size={20} className="text-gray-800" />
        </div>
        {/* Fake Route */}
        <svg className="absolute inset-0 w-full h-full text-[#F26822]" preserveAspectRatio="none">
           <path d="M 100 150 Q 200 100 300 220" stroke="currentColor" strokeWidth="5" fill="none" />
           <circle cx="100" cy="150" r="8" fill="#3B82F6" stroke="white" strokeWidth="3" />
           <circle cx="300" cy="220" r="8" fill="#EF4444" stroke="white" strokeWidth="3" />
        </svg>
      </div>

      {/* Bottom Sheet Half */}
      <div className="h-[55%] bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex flex-col relative z-20">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2"></div>
        
        <div className="flex-1 overflow-y-auto px-5">
          {/* Ride Options List */}
          <div className="space-y-4 mb-6 mt-2">
            
            {/* Solo Option */}
            <div 
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${rideType === 'solo' ? 'border-[#F26822] bg-orange-50/50' : 'border-transparent hover:bg-gray-50'}`}
              onClick={() => setRideType('solo')}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src="https://cdn-icons-png.flaticon.com/512/3204/3204001.png" alt="car" className="w-10 opacity-80" />
                  <div className="absolute -bottom-1 -right-1 bg-[#F26822] text-white text-[8px] font-bold px-1 rounded">SOLO</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">Campus Solo</p>
                    <div className="flex items-center text-gray-500 text-xs"><User size={10} className="mr-0.5"/> 4</div>
                  </div>
                  <p className="text-xs text-gray-500">2 mins away • 10:45 AM drop-off</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <p className="font-bold text-gray-900">€3.50</p>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${rideType === 'solo' ? 'bg-[#F26822] border-[#F26822] text-white' : 'border-gray-300'}`}>
                  {rideType === 'solo' && <Check size={14}/>}
                </div>
              </div>
            </div>

            {/* Pool Option */}
            <div 
              className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${rideType === 'pool' ? 'border-[#F26822] bg-orange-50/50' : 'border-transparent hover:bg-gray-50'}`}
              onClick={() => setRideType('pool')}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src="https://cdn-icons-png.flaticon.com/512/3204/3204001.png" alt="car" className="w-10 opacity-80" />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-[8px] font-bold px-1 rounded">POOL</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">Campus Pool</p>
                    <div className="flex items-center text-gray-500 text-xs"><Users size={10} className="mr-0.5"/> 2</div>
                  </div>
                  <p className="text-xs text-gray-500 text-[#F26822] font-medium">Get matched in 2 mins or less</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <p className="font-bold text-gray-900">€1.50</p>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${rideType === 'pool' ? 'bg-[#F26822] border-[#F26822] text-white' : 'border-gray-300'}`}>
                  {rideType === 'pool' && <Check size={14}/>}
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-100 py-4 space-y-4">
             {/* Payment Row */}
             <div className="flex justify-between items-center cursor-pointer">
               <div className="flex items-center gap-3">
                 <div className="bg-blue-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded italic">VISA</div>
                 <span className="font-semibold text-gray-800 text-sm">•••• 1234</span>
               </div>
               <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                  <User size={14}/> Personal <ChevronRight size={16} className="text-gray-400"/>
               </div>
             </div>

             {/* Same Gender Filter */}
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-sm">Same-Gender Only</span>
                  <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-[10px]">i</div>
                </div>
                <div 
                  className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors relative ${sameGender ? 'bg-[#F26822]' : 'bg-gray-300'}`}
                  onClick={() => setSameGender(!sameGender)}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform absolute top-1 ${sameGender ? 'left-6' : 'left-1'}`}></div>
                </div>
             </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-5 pb-8 bg-white border-t border-gray-100">
          <MuiButton onClick={handleBookRide} fullWidth>
            Book {rideType === 'solo' ? 'Campus Solo' : 'Campus Pool'}
          </MuiButton>
        </div>
      </div>
    </div>
  );

  // Searching View
  const SearchingView = () => (
    <div className="flex flex-col h-full bg-white pt-16 px-5 relative overflow-hidden">
      <div className="absolute top-14 left-4 w-10 h-10 flex items-center justify-center cursor-pointer z-10" onClick={() => setView('home')}>
          <ChevronDown size={28} className="text-gray-800" />
      </div>

      <div className="mt-14 flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">We're finding a driver</h2>
          <p className="text-sm text-gray-500">10 Mar, 2026 • 4:30PM</p>
        </div>
        <div className="bg-orange-50 p-3 rounded-full">
          <Activity size={28} color={VGU_ORANGE} className="animate-pulse" />
        </div>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 bg-[#F26822] rounded-full"></div>
        <div className="h-1.5 flex-1 bg-[#F26822] rounded-full opacity-40 animate-pulse"></div>
        <div className="h-1.5 flex-1 bg-gray-200 rounded-full"></div>
      </div>

      {/* Info Card */}
      <div className="border border-gray-200 rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-5">If plans change</h3>
        
        <div className="flex gap-4 mb-5">
          <Hand size={20} className="text-orange-500 shrink-0"/>
          <div>
            <p className="font-bold text-sm text-gray-900">Prioritized rematching</p>
            <p className="text-xs text-gray-500 mt-1">Your ride will be prioritized even if a driver has to cancel for any reason.</p>
          </div>
        </div>

        <div className="flex gap-4 mb-5">
          <Clock size={20} className="text-blue-500 shrink-0"/>
          <div>
            <p className="font-bold text-sm text-gray-900">Cancel for free up to 1 minute before</p>
            <p className="text-xs text-gray-500 mt-1">If you cancel after 1 minute, you'll be charged a small penalty fee.</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <MessageSquare size={20} className="text-purple-500 shrink-0"/>
          <div>
            <p className="font-bold text-sm text-gray-900">Need to connect with your driver?</p>
            <p className="text-xs text-gray-500 mt-1">Chat opens immediately after match.</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-2xl p-4 flex justify-between items-center mb-8">
         <div className="flex items-center gap-3">
           <div className="bg-blue-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded italic">VISA</div>
           <span className="font-semibold text-gray-800 text-sm">1234</span>
         </div>
         <p className="font-bold text-gray-900">€1.50</p>
      </div>

      <div className="mt-auto pb-8">
         <MuiButton variant="text" onClick={() => setView('home')} fullWidth className="text-gray-500 bg-gray-100 hover:bg-gray-200">
           Cancel Booking
         </MuiButton>
      </div>
    </div>
  );

  // 4. Evaluation Dashboard (Matched)
  const MatchedView = () => (
    <div className="relative h-full w-full bg-gray-100 flex flex-col">
      <div className="bg-white shadow-sm z-20 px-5 py-4 rounded-b-3xl absolute top-0 inset-x-0 flex items-center justify-between pt-14">
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
        
        {/* Driver Profile Card */}
        <div className="border border-gray-100 bg-gray-50 rounded-2xl p-4 flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
            <img src="https://i.pravatar.cc/150?u=lukas" alt="Driver" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 text-lg">Lukas (IT)</h3>
              <div className="flex items-center text-gray-600 text-xs font-bold bg-white px-1.5 py-0.5 rounded-full border border-gray-200">
                <Star size={10} fill="#f59e0b" className="text-amber-500 mr-1"/> 4.9
              </div>
            </div>
            <p className="text-sm text-gray-500">VW Golf Black • HN-VX 123</p>
          </div>
          <div 
            onClick={() => setActiveOverlay('chat')}
            className="w-10 h-10 bg-orange-100 text-[#F26822] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition"
          >
            <MessageSquare size={18} fill="currentColor" className="text-orange-600"/>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pb-4">
          <MuiButton onClick={handleBoardCar} fullWidth>
            Board Car (Start Trip)
          </MuiButton>
          <MuiButton variant="text" onClick={() => setActiveOverlay('cancel')} fullWidth className="text-gray-500 bg-gray-100">
            Cancel Ride
          </MuiButton>
        </div>
      </div>
    </div>
  );

  // 5. On-Trip Tracking & Safety
  const OnTripView = () => {
    if (isSosActive) {
      return (
        <div className="relative h-full w-full bg-red-600 flex flex-col items-center justify-center text-white p-6 text-center animate-[pulse_2s_ease-in-out_infinite] rounded-[3.5rem]">
           <ShieldAlert size={80} className="text-white mb-6" />
           <h1 className="text-3xl font-black tracking-widest mb-2">SOS ACTIVE</h1>
           <p className="text-red-100 mb-12">Security team has been dispatched to your location. Stay calm.</p>
           
           <MuiButton 
             variant="text" 
             onClick={() => setIsSosActive(false)} 
             className="bg-white text-red-600 hover:bg-gray-100 w-full"
           >
             Cancel Alert (Requires PIN)
           </MuiButton>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full bg-white flex flex-col pt-14">
        {/* Important Info at TOP */}
        <div className="bg-white p-5 z-20 absolute top-14 inset-x-0 shadow-sm border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Drop-off at</p>
              <h2 className="text-3xl font-black text-gray-900 mt-0.5">22:45</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">Destination</p>
              <p className="font-bold text-gray-800 mt-1">Sontheim Dorms</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-blue-50 mt-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full shadow-lg -ml-5 -mt-5 flex justify-center items-center">
              <Car size={20} color={VGU_ORANGE} />
          </div>
        </div>

        <div className="p-5 pb-10 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
          {/* Safety Core Suite */}
          <h3 className="font-bold text-gray-900 mb-4 text-center">Safety Tools</h3>
          <div className="flex gap-4">
            <MuiButton 
              variant="outlined" 
              onClick={() => setActiveOverlay('share')} 
              className="flex-1"
            >
              <Share2 size={18} /> Share Trip
            </MuiButton>
            <MuiButton 
              variant="danger" 
              onClick={() => setActiveOverlay('sos')} 
              className="flex-1"
            >
              <ShieldAlert size={18} /> SOS Alert
            </MuiButton>
          </div>
        </div>
      </div>
    );
  };


  // --- OVERLAYS & MODALS ---
  
  const ProfileSheet = () => (
    <div className={`absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-50 transition-transform duration-300 flex flex-col max-h-[90%] ${activeOverlay === 'profile' ? 'translate-y-0' : 'translate-y-full'}`}>
       <div className="p-5 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Profile</h2>
          <X size={24} className="text-gray-400 cursor-pointer" onClick={() => setActiveOverlay(null)} />
       </div>
       <div className="p-6 overflow-y-auto">
          <div className="flex items-center gap-4 mb-8">
             <div className="w-16 h-16 bg-orange-100 text-[#F26822] rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">M</div>
             <div>
                <h3 className="text-xl font-bold text-gray-900">Mia Nguyen</h3>
                <p className="text-gray-500 text-sm">Student ID: 123456</p>
                <div className="flex items-center gap-1 text-[10px] text-orange-700 font-bold bg-orange-100 px-2 py-1 rounded-full w-max mt-1 uppercase tracking-wider">
                  <CheckCircle size={10}/> Verified
                </div>
             </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center justify-between">
              Emergency Contacts
              <Plus size={18} className="text-[#F26822] cursor-pointer bg-orange-50 rounded-full p-0.5" />
            </h4>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex justify-between items-center">
               <div>
                 <p className="font-bold text-gray-900">Mom</p>
                 <p className="text-sm text-gray-500">+84 987 654 321</p>
               </div>
               <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                 Primary SOS
               </div>
            </div>
          </div>

          <MuiButton variant="text" onClick={() => setView('login')} fullWidth className="text-red-600 bg-red-50 hover:bg-red-100">Log Out</MuiButton>
       </div>
    </div>
  );

  const CancelModal = () => (
    <div className={`absolute inset-0 z-50 flex items-center justify-center p-5 transition-opacity ${activeOverlay === 'cancel' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="bg-white rounded-[2rem] shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Ride?</h3>
        <p className="text-sm text-gray-500 mb-6">Please select a reason for cancellation. This helps us improve the matching engine.</p>
        
        <div className="space-y-3 mb-8">
          {['Wait time too long', 'Driver unresponsive', 'Found another way'].map(reason => (
            <label key={reason} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
              <input type="radio" name="cancel_reason" className="text-[#F26822] focus:ring-[#F26822] h-4 w-4 accent-[#F26822]" />
              <span className="text-sm font-medium text-gray-800">{reason}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <MuiButton variant="text" onClick={() => setActiveOverlay(null)} className="flex-1 bg-gray-100 text-gray-700">Back</MuiButton>
          <MuiButton variant="danger" onClick={handleCancelConfirm} className="flex-1">Cancel Ride</MuiButton>
        </div>
      </div>
    </div>
  );

  const ShareTripSheet = () => {
    const handleToggleContact = (contact) => {
      setSelectedContacts(prev => 
        prev.includes(contact) ? prev.filter(c => c !== contact) : [...prev, contact]
      );
    };

    const isShareDisabled = selectedContacts.length === 0 && customContact.trim() === '';

    return (
      <div className={`absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-50 transition-transform duration-300 flex flex-col max-h-[85%] ${activeOverlay === 'share' ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Share Live Location</h2>
          <X size={24} className="text-gray-400 cursor-pointer" onClick={() => setActiveOverlay(null)} />
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-500 mb-6">Select emergency contacts or input a custom number to share your live GPS telemetry.</p>
          
          <div className="space-y-3 mb-8">
            {['Roommate (Anna)', 'Study Group Chat'].map((contact) => (
              <div 
                key={contact} 
                onClick={() => handleToggleContact(contact)}
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${selectedContacts.includes(contact) ? 'border-[#F26822] bg-orange-50/50' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${selectedContacts.includes(contact) ? 'bg-[#F26822] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {contact[0]}
                  </div>
                  <span className={`font-semibold ${selectedContacts.includes(contact) ? 'text-gray-900' : 'text-gray-700'}`}>{contact}</span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${selectedContacts.includes(contact) ? 'bg-[#F26822] border-[#F26822] text-white' : 'border-gray-300'}`}>
                  {selectedContacts.includes(contact) && <Check size={14} />}
                </div>
              </div>
            ))}

            <div className="relative mt-6">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Phone size={18} className="text-gray-400" />
               </div>
               <input 
                 type="text" 
                 placeholder="Other phone number..." 
                 value={customContact}
                 onChange={(e) => setCustomContact(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26822] text-gray-800 font-medium bg-gray-50"
               />
            </div>
            
            <div className="flex items-center gap-2 p-4 text-[#F26822] cursor-pointer hover:bg-orange-50 rounded-xl transition mt-2">
               <LinkIcon size={18} />
               <span className="font-bold text-sm">Copy Link Manually</span>
            </div>
          </div>
          
          <MuiButton onClick={handleSendLink} disabled={isShareDisabled} fullWidth>
            Send Live Link
          </MuiButton>
        </div>
      </div>
    );
  };

  const renderSOSModal = () => (
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
          <div className="absolute left-1 top-1 bottom-1 bg-red-600/20 z-0 pointer-events-none rounded-full transition-all duration-75" style={{ width: `${swipeProgress}%`}}></div>
        </div>

        <MuiButton variant="text" onClick={() => setActiveOverlay(null)} className="w-full text-gray-500 bg-gray-100 relative z-10 mt-2">
          Cancel
        </MuiButton>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-100 flex items-start sm:items-center justify-center p-4 sm:p-8 font-sans text-gray-900 overflow-y-auto">
      {/* iPhone 17 Pro Max Frame */}
      <div className="w-full max-w-[430px] h-[85vh] min-h-[800px] max-h-[932px] bg-black rounded-[3.5rem] shadow-2xl overflow-hidden border-[12px] border-black relative flex flex-col ring-1 ring-gray-800 flex-shrink-0 mt-4 sm:mt-0 mb-8 sm:mb-0">
        
        {/* Dynamic Island (iPhone 14 Pro onwards style) */}
        <div className="absolute top-3 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-[120px] h-[35px] bg-black rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"></div>
        </div>

        {/* Screen Content Router */}
        <div className="flex-1 relative bg-white overflow-hidden rounded-[2.5rem]">
          {view === 'login' && <LoginView />}
          {view === 'sso' && <SSOView />}
          {view === 'profileSetup' && <ProfileSetupView />}
          {view === 'home' && <HomeView />}
          {view === 'searching' && <SearchingView />}
          {view === 'matched' && <MatchedView />}
          {view === 'ontrip' && <OnTripView />}
        </div>

        {/* Global Overlays & Backdrops */}
        <Backdrop open={!!activeOverlay} onClick={() => activeOverlay !== 'sos' && setActiveOverlay(null)} />
        <ProfileSheet />
        <RideSetupSheet />
        <CancelModal />
        <ShareTripSheet />
        {renderSOSModal()}
        
        {/* Chat Overlay */}
        <div className={`absolute inset-x-0 bottom-0 top-1/4 bg-white rounded-t-3xl z-50 shadow-2xl transition-transform duration-300 flex flex-col ${activeOverlay === 'chat' ? 'translate-y-0' : 'translate-y-full'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-[#F26822] text-white rounded-t-3xl pt-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><User size={20}/></div>
                 <div>
                   <h3 className="font-bold text-lg">Lukas</h3>
                   <p className="text-xs text-orange-100">VW Golf Black • HN-VX 123</p>
                 </div>
              </div>
              <X onClick={() => setActiveOverlay(null)} className="cursor-pointer" size={28}/>
           </div>
           <div className="flex-1 bg-gray-50 p-5 overflow-y-auto flex flex-col gap-4">
              <div className="bg-gray-200 text-gray-800 p-3.5 rounded-2xl rounded-tl-none w-3/4 text-sm shadow-sm">I'm parked near Building E.</div>
              <div className="bg-[#F26822] text-white p-3.5 rounded-2xl rounded-tr-none w-3/4 ml-auto text-sm shadow-sm">Got it, walking there now!</div>
           </div>
           <div className="p-4 border-t bg-white pb-8">
             <div className="bg-gray-100 rounded-full px-5 py-3 text-gray-500 text-sm flex items-center justify-between">
                Type a quick reply... <div className="bg-[#F26822] text-white p-1.5 rounded-full"><ArrowLeft className="transform rotate-180" size={16}/></div>
             </div>
           </div>
        </div>

        {/* Global Toast Notification */}
        <div className={`absolute top-16 inset-x-4 z-[60] transition-all duration-300 transform ${toastMessage ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
           <div className="bg-[#F26822] text-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-sm">
              <CheckCircle size={20} />
              {toastMessage}
           </div>
        </div>

      </div>
    </div>
  );
}