/**
 * Personal data that must never ship (#14): phone numbers, emails other than the two the site
 * allows, and the labels résumés put before a birth date, an address or a nationality, in English,
 * German and Japanese. Findings name the rule only, so a test failure never prints the data
 * itself.
 */
import { CONTACT_EMAIL } from "../../src/consts.ts";

/** The site writes from hello@; the public résumés print danny@. Both reach the same inbox. */
const ALLOWED_EMAILS: ReadonlySet<string> = new Set([CONTACT_EMAIL, "danny@festor.info"]);

interface PersonalDataRule {
  readonly name: string;
  readonly isFoundIn: (text: string) => boolean;
}

/** Digit groups joined by at most one separator, as phone numbers are written. */
const DIGIT_RUN = /\+?\(?\d+(?:\)?[ .\-/]?\(?\d+)*/gu;
const NON_DIGIT = /\D/gu;
const SHORTEST_PHONE_DIGITS = 10;
const LONGEST_PHONE_DIGITS = 15;

function isPhoneLength(digitRun: string): boolean {
  const digits = digitRun.replaceAll(NON_DIGIT, "").length;
  return digits >= SHORTEST_PHONE_DIGITS && digits <= LONGEST_PHONE_DIGITS;
}

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/gu;

function labelRule(name: string, label: Readonly<RegExp>): PersonalDataRule {
  return { name, isFoundIn: (text) => label.test(text) };
}

const RULES: readonly PersonalDataRule[] = [
  {
    name: "phone number",
    isFoundIn: (text) => [...text.matchAll(DIGIT_RUN)].some(([run]) => isPhoneLength(run)),
  },
  {
    name: "email other than the two allowed",
    isFoundIn: (text) =>
      [...text.matchAll(EMAIL)].some(([email]) => !ALLOWED_EMAILS.has(email.toLowerCase())),
  },
  labelRule(
    "birth-date label",
    /\b(?:date of birth|birth ?date|born on|dob)\b|geburtsdatum|geboren am|生年月日/iu,
  ),
  labelRule(
    "address label",
    /\b(?:home|postal|mailing|street) address\b|\baddress\s*:|\b(?:postal|zip) code\b|anschrift|(?<!e-mail-)adresse|postleitzahl|住所|郵便番号|〒/iu,
  ),
  labelRule(
    "nationality label",
    /\b(?:nationality|citizenship)\b|staatsangehörigkeit|staatsbürgerschaft|nationalität|国籍/iu,
  ),
];

/** The names of the rules the text breaks; empty when it holds no personal data. */
export function personalDataFound(text: string): string[] {
  return RULES.filter((rule) => rule.isFoundIn(text)).map((rule) => rule.name);
}
