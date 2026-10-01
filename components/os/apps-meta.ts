export type AppId =
  | "about"
  | "projects"
  | "notes"
  | "skills"
  | "terminal"
  | "activity"
  | "mail"
  | "resume"
  | "settings";

export type AppMeta = {
  id: AppId;
  /** Bold app name shown in the menu bar */
  name: string;
  /** Dock tooltip / Spotlight label */
  label: string;
  /** Spotlight keywords */
  keywords: string;
  w: number;
  h: number;
  minW: number;
  minH: number;
  resizable?: boolean;
  /** Window paints its own full-bleed toolbar (no default title strip) */
  customChrome?: boolean;
  /** App also renders its own traffic lights (e.g. Terminal's compact title bar) */
  ownLights?: boolean;
};

export const APPS: Record<AppId, AppMeta> = {
  about: {
    id: "about",
    name: "About Me",
    label: "About Me",
    keywords: "about bio profile suvesh who",
    w: 420,
    h: 700,
    minW: 360,
    minH: 480,
    resizable: false,
    customChrome: true,
  },
  projects: {
    id: "projects",
    name: "Finder",
    label: "Projects",
    keywords: "projects finder work portfolio apps built",
    w: 940,
    h: 620,
    minW: 560,
    minH: 400,
    customChrome: true,
  },
  notes: {
    id: "notes",
    name: "Notes",
    label: "Experience",
    keywords: "experience work euron job notes education school college",
    w: 920,
    h: 600,
    minW: 560,
    minH: 380,
    customChrome: true,
  },
  skills: {
    id: "skills",
    name: "Launchpad",
    label: "Skills",
    keywords: "skills tech stack technologies languages tools launchpad",
    w: 760,
    h: 600,
    minW: 420,
    minH: 400,
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    label: "Terminal",
    keywords: "terminal shell zsh command line cli",
    w: 700,
    h: 460,
    minW: 420,
    minH: 260,
    customChrome: true,
    ownLights: true,
  },
  activity: {
    id: "activity",
    name: "Activity",
    label: "Coding Activity",
    keywords: "activity github leetcode contributions coding",
    w: 860,
    h: 520,
    minW: 480,
    minH: 360,
    customChrome: true,
  },
  mail: {
    id: "mail",
    name: "Mail",
    label: "Contact",
    keywords: "mail contact email hire message phone reach",
    w: 640,
    h: 560,
    minW: 420,
    minH: 420,
    customChrome: true,
  },
  resume: {
    id: "resume",
    name: "Preview",
    label: "Resume.pdf",
    keywords: "resume cv pdf preview",
    w: 720,
    h: 820,
    minW: 420,
    minH: 400,
    customChrome: true,
  },
  settings: {
    id: "settings",
    name: "System Settings",
    label: "System Settings",
    keywords: "settings appearance dark light mode wallpaper theme",
    w: 720,
    h: 520,
    minW: 560,
    minH: 400,
    customChrome: true,
  },
};

export const DOCK_ORDER: AppId[] = [
  "about",
  "projects",
  "notes",
  "skills",
  "terminal",
  "activity",
  "mail",
  "resume",
  "settings",
];

/** Phones get an iOS-style Dock; everything else lives on the home grid */
export const MOBILE_DOCK: AppId[] = ["about", "projects", "notes", "mail"];

export const MENU_H = 30;
/** Vertical space kept free for the Dock when zooming a window */
export const DOCK_RESERVE = 92;
export const MOBILE_BP = 768;
