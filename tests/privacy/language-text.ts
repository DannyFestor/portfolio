/**
 * The career export is English (#13). Short glosses of the site's other languages are fine: a
 * Japanese term in parentheses after its English, a German proper name. Japanese or German text is
 * not. Findings name the rule only.
 */

/** Japanese script, with the marks that join it: the long vowel, the middle dot and punctuation. */
const JAPANESE_RUN = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー・、。「」]+/gu;
const LONGEST_JAPANESE_GLOSS = 12;

/** German words that English does not share; a name holds two at most, a sentence more. */
const GERMAN_FUNCTION_WORD =
  /(?<!\p{L})(?:und|der|das|mit|für|von|eine|einer|einem|wurde|wurden|werden|nicht|sowie|über|zur|zum|auf|ist|sind|bei)(?!\p{L})/gu;
const MOST_GERMAN_FUNCTION_WORDS_IN_A_NAME = 2;

interface LanguageRule {
  readonly name: string;
  readonly isFoundIn: (text: string) => boolean;
}

function isShortGloss(text: string, run: string, index: number): boolean {
  const isParenthesised = text[index - 1] === "(" && text[index + run.length] === ")";
  return isParenthesised && run.length <= LONGEST_JAPANESE_GLOSS;
}

const RULES: readonly LanguageRule[] = [
  {
    name: "Japanese text",
    isFoundIn: (text) =>
      [...text.matchAll(JAPANESE_RUN)].some(({ 0: run, index }) => !isShortGloss(text, run, index)),
  },
  {
    name: "German text",
    isFoundIn: (text) =>
      [...text.matchAll(GERMAN_FUNCTION_WORD)].length > MOST_GERMAN_FUNCTION_WORDS_IN_A_NAME,
  },
];

/** The names of the language rules the text breaks; empty when it is English with short glosses. */
export function otherLanguageFound(text: string): string[] {
  return RULES.filter((rule) => rule.isFoundIn(text)).map((rule) => rule.name);
}
