const HEXADECIMAL = 16;
const NUMERIC_CHARACTER_REFERENCE = /&#(?:x[\da-f]+|\d+);/giu;
const HEXADECIMAL_REFERENCE = /^&#x/iu;
const REFERENCE_PREFIX = "&#";
const REFERENCE_SUFFIX = ";";

/** `&#x732B;` or `&#29483;` to the character it stands for. */
function decodeNumericCharacterReference(reference: string): string {
  const digits = reference.slice(REFERENCE_PREFIX.length, -REFERENCE_SUFFIX.length);
  return String.fromCodePoint(
    HEXADECIMAL_REFERENCE.test(reference)
      ? Number.parseInt(digits.slice(1), HEXADECIMAL)
      : Number(digits),
  );
}

/** The HTML with every numeric character reference replaced by its character. */
export function decodeNumericCharacterReferences(html: string): string {
  return html.replaceAll(NUMERIC_CHARACTER_REFERENCE, (reference) =>
    decodeNumericCharacterReference(reference),
  );
}
