import React from 'react';
import { useAppContext } from '../context/AppContext';
import { UserPlus, Phone, Plus } from 'lucide-react';

interface AddEmergencyContactFormProps {
  onSuccess?: (name: string, relation: string) => void;
  onCancel?: () => void;
}

export const AddEmergencyContactForm: React.FC<AddEmergencyContactFormProps> = ({ onSuccess, onCancel }) => {
  const { newEcName, setNewEcName, newEcPhone, setNewEcPhone, newEcRelation, setNewEcRelation, isValidPhone, setToastMessage, handleAddEmergencyContact, isValidEcInput } = useAppContext();

  const handleSave = () => {
    if (isValidEcInput) {
      const nm = newEcName.trim();
      const rel = newEcRelation || 'Contact';
      handleAddEmergencyContact();
      if (onSuccess) onSuccess(nm, rel);
    }
  };

  return (
    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-4 space-y-3 mb-5">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        <UserPlus size={13} /> Add emergency contact
      </p>
      <input
        type="text"
        placeholder="Full name"
        value={newEcName}
        onChange={e => setNewEcName(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F26822] text-gray-800 bg-white text-sm"
      />
      <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden focus-within:border-[#F26822]">
        <Phone size={15} className="text-gray-400 ml-4 shrink-0" />
        <input
          type="tel"
          placeholder="Phone number"
          value={newEcPhone}
          onChange={e => {
            const val = e.target.value;
            // Check if the user typed anything other than numbers (and basic phone characters like +, -, spaces)
            if (/[^\d\s\-+()]/.test(val)) {
              setToastMessage('Only numbers are allowed for phone numbers');
            }
            setNewEcPhone(val.replace(/[^\d\s\-+()]/g, ''));
          }}
          className="flex-1 px-3 py-3 focus:outline-none text-gray-800 bg-transparent text-sm"
        />
      </div>
      {newEcPhone.trim() !== '' && !isValidPhone(newEcPhone) && (
        <p className="text-[11px] text-red-500 -mt-1">Enter a valid phone number (at least 7 digits).</p>
      )}
      {/* Relationship chips */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Relationship (optional)</p>
        <div className="flex flex-wrap gap-2">
          {['Mom', 'Dad', 'Sibling', 'Friend', 'Partner', 'Roommate'].map(r => (
            <div
              key={r}
              onClick={() => setNewEcRelation(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${newEcRelation === r ? 'bg-[#F26822] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={!isValidEcInput}
          className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${isValidEcInput ? 'bg-[#F26822] text-white hover:bg-[#d95d1e]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <Plus size={16} /> Add Contact
        </button>
      </div>
    </div>
  );
};
