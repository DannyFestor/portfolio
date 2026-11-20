// PROTOTYPE — throwaway. Contact-page copy for the three contact variants (#7, #19).
// Facts come from content.ts; everything else is draft copy in Danny's voice.

export const contactCopy = {
  location: "Nagasaki, Japan · JST (UTC+9)",
  rates: "Rates are per project. After a short conversation you get a clear quote, in writing, before anything starts.", // draft
  ratesShort: "Per-project quote after a short talk.", // draft
  noForm: "a plain email, no form", // draft
  chapterEnd: "Every chapter ends on an open question.", // draft
  yourMove: "Your move.", // draft
  writeToMe: "Write to me.", // draft
};

/** B: next-chapter preview, the steps after the first email. */
export const nextSteps = [
  { label: "First", text: "You write: the situation, the deadline, what is already built." }, // draft
  { label: "Then", text: "A short call or a few emails. I ask until I understand the problem." }, // draft
  { label: "After", text: "A clear per-project quote, in writing. No hourly surprises." }, // draft
] as const;

/** C: the letter Danny prints in his own reader-mail corner. */
export const letter = {
  salutation: "Dear reader,", // draft
  paragraphs: [
    "If something in your codebase keeps you up at night, or you have a system that does not exist yet, write me an email.", // draft
    "Tell me what the software does, what is going wrong or what should exist, and when it matters. Links, screenshots and half-finished thoughts are all welcome.", // draft
    "I answer every letter myself. Rates are per project: after a short conversation you get a clear quote before any work starts.", // draft
  ],
  signOff: "— Danny", // draft
  checklist: ["What the software does", "What hurts, or what should exist", "When it matters"], // draft
};
