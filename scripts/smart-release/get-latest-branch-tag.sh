#!/usr/bin/env bash

LATEST_BRANCH_TAG="$(git describe --tags --abbrev=0)"

echo "${LATEST_BRANCH_TAG}"
