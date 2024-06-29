#!/usr/bin/env bash

LATEST_BRANCH_TAG_SHA="$(./get-latest-branch-tag-sha.sh)"

CHANGES="$(git diff --name-only HEAD ${LATEST_BRANCH_TAG_SHA} | cat )"

echo "${CHANGES}"
