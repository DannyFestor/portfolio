// PROTOTYPE — throwaway. The three header / nav / footer sets, switched with ?chrome= (#28–#30).
export const chromeSets = [
  { key: "A", name: "Magazine running header + 奥付 colophon" },
  { key: "B", name: "Thumb-index tabs + next-chapter footer" },
  { key: "C", name: "Obi band + back cover" },
] as const;

export const defaultChrome = "A";

