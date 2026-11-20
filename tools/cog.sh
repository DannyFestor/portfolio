#!/bin/sh
# Descriptor for scripts/run-pinned.sh and scripts/pin-tool.sh. Upstream ships Linux x86_64 only as musl.
RELEASE_REPO=cocogitto/cocogitto
RELEASE_TAG=$TOOL_VERSION
ASSET_PATTERN='cocogitto-.*-(aarch64-apple-darwin|x86_64-apple-darwin|aarch64-unknown-linux-gnu|x86_64-unknown-linux-musl)\.tar\.gz'
case "$HOST_OS-$HOST_ARCH" in
  darwin-*) target="$HOST_ARCH-apple-darwin" ;;
  linux-x86_64) target=x86_64-unknown-linux-musl ;;
  *) target="$HOST_ARCH-unknown-linux-gnu" ;;
esac
RELEASE_ASSET="cocogitto-$TOOL_VERSION-$target.tar.gz"
BINARY_IN_ARCHIVE="$target/cog"
