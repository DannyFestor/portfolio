/**
 * A one-page PDF that sets each line of ASCII text in Helvetica: enough for pdf.js to extract, so a
 * test can plant personal data in a PDF without committing a binary fixture.
 */
const LINE_HEIGHT_POINTS = 16;
const PDF_STRING_SPECIALS = /[()\\]/gu;
const XREF_OFFSET_DIGITS = 10;

function pdfLines(...lines: readonly string[]): string {
  return lines.map((line) => `${line}\n`).join("");
}

function pdfString(line: string): string {
  return `(${line.replaceAll(PDF_STRING_SPECIALS, (special) => `\\${special}`)})`;
}

function contentStream(lines: readonly string[]): string {
  const shown = lines.map((line) => `${pdfString(line)} Tj 0 -${String(LINE_HEIGHT_POINTS)} Td`);
  const content = `BT /F1 12 Tf 72 720 Td ${shown.join(" ")} ET`;
  return pdfLines(
    `<< /Length ${String(content.length)} >>`,
    "stream",
    content,
    "endstream",
  ).trimEnd();
}

function pdfObjects(lines: readonly string[]): string[] {
  return [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    contentStream(lines),
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
}

function indirectObject(object: string, index: number): string {
  return pdfLines(`${String(index + 1)} 0 obj`, object, "endobj");
}

function xrefTable(offsets: readonly number[]): string {
  const entries = offsets.map(
    (offset) => `${String(offset).padStart(XREF_OFFSET_DIGITS, "0")} 00000 n `,
  );
  return pdfLines("xref", `0 ${String(offsets.length + 1)}`, "0000000000 65535 f ", ...entries);
}

function trailer(objectCount: number, xrefOffset: number): string {
  return pdfLines(
    "trailer",
    `<< /Size ${String(objectCount + 1)} /Root 1 0 R >>`,
    "startxref",
    String(xrefOffset),
    "%%EOF",
  );
}

export function textPdf(lines: readonly string[]): Uint8Array {
  const objects = pdfObjects(lines).map((object, index) => indirectObject(object, index));
  const header = pdfLines("%PDF-1.4");
  const offsets = objects.map(
    (_object, index) => [header, ...objects.slice(0, index)].join("").length,
  );
  const body = header + objects.join("");
  return new TextEncoder().encode(body + xrefTable(offsets) + trailer(objects.length, body.length));
}
