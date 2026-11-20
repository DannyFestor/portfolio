#!/bin/sh
# Descriptor for scripts/run-pinned.sh and scripts/pin-tool.sh. Linux builds are the static musl ones.
RELEASE_REPO=lycheeverse/lychee
RELEASE_TAG="lychee-v$TOOL_VERSION"
ASSET_PATTERN='lychee-(aarch64|x86_64)-(apple-darwin|unknown-linux-musl)\.tar\.gz'
case "$HOST_OS" in
  darwin) target="$HOST_ARCH-apple-darwin" ;;
  *) target="$HOST_ARCH-unknown-linux-musl" ;;
esac
RELEASE_ASSET="lychee-$target.tar.gz"
BINARY_IN_ARCHIVE="lychee-$target/lychee"
