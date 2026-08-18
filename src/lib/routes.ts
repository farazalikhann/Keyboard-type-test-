export type RouteGroup = "typing" | "keyboard" | "mouse" | "legal";

export interface RouteEntry {
  path: string;
  title: string;
  navLabel?: string;
  description: string;
  group: RouteGroup;
}

// Single source of truth for every tool route. sitemap.ts, the header nav, the footer, and the
// "Related tools" component all read from this list instead of repeating it, so adding a tool
// here is enough to make it show up everywhere it should.
export const TOOL_ROUTES: RouteEntry[] = [
  {
    path: "/typing-test",
    title: "Typing test",
    description: "Measure your typing speed in words per minute with a live rhythm trace.",
    group: "typing",
  },
  {
    path: "/typing-test/1-minute",
    title: "1 minute typing test",
    description: "A quick, focused 60 second typing speed check.",
    group: "typing",
  },
  {
    path: "/typing-test/3-minute",
    title: "3 minute typing test",
    description: "A longer run that smooths out lucky bursts and shows your sustained speed.",
    group: "typing",
  },
  {
    path: "/typing-test/5-minute",
    title: "5 minute typing test",
    description: "An endurance run closer to real typing sessions than a short sprint.",
    group: "typing",
  },
  {
    path: "/typing-practice",
    title: "Typing practice",
    description: "Practice mode with word lists, punctuation, numbers, and code snippets.",
    group: "typing",
  },
  {
    path: "/wpm-calculator",
    title: "WPM calculator",
    description: "Work out words per minute manually from character count and time.",
    group: "typing",
  },
  {
    path: "/keyboard-test",
    title: "Keyboard test",
    description: "Press every key and see which ones register, with a downloadable diagnostic report.",
    group: "keyboard",
  },
  {
    path: "/key-rollover-test",
    title: "Key rollover test",
    description: "See how many keys your keyboard can register at the same time.",
    group: "keyboard",
  },
  {
    path: "/ghosting-test",
    title: "Ghosting test",
    description: "Check specific key combinations for ghosting and blocked keys.",
    group: "keyboard",
  },
  {
    path: "/cps-test",
    title: "Click speed test",
    description: "Measure clicks per second over 1, 5, 10, 30, or 60 second runs.",
    group: "mouse",
  },
  {
    path: "/double-click-test",
    title: "Double click test",
    description: "Check your mouse button for accidental double clicks and debounce issues.",
    group: "mouse",
  },
  {
    path: "/spacebar-counter",
    title: "Spacebar counter",
    description: "Count spacebar presses against a timer.",
    group: "mouse",
  },
];

export const LEGAL_ROUTES: RouteEntry[] = [
  { path: "/about", title: "About", description: "Who runs Keyboard Toolkit and how it works.", group: "legal" },
  { path: "/contact", title: "Contact", description: "Get in touch.", group: "legal" },
  { path: "/privacy-policy", title: "Privacy policy", description: "How data and cookies are handled.", group: "legal" },
  { path: "/terms", title: "Terms of use", description: "Acceptable use and liability.", group: "legal" },
  { path: "/disclaimer", title: "Disclaimer", description: "Limits of what these tools can tell you.", group: "legal" },
  { path: "/cookie-policy", title: "Cookie policy", description: "Cookie categories and how to manage them.", group: "legal" },
];

export function routeByPath(path: string): RouteEntry | undefined {
  return TOOL_ROUTES.find((r) => r.path === path);
}

export function relatedTools(currentPath: string, count = 3): RouteEntry[] {
  const current = routeByPath(currentPath);
  const pool = TOOL_ROUTES.filter((r) => r.path !== currentPath);
  const sameGroup = current ? pool.filter((r) => r.group === current.group) : [];
  const rest = pool.filter((r) => !sameGroup.includes(r));
  return [...sameGroup, ...rest].slice(0, count);
}
