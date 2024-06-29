#!/usr/bin/env bash

CHANGES="$(./get-changes-since-last-branch-tag.sh)"

DESIRED="$1"

#

CHANGES_DESIRED=$(echo "${CHANGES}" | grep -E "${DESIRED}"; exit 0)

echo "${CHANGES_DESIRED}"
