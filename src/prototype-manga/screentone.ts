// PROTOTYPE — throwaway. Screentone tiles as SVG data URIs plus the four trial palettes for variant A (#7).
// A square tile with dots at its four corners and its centre repeats into a 45° dot lattice,
// so no element has to be rotated to get a real screentone angle.

const SQRT2 = Math.SQRT2;

/** Lattice pitch shared by every tone, in CSS pixels. Densities differ by dot size only. */
export const TONE_PITCH = 6;

/** Side of the repeating tile that produces a 45° lattice of the given pitch. */
export const toneTileSide = (pitch: number): number => pitch * SQRT2;

const round = (value: number): string => String(Math.round(value * 1000) / 1000);

/** One screentone tile as a CSS `url("data:image/svg+xml,…")` value. */
export function toneTile(colour: string, dotRadius: number, pitch: number, opacity = 1): string {
  const side = toneTileSide(pitch);
  const s = round(side);
  const half = round(side / 2);
  const r = round(dotRadius);
  const dots = [
    [0, 0],
    [s, 0],
    [0, s],
    [s, s],
    [half, half],
  ]
    .map(([cx, cy]) => `<circle cx='${cx}' cy='${cy}' r='${r}'/>`)
    .join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${s}' height='${s}' viewBox='0 0 ${s} ${s}'><g fill='${colour}' fill-opacity='${opacity}'>${dots}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const INK = "#1b1a17";
const SFX_RED = "#d1352b";
const INDIGO = "#2d4a7a";
const CYAN = "#1f7fc0";

interface Palette {
  readonly id: number;
  readonly name: string;
  readonly toneColour: string;
  readonly toneOpacity: number;
  readonly accent: string;
}

export const palettes: readonly Palette[] = [
  { id: 1, name: "藍 indigo tones, red accents", toneColour: INDIGO, toneOpacity: 0.85, accent: SFX_RED },
  { id: 2, name: "Process cyan tones, red accents", toneColour: CYAN, toneOpacity: 0.8, accent: SFX_RED },
  { id: 3, name: "藍 indigo tones and accents, SFX only red", toneColour: INDIGO, toneOpacity: 0.85, accent: INDIGO },
  { id: 4, name: "Grey tones (black and white), red accents", toneColour: INK, toneOpacity: 0.45, accent: SFX_RED },
];

/** Dot radius per density, at TONE_PITCH. Kept small so text near tones stays readable. */
const DENSITIES = { light: 0.65, mid: 0.85, dense: 1.05, deep: 1.3 } as const;

function paletteRules(palette: Palette): string {
  const tiles = Object.entries(DENSITIES)
    .map(([density, radius]) => `--tone-${density}: ${toneTile(palette.toneColour, radius, TONE_PITCH, palette.toneOpacity)};`)
    .join("\n  ");
  return `--accent: ${palette.accent};\n  ${tiles}`;
}

/** Global CSS that sets the palette custom properties on `.variant-a` for `html[data-palette]`. */
export function paletteCss(): string {
  const [first] = palettes;
  const defaults = first ? `html:not([data-palette]) .variant-a {\n  ${paletteRules(first)}\n}\n` : "";
  const perPalette = palettes
    .map((palette) => `html[data-palette="${palette.id}"] .variant-a {\n  ${paletteRules(palette)}\n}`)
    .join("\n");
  return `${defaults}${perPalette}\n.variant-a { --tone-tile: ${round(toneTileSide(TONE_PITCH))}px; --sfx: ${SFX_RED}; }`;
}
