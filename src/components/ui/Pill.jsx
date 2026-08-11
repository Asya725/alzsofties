import React from "react";
import { theme as C } from "../../constants/theme";

export default function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm transition-colors whitespace-nowrap"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        borderRadius: 999,
        border: `1px solid ${active ? C.ink : C.line}`,
        background: active ? C.ink : "transparent",
        color: active ? C.bg : C.inkSoft,
      }}
    >
      {children}
    </button>
  );
}
