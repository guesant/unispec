#!/usr/bin/env bash

CHANGES=$(./get-changes-since-last-branch-tag.sh)

DESIRED=$1
CHANGES_DESIRED=$(./get-changes-desired-since-last-branch-tag.sh "${DESIRED}")

#

CHANGES_DESIRED_COUNT=0

if [[ -n "${CHANGES_DESIRED}" ]]; then
  CHANGES_DESIRED_COUNT=$( echo "${CHANGES_DESIRED}" | wc -l )
fi

echo "${CHANGES_DESIRED_COUNT}"
