/**
 * The llms.txt format (llmstxt.org): a Markdown file for language models, with the site's name as
 * the title, a one-line summary as a quote, a few paragraphs of detail, then sections of links.
 */
export interface LlmsLink {
  readonly title: string;
  readonly url: string;
  readonly description?: string;
}

export interface LlmsSection {
  readonly heading: string;
  readonly links: readonly LlmsLink[];
}

export interface LlmsDocument {
  readonly title: string;
  readonly summary: string;
  readonly details: readonly string[];
  readonly sections: readonly LlmsSection[];
}

const BLOCK_BREAK = "\n\n";

function linkLine({ title, url, description }: LlmsLink): string {
  const link = `- [${title}](${url})`;
  return description === undefined ? link : `${link}: ${description}`;
}

function sectionBlock({ heading, links }: LlmsSection): string {
  return `## ${heading}${BLOCK_BREAK}${links.map((link) => linkLine(link)).join("\n")}`;
}

export function llmsTxt({ title, summary, details, sections }: LlmsDocument): string {
  const blocks = [
    `# ${title}`,
    `> ${summary}`,
    ...details,
    ...sections.map((section) => sectionBlock(section)),
  ];
  return `${blocks.join(BLOCK_BREAK)}\n`;
}
