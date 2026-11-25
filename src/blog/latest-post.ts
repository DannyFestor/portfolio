/** The post published last: Home's "latest writing" line (#15). */
interface PublishedPost {
  readonly data: { readonly pubDate: Date };
}

function publishedLater<Post extends PublishedPost>(first: Post, second: Post): Post {
  return second.data.pubDate > first.data.pubDate ? second : first;
}

export function latestPost<Post extends PublishedPost>(posts: readonly Post[]): Post {
  const [first, ...rest] = posts;
  if (first === undefined) {
    throw new Error("The blog has no post, so Home has no latest writing to show.");
  }
  return rest.reduce((latest, post) => publishedLater(latest, post), first);
}
