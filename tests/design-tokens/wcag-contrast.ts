/** WCAG 2.2 contrast ratio between two sRGB colors, per the relative-luminance definition. */

interface Rgb {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

const HEX_COLOR = /^#(?<red>[\da-f]{2})(?<green>[\da-f]{2})(?<blue>[\da-f]{2})$/iu;
const HEX_RADIX = 16;
const CHANNEL_MAX = 255;

const LINEAR_SEGMENT_LIMIT = 0.040_45;
const LINEAR_SEGMENT_SLOPE = 12.92;
const GAMMA_OFFSET = 0.055;
const GAMMA_EXPONENT = 2.4;

const RED_WEIGHT = 0.2126;
const GREEN_WEIGHT = 0.7152;
const BLUE_WEIGHT = 0.0722;

const FLARE = 0.05;

function parseHexColor(hex: string): Rgb {
  const channels = HEX_COLOR.exec(hex)?.groups;
  if (channels === undefined) {
    throw new Error(`Not a six-digit hex color: ${hex}`);
  }
  const channel = (name: string): number => Number.parseInt(channels[name] ?? "", HEX_RADIX);
  return { red: channel("red"), green: channel("green"), blue: channel("blue") };
}

function linearChannel(channel: number): number {
  const encoded = channel / CHANNEL_MAX;
  return encoded <= LINEAR_SEGMENT_LIMIT
    ? encoded / LINEAR_SEGMENT_SLOPE
    : ((encoded + GAMMA_OFFSET) / (1 + GAMMA_OFFSET)) ** GAMMA_EXPONENT;
}

function relativeLuminance(hex: string): number {
  const { red, green, blue } = parseHexColor(hex);
  return (
    RED_WEIGHT * linearChannel(red) +
    GREEN_WEIGHT * linearChannel(green) +
    BLUE_WEIGHT * linearChannel(blue)
  );
}

export function contrastRatio(first: string, second: string): number {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].toSorted(
    (left, right) => right - left,
  );
  return ((lighter ?? 0) + FLARE) / ((darker ?? 0) + FLARE);
}
