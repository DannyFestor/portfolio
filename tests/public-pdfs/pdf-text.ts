import { extractText, getDocumentProxy } from "unpdf";

/** Pdf.js logs font warnings (for example on TrueType hinting) by default; errors still throw. */
const ERRORS_ONLY = 0;

/** The text of every page of a PDF, joined into one string. */
export async function pdfText(bytes: ArrayLike<number>): Promise<string> {
  const document = await getDocumentProxy(Uint8Array.from(bytes), { verbosity: ERRORS_ONLY });
  const { text } = await extractText(document, { mergePages: true });
  return text;
}
