/**
 * Runs in the page: the elements matching `selector` that are rotated or set vertically. Text that
 * must be read is never turned; only decoration hidden from assistive technology may be.
 */
export function turnedElements(selector: string): string[] {
  return [...document.querySelectorAll(selector)]
    .filter((element) => {
      const style = getComputedStyle(element);
      return (
        style.transform !== "none" ||
        style.rotate !== "none" ||
        style.writingMode !== "horizontal-tb"
      );
    })
    .map((element) => element.tagName.toLowerCase());
}
