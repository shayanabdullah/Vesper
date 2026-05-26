import React from 'react';
import { ChevronRight } from 'lucide-react';
import AppleLogo from './AppleLogo';

interface AppleButtonProps {
  label?: string;
  full?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
}

export default function AppleButton({ label = 'Download Vesper', full = false, onClick, id }: AppleButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] cursor-pointer ${
        full ? 'w-full' : ''
      }`}
    >
      <AppleLogo className="w-4 h-4 fill-black text-black" />
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}
