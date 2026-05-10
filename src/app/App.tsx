import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Backdrop } from './components/UI';
import { LoginView } from './views/LoginView';
import { SSOView } from './views/SSOView';
import { AuthView } from './views/AuthView';
import { ProfileSetupView } from './views/ProfileSetupView';
import { LocationPickSheet } from './views/LocationPickSheet';
import { HomeView } from './views/HomeView';
import { RideSetupSheet } from './views/RideSetupSheet';
import { SearchingView } from './views/SearchingView';
import { MatchedView } from './views/MatchedView';
import { DriverArrivedView } from './views/DriverArrivedView';
import { OnTripView } from './views/OnTripView';
import { ProfileSheet } from './views/ProfileSheet';
import { CancelModal } from './views/CancelModal';
import { ShareTripSheet } from './views/ShareTripSheet';
import { SameGenderInfoModal } from './views/SameGenderInfoModal';
import { PaymentPickerSheet } from './views/PaymentPickerSheet';
import { SosModal } from './views/SosModal';
import { SosPinModal } from './views/SosPinModal';
import { ChatOverlay } from './views/ChatOverlay';
import { CheckCircle } from 'lucide-react';

const AppContent = () => {
  const { view, activeOverlay, setActiveOverlay, showSameGenderInfo, setShowSameGenderInfo, showSosPinModal, setShowSosPinModal, toastMessage } = useAppContext();
  
  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto bg-gray-100 overflow-hidden relative shadow-2xl flex flex-col font-sans select-none">
      {view === 'login' && <LoginView />}
      {view === 'sso' && <SSOView />}
      {view === 'auth' && <AuthView />}
      {view === 'profileSetup' && <ProfileSetupView />}
      {view === 'home' && <HomeView />}
      {view === 'searching' && <SearchingView />}
      {view === 'matched' && <MatchedView />}
      {view === 'driverArrived' && <DriverArrivedView />}
      {view === 'ontrip' && <OnTripView />}

      <Backdrop 
        open={!!activeOverlay || showSameGenderInfo || showSosPinModal} 
        onClick={() => { 
          if (activeOverlay === 'sos') return;
          if (activeOverlay === 'paymentPicker') setActiveOverlay('setup');
          else setActiveOverlay(null);
          setShowSameGenderInfo(false); 
          setShowSosPinModal(false); 
        }} 
      />

      {activeOverlay === 'locationPick' && <LocationPickSheet />}
      {activeOverlay === 'setup' && <RideSetupSheet />}
      {activeOverlay === 'profile' && <ProfileSheet />}
      {activeOverlay === 'paymentPicker' && <PaymentPickerSheet />}
      {activeOverlay === 'share' && <ShareTripSheet />}
      {activeOverlay === 'sos' && <SosModal />}
      {activeOverlay === 'cancel' && <CancelModal />}
      
      {showSameGenderInfo && <SameGenderInfoModal />}
      {showSosPinModal && <SosPinModal />}
      
      {activeOverlay === 'chat' && (view === 'matched' || view === 'driverArrived' || view === 'ontrip') && <ChatOverlay />}

      {/* Global Toast */}
      <div className={`absolute top-safe inset-x-4 z-[60] transition-all duration-300 transform ${toastMessage ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-[#F26822] text-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-3 font-semibold text-sm">
          <CheckCircle size={20} />
          {toastMessage}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
