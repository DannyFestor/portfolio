/**
 * Calls to action are big inked links, never buttons (#27). Finds the markup that would bring
 * buttons back: a <button> dressed as a call to action, or a link with a button class or role.
 */

const START_TAG = /<(?<tag>a|button)\b(?<attributes>[^>]*)>/giu;
const CLASS_ATTRIBUTE = /\bclass\s*=\s*(?:"(?<double>[^"]*)"|'(?<single>[^']*)')/iu;
const BUTTON_ROLE = /\brole\s*=\s*["']?button\b/iu;
const BUTTON_CLASS = /(?:^|-)(?:btn|button)(?:-|$)/iu;
const CALL_TO_ACTION_CLASS = "call-to-action";

function classesOf(attributes: string): string[] {
  const groups = CLASS_ATTRIBUTE.exec(attributes)?.groups;
  const value = groups?.["double"] ?? groups?.["single"] ?? "";
  return value.split(/\s+/u).filter((name) => name !== "");
}

function isButtonImitation(tag: string, attributes: string): boolean {
  const classes = classesOf(attributes);
  if (tag.toLowerCase() === "button") {
    return classes.includes(CALL_TO_ACTION_CLASS);
  }
  return BUTTON_ROLE.test(attributes) || classes.some((name) => BUTTON_CLASS.test(name));
}

/** The start tags in the HTML that imitate a button. */
export function buttonImitations(html: string): string[] {
  return [...html.matchAll(START_TAG)]
    .filter((match) =>
      isButtonImitation(match.groups?.["tag"] ?? "", match.groups?.["attributes"] ?? ""),
    )
    .map((match) => match[0]);
}
