"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import AppIcon, { type IconId } from "./AppIcon";
import MenuPanel, { type MenuItem } from "./Menu";
import { APPS, DOCK_ORDER, MOBILE_DOCK, type AppId } from "./apps-meta";
import { useOS } from "./store";
import { CONTACT } from "@/lib";

/** Critically-damped-ish: fast to respond, no wobble — the real Dock never overshoots. */
const SPRING = { stiffness: 330, damping: 30, mass: 0.28 } as const;

type Item = {
  key: string;
  icon: IconId;
  label: string;
  running?: boolean;
  onClick: () => void;
  menu: MenuItem[];
  bounceKey?: number;
};

/**
 * macOS magnification follows a smooth bell curve around the pointer rather than a
 * linear ramp: icons right under the cursor grow most and neighbours ease off gently.
 */
function useMagnification(mouseX: MotionValue<number>, ref: React.RefObject<HTMLElement | null>, base: number, max: number, on: boolean) {
  const range = base * 3.1;
  const target = useTransform(mouseX, (x) => {
    if (!on || !Number.isFinite(x) || !ref.current) return base;
    const b = ref.current.getBoundingClientRect();
    const d = Math.abs(x - (b.left + b.width / 2));
    if (d >= range) return base;
    return base + (max - base) * ((Math.cos((Math.PI * d) / range) + 1) / 2);
  });
  return useSpring(target, SPRING);
}

function DockIcon({
  mouseX,
  item,
  base,
  max,
  magnify,
  onMenu,
}: {
  mouseX: MotionValue<number>;
  item: Item;
  base: number;
  max: number;
  magnify: boolean;
  onMenu: (item: Item, rect: DOMRect) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hover, setHover] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [seenBounce, setSeenBounce] = useState(item.bounceKey);
  if (item.bounceKey !== seenBounce) {
    setSeenBounce(item.bounceKey);
    if (item.bounceKey) setBouncing(true);
  }
  useEffect(() => {
    if (!bouncing) return;
    const t = window.setTimeout(() => setBouncing(false), 1150);
    return () => window.clearTimeout(t);
  }, [bouncing]);

  const size = useMagnification(mouseX, ref, base, max, magnify);
  // render once at max resolution and scale down, so magnified icons stay razor sharp
  const scale = useTransform(size, (s) => s / max);

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.label}
      data-dock-id={item.key}
      onClick={item.onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setHover(false);
        onMenu(item, e.currentTarget.getBoundingClientRect());
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: size, height: size }}
      className="group relative shrink-0 outline-none"
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 4, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="glass-strong pointer-events-none absolute -top-[38px] left-1/2 z-10 whitespace-nowrap rounded-[9px] px-2.5 py-[3px] text-[12.5px] text-label"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      <span className={`absolute bottom-0 left-0 block ${bouncing ? "dock-bounce" : ""}`} style={{ width: "100%", height: "100%" }}>
        <motion.span
          className="absolute bottom-0 left-0 block origin-bottom-left transition-[filter] duration-100 group-active:brightness-[.62]"
          style={{ width: max, height: max, scale }}
        >
          <AppIcon id={item.icon} size={max} />
        </motion.span>
      </span>

      <span
        className="absolute -bottom-[5px] left-1/2 h-[3.5px] w-[3.5px] -translate-x-1/2 rounded-full bg-black/75 transition-opacity duration-300 dark:bg-white/90"
        style={{ opacity: item.running ? 1 : 0 }}
      />
    </motion.button>
  );
}

export default function Dock() {
  const { windows, launches, activeId, openApp, minimizeApp, closeApp, notify, isMobile } = useOS();
  const mouseX = useMotionValue(Infinity);
  const [menu, setMenu] = useState<{ item: Item; x: number; y: number } | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-dock-menu]")) setMenu(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [menu]);

  const base = isMobile ? 64 : 58;
  const max = 100;

  const ids: AppId[] = isMobile ? MOBILE_DOCK : DOCK_ORDER;
  const appItems: Item[] = ids.map((id) => {
    const w = windows[id];
    return {
      key: id,
      icon: id,
      label: APPS[id].label,
      running: !!w,
      bounceKey: launches[id],
      onClick: () => {
        if (w && activeId === id && !w.minimized && !isMobile) minimizeApp(id);
        else openApp(id);
      },
      menu: w
        ? [
            { label: "Show", onClick: () => openApp(id) },
            { label: w.minimized ? "Unhide" : "Hide", onClick: () => (w.minimized ? openApp(id) : minimizeApp(id)) },
            { type: "sep" },
            { label: "Quit", onClick: () => closeApp(id) },
          ]
        : [{ label: "Open", onClick: () => openApp(id) }],
    };
  });

  const link = (key: IconId, label: string, href: string): Item => {
    const go = () => window.open(href, "_blank", "noopener,noreferrer");
    return {
      key,
      icon: key,
      label,
      onClick: go,
      menu: [
        { label: "Open in New Tab", onClick: go },
        { label: "Copy Link", onClick: () => navigator.clipboard?.writeText(href) },
      ],
    };
  };
  const linkItems: Item[] = [
    link("github", "GitHub", CONTACT.github),
    link("linkedin", "LinkedIn", CONTACT.linkedin),
    link("x", "X", CONTACT.twitter),
  ];
  const trashNote = () => notify({ title: "Trash", body: "The Trash is empty — nothing shipped here gets thrown away.", icon: "projects" });
  const trash: Item = {
    key: "trash",
    icon: "trash",
    label: "Trash",
    onClick: trashNote,
    menu: [{ label: "Open", onClick: trashNote }, { type: "sep" }, { label: "Empty Trash" }],
  };

  const openMenu = (item: Item, rect: DOMRect) =>
    setMenu({ item, x: rect.left + rect.width / 2, y: dockRef.current?.getBoundingClientRect().top ?? rect.top });

  const icon = (item: Item) => (
    <DockIcon key={item.key} mouseX={mouseX} item={item} base={base} max={max} magnify={!isMobile} onMenu={openMenu} />
  );

  return (
    <nav aria-label="Dock" className="pointer-events-none fixed inset-x-0 bottom-[6px] z-[9000] flex justify-center px-2">
      <motion.div
        ref={dockRef}
        initial={{ y: 110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.1 }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`glass glass-rim pointer-events-auto flex items-end rounded-[24px] px-[5px] pb-[3px] ${isMobile ? "gap-[10px] px-[10px]" : "gap-0"}`}
        style={{ height: base + 6 }}
      >
        {appItems.map(icon)}
        {!isMobile && (
          <>
            <span className="mx-[5px] mb-[9px] w-px shrink-0 self-end bg-black/20 dark:bg-white/25" style={{ height: base - 16 }} />
            {linkItems.map(icon)}
            {icon(trash)}
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {menu && (
          <motion.div
            data-dock-menu
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.12 }}
            className="pointer-events-auto fixed z-[9100]"
            style={{ left: menu.x, top: menu.y - 10, translate: "-50% -100%" }}
          >
            <MenuPanel items={menu.item.menu} onDone={() => setMenu(null)} className="!min-w-[180px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
