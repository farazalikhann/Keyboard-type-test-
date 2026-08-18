export interface GhostingCombo {
  name: string;
  description: string;
  keys: { code: string; label: string }[];
}

export const GHOSTING_COMBOS: GhostingCombo[] = [
  {
    name: "WASD + Space",
    description: "Movement plus jump, the most common gaming combination.",
    keys: [
      { code: "KeyW", label: "W" },
      { code: "KeyA", label: "A" },
      { code: "KeyS", label: "S" },
      { code: "KeyD", label: "D" },
      { code: "Space", label: "Space" },
    ],
  },
  {
    name: "QWER + Space",
    description: "A common ability key row plus jump.",
    keys: [
      { code: "KeyQ", label: "Q" },
      { code: "KeyW", label: "W" },
      { code: "KeyE", label: "E" },
      { code: "KeyR", label: "R" },
      { code: "Space", label: "Space" },
    ],
  },
  {
    name: "Movement + Shift + Ctrl",
    description: "Movement combined with sprint and crouch modifiers.",
    keys: [
      { code: "KeyW", label: "W" },
      { code: "KeyA", label: "A" },
      { code: "KeyS", label: "S" },
      { code: "KeyD", label: "D" },
      { code: "ShiftLeft", label: "Shift" },
      { code: "ControlLeft", label: "Ctrl" },
    ],
  },
  {
    name: "Arrow keys + Shift",
    description: "Arrow key movement plus a modifier, common outside WASD-based games.",
    keys: [
      { code: "ArrowUp", label: "↑" },
      { code: "ArrowDown", label: "↓" },
      { code: "ArrowLeft", label: "←" },
      { code: "ArrowRight", label: "→" },
      { code: "ShiftLeft", label: "Shift" },
    ],
  },
];
