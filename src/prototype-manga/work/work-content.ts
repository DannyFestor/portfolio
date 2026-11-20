// PROTOTYPE — throwaway. Case-study content for the /work page prototypes (#7).
// Facts come from Danny's Obsidian work notes. The marketplace client is confidential:
// it is never named, only described. All prose is draft copy (copywriting-time decides the words).

export type World = "Rescue" | "Build";

export interface StudyEntry {
  readonly chapter: number;
  readonly period: string;
  readonly title: string;
  readonly role: string;
  readonly world: World;
  readonly situation: string; // draft
  readonly result: string; // draft
  readonly stack: readonly string[];
  readonly isFull: boolean;
}

export const studies: readonly StudyEntry[] = [
  {
    chapter: 1,
    period: "2025 — now",
    title: "Product data platform",
    role: "Backend engineer · Lazuli · team of 12",
    world: "Build",
    situation: "A B2B SaaS where AI classifies, tags and searches every uploaded file.", // draft
    result: "Asset versioning with history, snapshots and restore, shipped.", // draft
    stack: ["Go", "PostgreSQL", "Google Cloud", "Vertex AI"],
    isFull: false,
  },
  {
    chapter: 2,
    period: "2024 — 25",
    title: "Investment & marketplace platform",
    role: "Backend lead · team of 6",
    world: "Rescue",
    situation: "A serverless backend that grew fast: slow queries, unused API, payments that had to be right.", // draft
    result: "One query from seconds to milliseconds, and a smaller, documented API.", // draft
    stack: ["TypeScript", "GraphQL", "AWS serverless", "PostgreSQL", "Pay.jp"],
    isFull: true,
  },
  {
    chapter: 3,
    period: "2022 — 24",
    title: "Membership system for a medical society",
    role: "Lead developer · team of 4",
    world: "Rescue",
    situation: "Members pay fees, join the general assembly and apply for letters of commission. One of those had stopped working.", // draft
    result: "Letter-of-commission function restored, then two years of steady maintenance.", // draft
    stack: ["Laravel", "Livewire", "Alpine.js", "AWS"],
    isFull: false,
  },
  {
    chapter: 4,
    period: "2020 — 21",
    title: "Payroll app for a kindergarten",
    role: "Solo · requirements to operation",
    world: "Build",
    situation: "Teachers' salaries were calculated by hand from the time-tracking system's export.", // draft
    result: "A desktop app that reads the export and calculates the payroll.", // draft
    stack: ["Vue.js", "Electron", "Node.js"],
    isFull: false,
  },
  {
    chapter: 5,
    period: "2018 — 20",
    title: "Wafer defect detection",
    role: "Data analyst & system engineer · team of 10",
    world: "Build",
    situation: "Defects on semiconductor wafers had to be found in images, at a plant in Isahaya, Nagasaki.", // draft
    result: "Neural networks that find wafer defects with computer vision.", // draft
    stack: ["Python", "TensorFlow", "NNabla"],
    isFull: false,
  },
];

export const fullStudy = {
  chapter: 2,
  title: "Investment & marketplace platform",
  kicker: "Seconds to milliseconds", // draft
  period: "2024 — 25",
  role: "Backend lead · team of 6",
  stack: ["TypeScript", "GraphQL", "SST", "AWS serverless", "PostgreSQL", "Pay.jp"],
  sfx: "シュッ",
  impact: ["Seconds", "milliseconds"],
  pullQuote: "Measure first. The fix was one index.", // draft
  situation: [
    // draft
    "A platform where people hold items as investments, buy and sell them on a marketplace and watch their prices. Three applications — the user web app, an admin app and a public site — sat on one serverless backend on AWS, behind a GraphQL API. Six people built it. I led the backend.",
    "By late 2024 the backend had grown faster than anyone had time to tidy it. Some queries took seconds. The API carried queries and types that nothing called any more. And card payments had to stay correct when two people tried to buy the same item at the same moment.",
  ],
  decisions: [
    // draft
    {
      title: "Measure before touching anything",
      body: "No new caching layer, no rewrite. EXPLAIN ANALYZE on the slow queries first. The worst one was missing an index.",
    },
    {
      title: "One owner for payments, end to end",
      body: "Customers, cards, charges, subscriptions and a serverless webhook handler with Pay.jp, plus guards against concurrent purchases. Payments are not a place for split ownership.",
    },
    {
      title: "Keep the data model honest",
      body: "The entity-relationship model, migrations, seed data and diagrams changed together, every time the model changed.",
    },
    {
      title: "Delete what nobody calls",
      body: "Unused GraphQL queries, mutations and types went. A smaller API is one people can still reason about.",
    },
    {
      title: "Write it down for the team",
      body: "A Pay.jp integration guide for the frontend team, so they did not need me in the loop for every call.",
    },
  ],
  result: [
    // draft
    "One index took the worst query from seconds to milliseconds. A database performance hotfix shipped in May 2025.",
    "The frontend team integrated payments from the guide. The API got smaller instead of bigger.",
  ],
  asides: {
    situation: "the usual: it worked, until it didn't", // draft
    decisions: "boring decisions, on purpose", // draft
    result: "no heroics required", // draft
  },
} as const;
