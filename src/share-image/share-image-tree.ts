/**
 * The share image as the element tree Satori lays out: a paper page with two ink-bordered panels,
 * the halftone photo on the left and the lettering on the right.
 */
import type { PixelBox } from "./photo-crop.ts";
import { SHARE_IMAGE_LETTERING } from "./share-image-content.ts";
import type { LetteredLine } from "./share-image-content.ts";
import { SHARE_IMAGE_SIZE } from "./share-image-file.ts";
import type { SharePanels } from "./share-image-layout.ts";
import type { ShareImageStyle } from "./share-image-style.ts";

/** Satori reads React-shaped elements: a tag, its style, and its children. */
export interface ShareImageElement {
  readonly type: "div" | "img";
  readonly props: {
    readonly style: Readonly<Record<string, string | number>>;
    readonly src?: string;
    readonly children?: readonly ShareImageElement[] | string;
  };
}

/**
 * The site's type scale is set for reading a page; a link preview is seen at thumbnail size, so the
 * share image letters larger. Sizes in pixels of the 1200 × 630 image.
 */
const LETTERING_SIZES = { name: 104, quietBeat: 30, impactBeat: 46 } as const;
const DISPLAY_LINE_HEIGHT = 1;
const NARRATION_LINE_HEIGHT = 1.4;

/** What the share image is drawn from: its layout, its tokens and the photo's ink layer. */
export interface ShareImageParts {
  readonly panels: SharePanels;
  readonly style: ShareImageStyle;
  /** The halftone photo as a data URL, the size of the photo panel's frame. */
  readonly photoUrl: string;
}

function panelStyle(box: PixelBox, style: ShareImageStyle): Record<string, string | number> {
  return {
    position: "absolute",
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
    boxSizing: "border-box",
    display: "flex",
    backgroundColor: style.paper,
    border: `${String(style.panelLine)}px solid ${style.ink}`,
  };
}

function lettering(line: LetteredLine, size: number): Record<string, string | number> {
  return {
    fontFamily: line.face.family.slug,
    fontWeight: line.face.face.weight,
    fontSize: size,
  };
}

function photoPanel({ panels, style, photoUrl }: ShareImageParts): ShareImageElement {
  const image: ShareImageElement = {
    type: "img",
    props: { src: photoUrl, style: { width: "100%", height: "100%" } },
  };
  return { type: "div", props: { style: panelStyle(panels.photo, style), children: [image] } };
}

function nameLine(): ShareImageElement {
  const { name } = SHARE_IMAGE_LETTERING;
  const style = { ...lettering(name, LETTERING_SIZES.name), lineHeight: DISPLAY_LINE_HEIGHT };
  return { type: "div", props: { style, children: name.text } };
}

function quietBeatBox(style: ShareImageStyle): ShareImageElement {
  const { quietBeat } = SHARE_IMAGE_LETTERING;
  const boxStyle = {
    ...lettering(quietBeat, LETTERING_SIZES.quietBeat),
    lineHeight: NARRATION_LINE_HEIGHT,
    alignSelf: "flex-start",
    padding: `${String(style.narrationPadding.block)}px ${String(style.narrationPadding.inline)}px`,
    border: `${String(style.narrationLine)}px solid ${style.ink}`,
  };
  return { type: "div", props: { style: boxStyle, children: quietBeat.text } };
}

function impactBeatLine(): ShareImageElement {
  const { impactBeat } = SHARE_IMAGE_LETTERING;
  const style = {
    ...lettering(impactBeat, LETTERING_SIZES.impactBeat),
    lineHeight: DISPLAY_LINE_HEIGHT,
  };
  return { type: "div", props: { style, children: impactBeat.text } };
}

function positioningLine(style: ShareImageStyle): ShareImageElement {
  return {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", gap: style.letteringGap },
      children: [quietBeatBox(style), impactBeatLine()],
    },
  };
}

function letteringPanel({ panels, style }: ShareImageParts): ShareImageElement {
  const panel = {
    ...panelStyle(panels.lettering, style),
    flexDirection: "column",
    justifyContent: "space-between",
    padding: style.panelPadding,
    color: style.ink,
  };
  return { type: "div", props: { style: panel, children: [nameLine(), positioningLine(style)] } };
}

export function shareImageTree(parts: ShareImageParts): ShareImageElement {
  const page = { display: "flex", ...SHARE_IMAGE_SIZE, backgroundColor: parts.style.paper };
  return {
    type: "div",
    props: { style: page, children: [photoPanel(parts), letteringPanel(parts)] },
  };
}
