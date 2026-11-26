/** A URL and the HTTP status it answered with. */
export interface UrlStatus {
  readonly url: string;
  readonly status: number;
}

/** Requests a URL and resolves to the status it answers with. */
export type StatusFetcher = (url: string) => Promise<number>;

const OK = 200;

/**
 * The status the URL itself answers with. Redirects are not followed: a page that only answers
 * after a redirect is not served where the sitemap says it is.
 */
export async function directStatus(url: string): Promise<number> {
  const response = await fetch(url, { redirect: "manual" });
  await response.body?.cancel();
  return response.status;
}

/** Every URL that does not answer 200, with the status it gave. */
export async function urlsNotOk(
  urls: readonly string[],
  fetchStatus: StatusFetcher,
): Promise<UrlStatus[]> {
  const statuses = await Promise.all(
    urls.map(async (url) => ({ url, status: await fetchStatus(url) })),
  );
  return statuses.filter(({ status }) => status !== OK);
}
