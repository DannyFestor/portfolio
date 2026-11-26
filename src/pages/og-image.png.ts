// The share image (#20), rendered once at build time for every page's link preview.
import { renderShareImage } from "../share-image/share-image";

export async function GET(): Promise<Response> {
  const png = await renderShareImage(process.cwd());
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
}
