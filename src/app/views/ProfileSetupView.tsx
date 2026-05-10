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
import { AddEmergencyContactForm } from '../components/AddEmergencyContactForm';

export const ProfileSetupView = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, sosPin, setSosPin, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();

  const [highlightMissing, setHighlightMissing] = React.useState(false);
  const triggerHighlight = () => {
    setHighlightMissing(true);
    setTimeout(() => setHighlightMissing(false), 1000);
  };

    const stepMeta = [
      { label: 'Profile', title: 'Your profile', subtitle: 'Help co-riders recognise you' },
      { label: 'Payment', title: 'Payment method', subtitle: 'Choose how to split ride costs' },
      { label: 'Safety', title: 'Emergency contact', subtitle: "We'll notify them if you trigger SOS" },
      { label: 'Security', title: 'Setup SOS PIN', subtitle: '4-digit code to cancel false alerts' },
    ];
    const current = stepMeta[profileStep - 1];

    const genderOptions = [
      { id: 'female', label: 'Female', icon: '♀', color: 'text-pink-500', bg: 'bg-orange-50', ring: 'ring-orange-200', activeBg: 'bg-orange-50', activeBorder: 'border-[#F26822]' },
      { id: 'male', label: 'Male', icon: '♂', color: 'text-blue-500', bg: 'bg-orange-50', ring: 'ring-orange-200', activeBg: 'bg-orange-50', activeBorder: 'border-[#F26822]' },
      { id: 'nonbinary', label: 'Non-binary', icon: '⚧', color: 'text-violet-500', bg: 'bg-orange-50', ring: 'ring-orange-200', activeBg: 'bg-orange-50', activeBorder: 'border-[#F26822]' },
    ];

    const paymentOptions = [
      { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', color: 'text-[#F26822]', bg: 'bg-orange-50' },
      { id: 'momo', icon: Smartphone, label: 'MoMo Wallet', color: 'text-pink-600', bg: 'bg-pink-50' },
      { id: 'zalopay', icon: Wallet, label: 'ZaloPay', color: 'text-[#F26822]', bg: 'bg-sky-50' },
      { id: 'cash', icon: Banknote, label: 'Cash (pay driver directly)', color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const isButtonDisabled = (profileStep === 1 && displayName.trim() === '') || (profileStep === 2 && linkedPaymentMethods.length === 0) || (profileStep === 3 && setupEmergencyContacts.length === 0) || (profileStep === 4 && sosPin.length < 4);

    return (
      <div className="flex flex-col h-full bg-white pt-safe">
        {/* Header */}
        <div className="px-5 pt-2 pb-3 flex items-center gap-3 border-b border-gray-100">
          <ArrowLeft
            onClick={() => profileStep > 1 ? setProfileStep(profileStep - 1) : setView('auth')}
            className="cursor-pointer text-gray-800 shrink-0"
            size={24}
          />
          <div className="flex-1">
            <p className="font-bold text-gray-900">{current.title}</p>
            <p className="text-xs text-gray-400">{current.subtitle}</p>
          </div>
          <span className="text-xs text-gray-400 font-semibold">{profileStep} / 4</span>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pt-3 pb-2">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= profileStep ? 'bg-[#F26822]' : 'bg-gray-200'}`} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {stepMeta.map((s, i) => (
              <span key={i} className={`text-[10px] font-semibold ${i + 1 <= profileStep ? 'text-[#F26822]' : 'text-gray-400'}`}>{s.label}</span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {/* STEP 1: Profile Info */}
          {profileStep === 1 && (
            <div className="space-y-5">
              {/* Success banner */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Authentication successful!</p>
                  <p className="text-xs text-gray-500">Welcome to Campus Ride, Mia 👋 Just a few quick steps to get you started.</p>
                </div>
              </div>

              {/* Name field */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 font-semibold ${highlightMissing && displayName.trim() === '' ? 'ring-4 ring-red-500/50 border-red-500' : 'border-gray-200 focus:border-[#F26822] bg-gray-50 text-gray-800'}`}
                />
              </div>

              {/* Verified email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">University Email</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                  <Mail size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-600 flex-1">mia.nguyen@student.edu.vn</span>
                  <div className="flex items-center gap-1 text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    <CheckCircle size={10} /> Verified
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">I identify as</label>
                <div className="grid grid-cols-3 gap-2">
                  {genderOptions.map(g => {
                    const active = selectedGender === g.id;
                    return (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGender(g.id)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          active
                            ? `${g.activeBorder} ${g.activeBg} shadow-sm ring-2 ${g.ring}`
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <span className={`text-sm ${g.color}`}>{g.icon}</span>
                        <span className={`text-xs font-bold transition-colors ${active ? 'text-gray-900' : 'text-gray-600'}`}>{g.label}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-400 mt-2 text-center">Used for same-gender ride matching.</p>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {profileStep === 2 && (
            <div className={`space-y-4 rounded-3xl transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
              <p className="text-sm text-gray-500">Pick your preferred payment method. Ride costs are split automatically between matched riders.</p>

              {/* Options — setup form appears inline directly below the selected card */}
              <div className="space-y-5">
                {[
                  { title: 'Cash', options: paymentOptions.filter(o => o.id === 'cash') },
                  { title: 'Credit / Debit Card', options: paymentOptions.filter(o => o.id === 'card') },
                  { title: 'Other method', options: paymentOptions.filter(o => o.id === 'momo' || o.id === 'zalopay') }
                ].map(group => group.options.length > 0 && (
                  <div key={group.title} className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{group.title}</p>
                    {group.options.map(opt => {
                      const isLinked = linkedPaymentMethods.some(pm => pm.type === opt.id);
                      const isSelectedToLink = selectedPaymentMethodType === opt.id;
                      
                      return (
                      <React.Fragment key={opt.id}>
                        {/* Option card */}
                        <div
                          onClick={() => {
                            setSelectedPaymentMethodType(isSelectedToLink ? '' : opt.id);
                          }}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelectedToLink ? 'border-[#F26822] bg-orange-50/40' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                        >
                          <div className={`w-10 h-10 ${opt.bg} rounded-xl flex items-center justify-center shrink-0`}>
                            {opt.icon && <opt.icon size={20} className={opt.color} />}
                          </div>
                          <span className={`flex-1 font-semibold text-sm ${isSelectedToLink ? 'text-gray-900' : 'text-gray-700'}`}>{opt.label}</span>
                          
                          {isLinked && opt.id !== 'cash' && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold shrink-0">
                               Linked
                            </div>
                          )}
                        </div>

                        {/* Card setup — inline below card option */}
                        {isSelectedToLink && !isLinked && opt.id === 'card' && (
                          <div className="ml-2 bg-gray-50 border border-gray-200 rounded-b-2xl rounded-tr-2xl p-4 space-y-3 border-t-0 -mt-1 pt-5">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Card Details</p>
                            <input type="text" defaultValue="MIA NGUYEN" placeholder="Cardholder Name" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F26822] text-gray-800 bg-white text-sm" />
                            <input type="text" placeholder="Card Number (16 digits)" maxLength={16} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F26822] text-gray-800 bg-white text-sm" />
                            <div className="flex gap-3">
                              <input type="text" placeholder="MM/YY" maxLength={5} onInput={(e) => { let v = e.currentTarget.value.replace(/\D/g, ''); if (v.length >= 2) { v = v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : ''); } e.currentTarget.value = v; }} className="w-1/2 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F26822] text-gray-800 bg-white text-sm" />
                              <input type="text" placeholder="CVV" maxLength={4} onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')} className="w-1/2 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F26822] text-gray-800 bg-white text-sm" />
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setLinkedPaymentMethods(prev => [...prev, { type: 'card', details: 'card' }]);
                              }}
                              className={`w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md bg-[#F26822] hover:bg-[#d95d1e] shadow-[#F26822]/30`}
                            >
                              Link Card
                            </button>
                          </div>
                        )}

                        {/* MoMo / ZaloPay setup — inline below selected e-wallet option */}
                        {isSelectedToLink && !isLinked && (opt.id === 'momo' || opt.id === 'zalopay') && (
                          <div className="ml-2 bg-gray-50 border border-gray-200 rounded-b-2xl rounded-tr-2xl p-4 space-y-3 border-t-0 -mt-1 pt-5">
                            <p className="text-sm text-gray-600">You will be redirected to the {opt.id === 'momo' ? 'MoMo' : 'ZaloPay'} app to authorize the connection.</p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setLinkedPaymentMethods(prev => [...prev, { type: opt.id, details: 'wallet' }]);
                              }}
                              className={`w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition ${opt.id === 'momo' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-sky-500 hover:bg-sky-600'}`}
                            >
                              <>{opt.id === 'momo' ? <Smartphone size={16} /> : <Wallet size={16} />} Open {opt.id === 'momo' ? 'MoMo' : 'ZaloPay'} App</>
                            </button>
                          </div>
                        )}

                        {/* Cash note — inline below cash option */}
                        {isSelectedToLink && opt.id === 'cash' && (
                          <div className="ml-2 bg-green-50 border border-green-200 rounded-b-2xl rounded-tr-2xl p-4 flex gap-3 border-t-0 -mt-1 pt-5">
                            <Banknote size={18} className="text-green-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-green-800">You'll settle with the driver in cash at the end of each ride. Please have the exact amount ready when possible.</p>
                          </div>
                        )}
                      </React.Fragment>
                    )})}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Emergency Contact */}
          {profileStep === 3 && (
            <div className={`space-y-4 rounded-3xl transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50' : ''}`}>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3">
                <ShieldAlert size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">If you trigger an SOS alert during a ride, we'll instantly notify your emergency contacts with your live GPS location.</p>
              </div>

              {/* Contacts list */}
              {setupEmergencyContacts.length > 0 && (
                <div className="space-y-2">
                  {setupEmergencyContacts.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600 shrink-0">
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.phone} · {c.relation}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {i === 0 && <div className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Primary</div>}
                        <Trash2
                          size={16}
                          className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                          onClick={() => { if (window.confirm(`Remove ${c.name} from emergency contacts?`)) setSetupEmergencyContacts(prev => prev.filter((_, idx) => idx !== i)); }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add contact form */}
              {setupEmergencyContacts.length < 3 && (
                <AddEmergencyContactForm />
              )}
            </div>
          )}

          {/* STEP 4: SOS PIN */}
          {profileStep === 4 && (
            <div className={`space-y-6 rounded-3xl transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50 p-2' : ''}`}>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-3">
                <Shield size={18} className="text-[#F26822] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">Set a 4-digit PIN to securely cancel SOS alerts or manage sensitive safety settings.</p>
              </div>

              <div className="flex flex-col items-center">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Create your 4-digit PIN</label>
                <div className="flex gap-4">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className={`w-14 h-16 bg-gray-50 border-2 rounded-2xl flex items-center justify-center transition-all duration-300 ${highlightMissing ? 'ring-4 ring-red-500/50 border-red-500' : 'border-gray-200'}`}>
                      <span className="text-2xl font-bold text-gray-900">{sosPin[i] || '•'}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mt-8">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                    <button
                      key={n}
                      onClick={() => { if (sosPin.length < 4) setSosPin(prev => prev + n); }}
                      className="h-14 bg-white border border-gray-100 rounded-xl font-bold text-xl text-gray-800 active:bg-gray-50 transition"
                    >{n}</button>
                  ))}
                  <button onClick={() => setSosPin('')} className="h-14 font-bold text-gray-400">Clear</button>
                  <button
                    onClick={() => { if (sosPin.length < 4) setSosPin(prev => prev + '0'); }}
                    className="h-14 bg-white border border-gray-100 rounded-xl font-bold text-xl text-gray-800 active:bg-gray-50 transition"
                  >0</button>
                  <button onClick={() => setSosPin(prev => prev.slice(0, -1))} className="h-14 flex items-center justify-center text-gray-400">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-5 border-t border-gray-100 bg-white space-y-2" onClick={() => { if (isButtonDisabled) triggerHighlight(); }}>
          {profileStep === 2 && linkedPaymentMethods.length === 0 && (
            <p className="text-[11px] text-amber-600 text-center -mt-1">Link at least one payment method to continue.</p>
          )}

          <MuiButton
            disabled={isButtonDisabled}
            className={isButtonDisabled ? 'pointer-events-none' : ''}
            onClick={() => {
              if (profileStep === 2) {
                setPaymentConfigured(true);
                const labels: Record<string, string> = { card: 'VISA •••• 1234', momo: 'MoMo Wallet', zalopay: 'ZaloPay', cash: 'Cash' };
                if (linkedPaymentMethods.length > 0) {
                    setPaymentLabel(labels[linkedPaymentMethods[0].type] || 'Payment method');
                }
              }
              if (profileStep < 4) setProfileStep(profileStep + 1);
              else handleFinishSetup();
            }}
            fullWidth
          >
            {profileStep === 4 ? 'Confirm' : 'Continue'}
          </MuiButton>
          {profileStep === 3 && (
            <MuiButton variant="text" onClick={() => setProfileStep(4)} fullWidth className="!text-gray-400">
              Skip for now
            </MuiButton>
          )}
          {profileStep === 2 && (
            <MuiButton variant="text" onClick={() => { setPaymentConfigured(false); setProfileStep(3); }} fullWidth className="!text-gray-400">
              Skip payment setup
            </MuiButton>
          )}
        </div>
      </div>
    );
  };