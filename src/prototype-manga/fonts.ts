// PROTOTYPE — throwaway. Font pairings for variant A (#7, round 4). Each pairing sets the three voices:
// display (headings, chapter lettering), narration (engineering voice), hand (annotation asides).

export interface FontPairing {
  readonly id: number;
  readonly name: string;
  readonly display: string;
  readonly narration: string;
  readonly hand: string;
}

export const fontPairings: readonly FontPairing[] = [
  {
    id: 1,
    name: "Zen Antique · Zen Old Mincho · Courier Prime",
    display: '"Zen Antique", serif',
    narration: '"Zen Old Mincho", serif',
    hand: '"Courier Prime", monospace',
  },
  {
    id: 2,
    name: "Zen Antique · Shippori Mincho · Yomogi",
    display: '"Zen Antique", serif',
    narration: '"Shippori Mincho", serif',
    hand: '"Yomogi", serif',
  },
  {
    id: 3,
    name: "Shippori Mincho B1 · Zen Old Mincho · Cutive Mono",
    display: '"Shippori Mincho B1", serif',
    narration: '"Zen Old Mincho", serif',
    hand: '"Cutive Mono", monospace',
  },
  {
    id: 4,
    name: "Zen Antique · Libre Caslon Text · Zen Antique labels",
    display: '"Zen Antique", serif',
    narration: '"Libre Caslon Text", serif',
    hand: '"Zen Antique", serif',
  },
];

export const fontStylesheetHref =
  "https://fonts.googleapis.com/css2?family=Zen+Antique&family=Zen+Old+Mincho:wght@400;600;700&family=Shippori+Mincho:wght@400;600&family=Shippori+Mincho+B1:wght@600;800&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Cutive+Mono&family=Yomogi&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap";

const pairingRule = (pairing: FontPairing): string =>
  `html[data-fonts="${pairing.id}"] .variant-a { --display: ${pairing.display}; --narration: ${pairing.narration}; --hand: ${pairing.hand}; }`;

export const fontPairingCss = (): string =>
  `<style>${fontPairings.map(pairingRule).join("\n")}</style>`;
