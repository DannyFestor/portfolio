/** A text file the site serves at build time, such as robots.txt or llms.txt. */
export function plainTextResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
