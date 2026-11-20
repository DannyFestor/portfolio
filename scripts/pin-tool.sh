#!/bin/sh
# Rewrites tools/<tool>.sha256 for the release in tools/<tool>.version from the digests GitHub records (needs gh).
set -eu

[ $# -eq 1 ] || { echo "usage: $0 <tool>" >&2; exit 1; }
TOOL=$1
. "$(dirname "$0")/load-tool-descriptor.sh"

# jq reads the pattern from the environment, so its backslashes are never re-escaped.
export ASSET_PATTERN
checksums=$(gh api "repos/$RELEASE_REPO/releases/tags/$RELEASE_TAG" --jq '
  .assets[]
  | select(.name | test("^(" + env.ASSET_PATTERN + ")$"))
  | "\(.digest | ltrimstr("sha256:"))  \(.name)"')
[ -n "$checksums" ] || { echo "pin-tool: no asset of $RELEASE_REPO $RELEASE_TAG matches $ASSET_PATTERN" >&2; exit 1; }
echo "$checksums" >"$TOOL_CHECKSUMS"
