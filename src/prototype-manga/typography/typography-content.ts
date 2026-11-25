// PROTOTYPE — throwaway. Typography sheet (#25): the eight type decisions, three numbered options each,
// and the sample text they are set in. Each option is applied as data-ty-<key>="<number>" on a wrapper;
// typography.css turns that attribute into custom properties, so the same markup renders every option.

export type OptionNumber = 1 | 2 | 3;

export interface TypeOption {
  readonly number: OptionNumber;
  readonly name: string;
  readonly detail: string;
}

export interface TypeDecision {
  readonly key: string;
  readonly title: string;
  readonly note: string;
  readonly options: readonly [TypeOption, TypeOption, TypeOption];
}

export const typeDecisions = {
  scale: {
    key: "scale",
    title: "Heading scale",
    note: "Four heading steps above 16px body text, all in Zen Antique. Desktop sizes; phones follow once the scale is chosen.",
    options: [
      { number: 1, name: "Quiet, ×1.2", detail: "33 · 28 · 23 · 19 · body 16" },
      { number: 2, name: "Book, ×1.333", detail: "50 · 38 · 28 · 21 · body 16" },
      { number: 3, name: "Loud, ×1.5", detail: "81 · 54 · 36 · 24 · body 16" },
    ],
  },
  narration: {
    key: "narration",
    title: "Narration size",
    note: "The engineering voice in its box: Shippori Mincho, size and line height together.",
    options: [
      { number: 1, name: "15px, line height 1.65", detail: "today's prototype value" },
      { number: 2, name: "16px, line height 1.7", detail: "same as body text" },
      { number: 3, name: "17px, line height 1.75", detail: "a step above body" },
    ],
  },
  weight: {
    key: "weight",
    title: "Mincho weight",
    note: "Mincho has thin horizontal strokes that can fade on screens. Regular text weight, and the weight of bold.",
    options: [
      { number: 1, name: "Regular 400, bold 700", detail: "the font's own default" },
      { number: 2, name: "Medium 500, bold 700", detail: "a little more ink on every stroke" },
      { number: 3, name: "SemiBold 600, bold 800", detail: "heavy, close to print density" },
    ],
  },
  column: {
    key: "column",
    title: "Reading column",
    note: "Blog posts and case studies: plain text in a clean column. Size, line height and line length together.",
    options: [
      { number: 1, name: "17px · 1.7 · 62 characters", detail: "compact, short lines" },
      { number: 2, name: "18px · 1.75 · 68 characters", detail: "today's prototype value" },
      { number: 3, name: "19px · 1.8 · 74 characters", detail: "large, long lines" },
    ],
  },
  aside: {
    key: "aside",
    title: "Aside size floor",
    note: "Yomogi gets scratchy when small. The smallest an aside may ever be, on phones too.",
    options: [
      { number: 1, name: "15px", detail: "small, like a margin pencil note" },
      { number: 2, name: "17px", detail: "today's prototype value" },
      { number: 3, name: "19px", detail: "large, reads as a voice of its own" },
    ],
  },
  label: {
    key: "label",
    title: "Labels",
    note: "Small labels: running header, section kickers, attributions, the contact line.",
    options: [
      { number: 1, name: "Zen Antique capitals, wide tracking", detail: "12px, 0.24em" },
      { number: 2, name: "Shippori Mincho SemiBold capitals", detail: "12px, 0.16em" },
      { number: 3, name: "Zen Antique, normal case", detail: "15px, no tracking" },
    ],
  },
  numerals: {
    key: "numerals",
    title: "Dates and periods",
    note: "Project periods on the Work page and post dates on the Blog.",
    options: [
      { number: 1, name: "Zen Antique in an ink tag", detail: "2024 — 25 · 17 April 2024" },
      { number: 2, name: "Shippori Mincho, en dash", detail: "2024–25 · 17 Apr 2024" },
      { number: 3, name: "Japanese print style", detail: "2024 – 2025 · 2024.04.17" },
    ],
  },
  sfx: {
    key: "sfx",
    title: "Sound effect size",
    note: "The one impact moment per page. Red, paper outline, over focus lines.",
    options: [
      { number: 1, name: "44px", detail: "a small click" },
      { number: 2, name: "58px", detail: "today's prototype value" },
      { number: 3, name: "76px", detail: "takes over the panel" },
    ],
  },
} as const satisfies Record<string, TypeDecision>;

export type TypeDecisionKey = keyof typeof typeDecisions;

export const typeDecisionList: readonly TypeDecision[] = Object.values(typeDecisions);

/** Option shown in the combined section when the URL picks nothing. */
export const defaultPick: OptionNumber = 2;

/** One project, written per numeral option: the format is text, not only styling. */
export const periodsByOption: Record<OptionNumber, readonly string[]> = {
  1: ["2025 — now", "2024 — 25", "2018 — 20"],
  2: ["2025–now", "2024–25", "2018–20"],
  3: ["2025 –", "2024 – 2025", "2018 – 2020"],
};

export const postDateByOption: Record<OptionNumber, string> = {
  1: "17 April 2024",
  2: "17 Apr 2024",
  3: "2024.04.17",
};

export const scaleSample = {
  pageTitle: "Work",
  caseTitle: "Product data platform",
  sectionTitle: "What I built",
  body: "Uploaded files are classified, tagged and made searchable by AI. I build the backend that keeps it honest: versioning, snapshots, restore.",
  minorTitle: "Stack",
  stack: "Go · PostgreSQL · Google Cloud · Vertex AI",
};

export const narrationShort =
  "The marketplace had one query that took seconds. Before touching code, I measured it."; // draft

export const narrationLong =
  "EXPLAIN ANALYZE showed a sequential scan over every listing. One index later the same query took milliseconds, and the team stopped adding caches to hide it."; // draft

export const weightSample = {
  before: "Signed URLs are unguessable links you can share without a login. They carry a",
  strong: "cryptographic signature",
  after: "at the end, so changing one character breaks them.",
};

// Danny's own post (2024), lightly trimmed. Long-form copy is not rewritten here.
export const readingSample = {
  heading: "What are signed URLs not?",
  paragraphs: [
    "They are not one-time-use URLs, at least not by default. There is no built-in way to invalidate a signed URL, except changing the application key, which invalidates every single signed URL. Do not use signed URLs for security-critical endpoints if you do not have a strategy to invalidate them.",
    "Laravel comes with many security features out of the box: protection against cross-site scripting, cross-site request forgery and SQL injection, roles and permissions via gates, and whole authentication scaffolding. One feature is very much overlooked in my opinion.",
  ],
};

export const asideSample = "the index was one line"; // draft

export const labelSamples = {
  runningHead: "Danny Festor · Writing",
  kicker: "Case study",
  attribution: "— Client name, Company",
  contact: "Write to me",
};

export const sfxSample = "カチッ";

export const impactSample = "Seconds → milliseconds";
