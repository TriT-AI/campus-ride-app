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

export const ProfileSheet = () => {
  const { view, setView, activeOverlay, setActiveOverlay, hasActiveRide, setHasActiveRide, rideType, setRideType, sameGender, setSameGender, swipeProgress, setSwipeProgress, profileStep, setProfileStep, selectedGender, setSelectedGender, selectedPaymentMethodType, setSelectedPaymentMethodType, linkedPaymentMethods, setLinkedPaymentMethods, setupEmergencyContacts, setSetupEmergencyContacts, newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, selectedContacts, setSelectedContacts, customContact, setCustomContact, isSosActive, setIsSosActive, toastMessage, setToastMessage, selectedDestination, setSelectedDestination, mapPinPos, setMapPinPos, searchQuery, setSearchQuery, paymentConfigured, setPaymentConfigured, paymentLabel, setPaymentLabel, expandedPermission, setExpandedPermission, showSameGenderInfo, setShowSameGenderInfo, chatMessages, setChatMessages, chatInput, setChatInput, editingContactIdx, setEditingContactIdx, ecShowAdd, setEcShowAdd, displayName, setDisplayName, cancelReason, setCancelReason, sosPinInput, setSosPinInput, showSosPinModal, setShowSosPinModal, searchTimer, setSearchTimer, VGU_ORANGE, handleReleaseSOS, handleLogin, handleAuthorize, handleAuthAllow, handleFinishSetup, QUICK_LOCATIONS_PRESETS, openLocationPick, handleBookRide, handleCancelConfirm, handleBoardCar, handleSendLink, handleLogout, isValidPhone, isValidEcInput, handleAddEmergencyContact, QUICK_LOCATIONS_DATA, ALL_SEARCHABLE_LOCATIONS } = useAppContext();
  return (
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
              <CheckCircle size={10} /> Verified
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-bold text-gray-900 mb-3 text-sm flex items-center justify-between">
            Emergency Contacts
            {setupEmergencyContacts.length < 3 && (
              <button
                onClick={() => { setEcShowAdd(true); setEditingContactIdx(null); setNewEcName(''); setNewEcPhone(''); setNewEcRelation(''); }}
                className="flex items-center gap-1 text-[11px] font-bold text-[#F26822] bg-orange-50 hover:bg-orange-100 rounded-full px-2.5 py-1 transition"
              >
                <Plus size={14} /> Add
              </button>
            )}
          </h4>

          {setupEmergencyContacts.length === 0 && !ecShowAdd && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
              You haven't added any emergency contacts yet. Add one so we can notify them if you trigger an SOS.
            </div>
          )}

          {setupEmergencyContacts.length > 0 && (
            <div className="space-y-2 mb-3">
              {setupEmergencyContacts.map((c, i) => (
                editingContactIdx === i ? (
                  <div key={i} className="bg-gray-50 border border-[#F26822] rounded-2xl p-4 space-y-2">
                    <input type="text" value={newEcName} onChange={e => setNewEcName(e.target.value)} placeholder="Name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#F26822]" />
                    <input type="tel" value={newEcPhone} onChange={e => setNewEcPhone(e.target.value)} placeholder="Phone" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#F26822]" />
                    <div className="flex flex-wrap gap-1.5">
                      {['Mom', 'Dad', 'Sibling', 'Friend', 'Partner', 'Roommate'].map(r => (
                        <button key={r} onClick={() => setNewEcRelation(r)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${newEcRelation === r ? 'bg-[#F26822] text-white' : 'bg-gray-200 text-gray-600'}`}>{r}</button>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => setEditingContactIdx(null)} className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-bold">Cancel</button>
                      <button
                        onClick={() => {
                          if (!newEcName.trim() || !newEcPhone.trim()) return;
                          setSetupEmergencyContacts(prev => prev.map((x, idx) => idx === i ? { name: newEcName, phone: newEcPhone, relation: newEcRelation || x.relation } : x));
                          setEditingContactIdx(null);
                        }}
                        className="flex-1 py-2 rounded-lg bg-[#F26822] hover:bg-[#d95d1e] text-white text-sm font-bold shadow-md shadow-[#F26822]/30 transition-colors"
                      >Save</button>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{c.name}</p>
                      <p className="text-sm text-gray-500 truncate">{c.phone} · {c.relation}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {i === 0 && <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Primary</div>}
                      <button
                        onClick={() => { setEditingContactIdx(i); setNewEcName(c.name); setNewEcPhone(c.phone); setNewEcRelation(c.relation); setEcShowAdd(false); }}
                        className="text-xs text-gray-500 hover:text-[#F26822] font-semibold px-2 py-1 rounded"
                      >Edit</button>
                      <Trash2
                        size={16}
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                        onClick={() => { if (window.confirm(`Remove ${c.name} from emergency contacts?`)) setSetupEmergencyContacts(prev => prev.filter((_, idx) => idx !== i)); }}
                      />
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {ecShowAdd && setupEmergencyContacts.length < 3 && (
            <AddEmergencyContactForm
              onSuccess={() => setEcShowAdd(false)}
              onCancel={() => setEcShowAdd(false)}
            />
          )}
        </div>

        <MuiButton variant="text" onClick={handleLogout} fullWidth className="text-red-600 bg-red-50 hover:bg-red-100">Log Out</MuiButton>
      </div>
    </div>
  );
};