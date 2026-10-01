"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

export type MenuItem =
  | { type: "sep" }
  | {
      type?: "item";
      label: ReactNode;
      shortcut?: string;
      onClick?: () => void;
      disabled?: boolean;
      checked?: boolean;
    };

export default function MenuPanel({
  items,
  onDone,
  className = "",
  style,
}: {
  items: MenuItem[];
  onDone: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div role="menu" className={`glass-strong glass-rim menu-panel ${className}`} style={style}>
      {items.map((item, i) =>
        item.type === "sep" ? (
          <div key={i} className="menu-sep" />
        ) : (
          <button
            key={i}
            role="menuitem"
            type="button"
            disabled={item.disabled || !item.onClick}
            onClick={() => {
              item.onClick?.();
              onDone();
            }}
            className="menu-row"
          >
            <span className="grid w-3 place-items-center">{item.checked && <Check size={12} strokeWidth={3} />}</span>
            <span>{item.label}</span>
            {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
          </button>
        )
      )}
    </div>
  );
}
