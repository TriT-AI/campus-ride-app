import React from 'react';

const MuiButton = ({ variant = 'contained', fullWidth = false, onClick = undefined as any, disabled = false, children, className = '', style = {} as React.CSSProperties }) => {
  const baseStyle = "text-[15px] font-bold rounded-xl px-4 py-3.5 transition-all duration-200 flex items-center justify-center gap-2";
  const disabledStyle = "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 shadow-none";
  let variants: Record<string, string> = {};
  if (!disabled) {
    variants = {
      contained: 'bg-[#F26822] text-white hover:bg-[#d95d1e] active:scale-[0.98] shadow-md shadow-[#F26822]/30',
      outlined: 'border-2 border-[#F26822]/40 text-[#F26822] hover:border-[#F26822] hover:bg-[#F26822]/5 active:scale-[0.98]',
      text: 'text-[#F26822] hover:bg-[#F26822]/10 active:scale-[0.98]',
      danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] shadow-md shadow-red-500/30',
    };
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyle} ${disabled ? disabledStyle : variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

const Backdrop = ({ open, onClick, zIndex = 'z-40' }: { open: boolean; onClick: () => void; zIndex?: string }) => (
  <div
    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${zIndex} ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
    onClick={onClick}
  />
);

export { MuiButton, Backdrop };
