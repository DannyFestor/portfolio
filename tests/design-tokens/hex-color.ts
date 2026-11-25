/** Six-digit hex colors: parsing, and mixing two of them. */

export interface Rgb {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

const HEX_COLOR = /^#(?<red>[\da-f]{2})(?<green>[\da-f]{2})(?<blue>[\da-f]{2})$/iu;
const HEX_RADIX = 16;
const HEX_CHANNEL_DIGITS = 2;

export const CHANNEL_MAX = 255;

export function parseHexColor(hex: string): Rgb {
  const channels = HEX_COLOR.exec(hex)?.groups;
  if (channels === undefined) {
    throw new Error(`Not a six-digit hex color: ${hex}`);
  }
  const channel = (name: string): number => Number.parseInt(channels[name] ?? "", HEX_RADIX);
  return { red: channel("red"), green: channel("green"), blue: channel("blue") };
}

function formatHexChannel(channel: number): string {
  return Math.round(channel).toString(HEX_RADIX).padStart(HEX_CHANNEL_DIGITS, "0");
}

function formatHexColor({ red, green, blue }: Rgb): string {
  return `#${formatHexChannel(red)}${formatHexChannel(green)}${formatHexChannel(blue)}`;
}

/** `top` laid over `bottom` at the given share (0 to 1), mixed channel by channel. */
export function mixHexColors(top: string, bottom: string, share: number): string {
  const upper = parseHexColor(top);
  const lower = parseHexColor(bottom);
  const mix = (name: keyof Rgb): number => upper[name] * share + lower[name] * (1 - share);
  return formatHexColor({ red: mix("red"), green: mix("green"), blue: mix("blue") });
}
