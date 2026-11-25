/**
 * The public résumés the site links (#14, #30). `vp run career:sync` copies each one from the
 * career vault's public folder to its URL under public/. The vault keeps a private version of every
 * résumé next to that folder; only the public folder is ever read.
 */
export interface PublicResume {
  /** The file name in the vault's public folder. */
  readonly vaultFileName: string;
  /** Where the site serves it, under public/. */
  readonly urlPath: string;
}

export const ENGLISH_CV: PublicResume = {
  vaultFileName: "CV_Danny-Christian_Festor.pdf",
  urlPath: "/resume/danny-festor-cv-en.pdf",
};

export const JAPANESE_SHOKUMU_KEIREKISHO: PublicResume = {
  vaultFileName: "職務経歴書_Danny-Christian_Festor.pdf",
  urlPath: "/resume/danny-festor-shokumu-keirekisho-ja.pdf",
};

export const PUBLIC_RESUMES: readonly PublicResume[] = [ENGLISH_CV, JAPANESE_SHOKUMU_KEIREKISHO];
