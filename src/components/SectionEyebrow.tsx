import React from 'react';

interface SectionEyebrowProps {
  label: string;
  tag?: string;
  id?: string;
}

export default function SectionEyebrow({ label, tag, id }: SectionEyebrowProps) {
  return (
    <div id={id} className="inline-flex items-center gap-3 select-none">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-xs font-semibold tracking-wider uppercase text-white/95">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span>{label}</span>
      </div>
      {tag && (
        <span className="px-2 py-0.5 rounded-full border border-white/10 text-[10px] font-medium tracking-wide text-white/50 uppercase bg-white/[0.01]">
          {tag}
        </span>
      )}
    </div>
  );
}
