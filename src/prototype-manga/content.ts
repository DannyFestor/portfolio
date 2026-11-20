// PROTOTYPE — throwaway. Shared real content for the three manga home-page variants (#7).
// Facts come from Danny's Obsidian work notes; confidential clients use their public titles.
// Copy marked "draft" is structural placeholder copy, final wording is copywriting-time.

export const identity = {
  name: "Danny Festor",
  role: "Freelance full-stack engineer",
  place: "Nagasaki, Japan",
  since: "Freelance since 2020",
  languages: "English, German or Japanese. 日本語OK.",
  email: "hello@festor.info",
  status: "Open for new projects",
  responseTime: "Replies within two working days, JST", // draft
  mangaConfession: "I read too much manga. This site is laid out like one.", // draft
};

export const positioning = {
  headline: ["AI does the writing.", "I do the engineering."],
  subline: "Handcrafted or AI-assisted — everything gets engineered before it ships.",
};

export const worlds = [
  {
    key: "rescue",
    title: "AI-era rescue",
    body: "Your codebase grew fast with AI help and now nobody trusts it. I read it, find what is actually broken, and make it safe to change again.", // draft
    aside: "the door most clients come in through", // draft
  },
  {
    key: "build",
    title: "Greenfield build",
    body: "A new system from requirements to production, built by hand or with AI, reviewed and tested like it will run for ten years.", // draft
    aside: "where the good projects end up", // draft
  },
] as const;

export const work = [
  {
    period: "2025 — now",
    title: "Product data platform",
    client: "Lazuli · B2B SaaS",
    stack: ["Go", "PostgreSQL", "Google Cloud", "Vertex AI"],
    beat: "Uploaded files are classified, tagged and made searchable by AI. I build the backend that keeps it honest: versioning, snapshots, restore.",
    impact: "Asset versioning, shipped",
    sfx: "カチッ", // click — something locks into place
  },
  {
    period: "2024 — 25",
    title: "Investment & marketplace platform",
    client: "Backend lead · team of 6",
    stack: ["TypeScript", "GraphQL", "AWS serverless", "Pay.jp"],
    beat: "One query took seconds. EXPLAIN ANALYZE, one index, and it took milliseconds.",
    impact: "Seconds → milliseconds",
    sfx: "シュッ", // swoosh — sudden speed
  },
  {
    period: "2018 — 20",
    title: "Wafer defect detection",
    client: "Semiconductor plant · Isahaya, Nagasaki",
    stack: ["Python", "TensorFlow", "NNabla", "Computer vision"],
    beat: "Neural networks that find defects on semiconductor wafer images, before the AI wave had a name.",
    impact: "Computer vision in production",
    sfx: "ジーッ", // staring intently
  },
] as const;

export const latestWriting = {
  title: "Laravel's most underrated security feature: signed URLs",
  date: "2024-04-17",
};

export const nav = ["Work", "About", "Blog", "Contact"] as const;
