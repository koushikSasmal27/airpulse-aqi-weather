import React from "react";

export default function Stat({ label, value, subtext }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#091423] p-4 transition hover:border-slate-700">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>

      {subtext && (
        <div className="mt-1 text-xs text-slate-600">
          {subtext}
        </div>
      )}
    </div>
  );
}