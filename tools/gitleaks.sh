#!/bin/sh
# Descriptor for scripts/run-pinned.sh and scripts/pin-tool.sh.
RELEASE_REPO=gitleaks/gitleaks
RELEASE_TAG="v$TOOL_VERSION"
ASSET_PATTERN='gitleaks_.*_(darwin|linux)_(arm64|x64)\.tar\.gz'
asset_arch=$(echo "$HOST_ARCH" | sed -e 's/^aarch64$/arm64/' -e 's/^x86_64$/x64/')
RELEASE_ASSET="gitleaks_${TOOL_VERSION}_${HOST_OS}_${asset_arch}.tar.gz"
BINARY_IN_ARCHIVE=gitleaks
