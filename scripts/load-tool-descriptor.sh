#!/bin/sh
# Sourced with TOOL set: reads tools/$TOOL.version and the release coordinates in tools/$TOOL.sh.
tools_dir="$(dirname "$0")/../tools"
TOOL_VERSION=$(cat "$tools_dir/$TOOL.version")
TOOL_CHECKSUMS="$tools_dir/$TOOL.sha256"
. "$(dirname "$0")/host-platform.sh"
. "$tools_dir/$TOOL.sh"
