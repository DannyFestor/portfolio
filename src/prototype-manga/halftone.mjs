// Prototype helper: turns a photo into a 45°-rotated amplitude-modulated halftone (alpha = ink).
import sharp from "sharp"; // run from the repo root: node src/prototype-manga/halftone.mjs <in> <out> <pitch>
const [, , input, output, cellArg] = process.argv;
const CELL = Number(cellArg ?? 9);          // screen pitch in output pixels
const W = 960, H = 1280, ANGLE = Math.PI / 4;
const { data } = await sharp(input).resize(W, H).grayscale().normalise().linear(1.05, 8).raw().toBuffer({ resolveWithObject: true });
const lum = (x, y) => data[Math.min(H - 1, Math.max(0, y | 0)) * W + Math.min(W - 1, Math.max(0, x | 0))] / 255;
const out = Buffer.alloc(W * H * 4, 0);
const cos = Math.cos(ANGLE), sin = Math.sin(ANGLE);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const u = x * cos + y * sin, v = -x * sin + y * cos;          // rotate into screen space
  const cu = (Math.floor(u / CELL) + 0.5) * CELL, cv = (Math.floor(v / CELL) + 0.5) * CELL;
  const cx = cu * cos - cv * sin, cy = cu * sin + cv * cos;     // cell centre back in image space
  const dark = Math.pow(1 - lum(cx, cy), 1.45);
  const r = CELL * 0.72 * Math.sqrt(dark);                       // dot area ∝ darkness
  const d = Math.hypot(u - cu, v - cv);
  const a = Math.max(0, Math.min(1, r - d + 0.5));               // 1px anti-aliased edge
  out[(y * W + x) * 4 + 3] = Math.round(a * 255);
}
await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(output);
console.log("wrote", output);
