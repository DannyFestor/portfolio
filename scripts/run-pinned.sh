#!/bin/sh
# Runs a pinned release binary from bin/, downloading and checksum-verifying it first when needed.
set -eu

[ $# -ge 1 ] || { echo "usage: $0 <tool> [<args>...]" >&2; exit 1; }
TOOL=$1
shift
. "$(dirname "$0")/load-tool-descriptor.sh"

binary="$(dirname "$0")/../bin/$TOOL"
"$(dirname "$0")/install-pinned-binary.sh" "$binary" \
  "https://github.com/$RELEASE_REPO/releases/download/$RELEASE_TAG/$RELEASE_ASSET" \
  "$TOOL_CHECKSUMS" "$BINARY_IN_ARCHIVE"
exec "$binary" "$@"
