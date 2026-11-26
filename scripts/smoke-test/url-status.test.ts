import { once } from "node:events";
import { createServer } from "node:http";

import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

import { directStatus, urlsNotOk } from "./url-status.ts";

const OK = 200;
const MOVED_PERMANENTLY = 301;
const NOT_FOUND = 404;

const STATUS_BY_PATH: Readonly<Record<string, number>> = { "/": OK, "/moved": MOVED_PERMANENTLY };

const server = createServer((request, response) => {
  const status = STATUS_BY_PATH[request.url ?? ""] ?? NOT_FOUND;
  response.writeHead(status, { location: "/" }).end("body");
});

function urlOf(path: string): string {
  const address = server.address();
  if (typeof address !== "object" || address === null) {
    throw new Error("The test server is not listening on a port.");
  }
  return `http://127.0.0.1:${String(address.port)}${path}`;
}

beforeAll(async () => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
});

afterAll(async () => {
  server.close();
  await once(server, "close");
});

describe("a URL's direct status", () => {
  it.each([
    ["/", OK],
    ["/moved", MOVED_PERMANENTLY],
    ["/missing", NOT_FOUND],
  ])("is what %s itself answers, redirects not followed", async (path, status) => {
    await expect(directStatus(urlOf(path))).resolves.toBe(status);
  });
});

describe("the URLs that are not OK", () => {
  it("are every URL that answers anything but 200, with its status", async () => {
    const statuses: Readonly<Record<string, number>> = {
      "/a": OK,
      "/b": NOT_FOUND,
      "/c": MOVED_PERMANENTLY,
    };
    const notOk = await urlsNotOk(["/a", "/b", "/c"], (url) => Promise.resolve(statuses[url] ?? 0));
    expect(notOk).toStrictEqual([
      { url: "/b", status: NOT_FOUND },
      { url: "/c", status: MOVED_PERMANENTLY },
    ]);
  });
});
