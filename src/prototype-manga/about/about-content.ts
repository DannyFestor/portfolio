// PROTOTYPE — throwaway. Content for the About page prototypes (#8, #7).
// Timeline facts: Danny's Obsidian work notes (Profile.md, Engagements/*.md, all reviewed, none confidential).
// Copy marked "draft" is placeholder wording in Danny's voice; final wording is copywriting-time.

export interface TimelineEntry {
  readonly period: string;
  readonly start: number;
  readonly org: string;
  readonly place: string;
  readonly role: string;
  readonly note: string;
}

/** Oldest first. */
export const timeline: readonly TimelineEntry[] = [
  {
    period: "2009 — 10",
    start: 2009,
    org: "Katalyst Labs",
    place: "Shibuya, Tokyo",
    role: "Translation & QA",
    note: "Translated software from Japanese and English into German, and tested games for bugs.",
  },
  {
    period: "2015 — 16",
    start: 2015,
    org: "Mercedes-Benz R&D Japan",
    place: "Kawasaki",
    role: "IT support intern",
    note: "Moved a Lotus Notes database to SharePoint and answered a security audit with processes.",
  },
  {
    period: "2017 — 18",
    start: 2017,
    org: "Honda Research Institute Japan",
    place: "Wako, Saitama",
    role: "Engineer (via Yume Technology)",
    note: "Speech and face recognition research: trained neural networks, programmed a dialogue robot.",
  },
  {
    period: "2018 — 20",
    start: 2018,
    org: "Sony Semiconductor Manufacturing",
    place: "Isahaya, Nagasaki",
    role: "Data analyst & system engineer",
    note: "Computer vision that finds defects on semiconductor wafers. Python, TensorFlow, NNabla.",
  },
  {
    period: "2020 — 21",
    start: 2020,
    org: "Brücke",
    place: "Nagasaki",
    role: "Freelance full-stack developer",
    note: "Own trade name, own projects: a trilingual site and a payroll app for a kindergarten.",
  },
  {
    period: "2021 — 24",
    start: 2021,
    org: "Creative Innovation",
    place: "Freelance",
    role: "Lead developer",
    note: "Laravel, Livewire and Tailwind systems: web shops, CMSs, a medical society's membership system.",
  },
  {
    period: "2024 — 25",
    start: 2024,
    org: "Qualita",
    place: "Freelance",
    role: "Backend lead",
    note: "TypeScript and GraphQL on serverless AWS for an investment and marketplace platform.",
  },
  {
    period: "2025 — now",
    start: 2025,
    org: "Lazuli",
    place: "Freelance",
    role: "Backend engineer",
    note: "Go backend of an AI product data platform on PostgreSQL and Google Cloud.",
  },
];

export interface Era {
  readonly chapter: number;
  readonly title: string;
  readonly span: string;
  readonly entries: readonly TimelineEntry[];
  readonly aside: string;
}

const entriesFrom = (from: number, to: number): readonly TimelineEntry[] =>
  timeline.filter((entry) => entry.start >= from && entry.start <= to);

/** Career grouped into chapters for the "career as chapters" variant. */
export const eras: readonly Era[] = [
  { chapter: 1, title: "Words", span: "2009 — 16", entries: entriesFrom(2009, 2016), aside: "first job in Japan: making software speak German" }, // draft
  { chapter: 2, title: "Machines that look and listen", span: "2017 — 20", entries: entriesFrom(2017, 2019), aside: "neural networks, before everyone had an opinion on them" }, // draft
  { chapter: 3, title: "The web, freelance", span: "2020 — 24", entries: entriesFrom(2020, 2023), aside: "Laravel years. Many systems, many clients, one desk in Nagasaki" }, // draft
  { chapter: 4, title: "The AI era", span: "2024 — now", entries: entriesFrom(2024, 2026), aside: "AI writes a lot of code now. Someone still has to engineer it" }, // draft
];

export const bio = [
  "I'm German and have worked in Japan since 2017, these days from Nagasaki. My first job here was in 2009, translating software into German.", // draft
  "Before the web I did machine learning: speech and face recognition research, then computer vision on a semiconductor line. Since 2020 I'm freelance, building web systems end to end in PHP, TypeScript and Go.", // draft
  "Being a German engineer inside Japan is the useful part. Japanese clients get someone who works in their language and their hours; everyone else gets an engineer who already knows how things are done here.", // draft
] as const;

export const profileFacts = [
  { label: "Based in", value: "Nagasaki, Japan" },
  { label: "From", value: "Germany" },
  { label: "Freelance since", value: "July 2020, as Brücke" },
  { label: "Works in", value: "PHP · TypeScript · Go" },
  { label: "Speaks", value: "English, German or Japanese. 日本語OK." },
] as const;

export const resumes = [
  { label: "Resume (English)", href: "/resume-en.pdf", note: "PDF" },
  { label: "職務経歴書 (日本語)", href: "/resume-ja.pdf", note: "PDF" },
] as const;

export const identityLinks = [
  { label: "GitHub", href: "https://github.com/DannyFestor" },
  { label: "LinkedIn", href: "#linkedin-placeholder" },
] as const;

export const photoAlt = "Photo of Danny Festor, smiling, holding a camera";
