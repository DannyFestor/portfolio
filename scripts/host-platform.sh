#!/bin/sh
# Sourced by the tool descriptors: HOST_OS is darwin or linux, HOST_ARCH is aarch64 or x86_64.
HOST_OS=$(uname -s | tr '[:upper:]' '[:lower:]')
HOST_ARCH=$(uname -m | sed 's/^arm64$/aarch64/')
export HOST_OS HOST_ARCH
