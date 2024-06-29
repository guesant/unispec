#!/usr/bin/env bash

LATEST_BRANCH_TAG="$(./get-latest-branch-tag.sh)"
LATEST_BRANCH_TAG_SHA="$(git rev-list -n 1 ${LATEST_BRANCH_TAG})"

echo "${LATEST_BRANCH_TAG_SHA}"